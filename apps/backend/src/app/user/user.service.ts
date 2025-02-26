import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'; // Generate unique tokens
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';  // Import bcryptjs for password hashing
import { JwtService } from '@nestjs/jwt';  // Import JwtService for JWT handling

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,  // Inject JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 is the salt rounds

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Save the hashed password
      verificationToken: uuidv4(), // Generate a unique token
    });

    const savedUser = await this.userRepository.save(user);

    // Send the verification email
    const verificationUrl = `http://localhost:3000/users/verify/${savedUser.verificationToken}`;
    const emailData = {
      personalizations: [
        {
          to: [{ email: savedUser.email }],
        },
      ],
      from: { email: 'maheboob.p@kelpglobal.com' }, // Replace with your verified sender email
      subject: 'Verify Your Email',
      content: [
        {
          type: 'text/html',
          value: `<p>Click <a href="${verificationUrl}">here</a> to verify your email and activate your account.</p>`,
        },
      ],
    };

    try {
      await axios.post('https://api.sendgrid.com/v3/mail/send', emailData, {
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Verification email sent successfully.');
    } catch (error) {
      console.error('Error sending verification email:', error.response?.data || error.message);
      throw new Error('Failed to send verification email.');
    }

    return savedUser;
  }


  async verifyUser(verificationToken: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { verificationToken } });

    if (!user) {
      throw new Error('Invalid or expired verification token.');
    }

    user.verified = true;
    user.verificationToken = null; // Clear the token after verification
    return await this.userRepository.save(user);
  }
}
