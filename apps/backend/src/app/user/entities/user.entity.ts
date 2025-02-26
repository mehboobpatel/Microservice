import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'new' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean; // Email verification status

  @Column({ nullable: true })
  verificationToken: string; // Token for email verification
}
