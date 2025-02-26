import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entities/user.entity'; // Import the User entity

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Use 'postgres' for PostgreSQL
      // host: 'localhost', // Your PostgreSQL host (e.g., 'localhost')
      // port: 5432, // PostgreSQL default port is 5432
      // // schema: 'new',
      // username: 'admin', // Replace with your DB username
      // password: 'admin123', // Replace with your DB password
      // database: 'funmotiv_db', // Replace with your DB name

      host: process.env.DB_HOST, // Your PostgreSQL host (e.g., 'localhost')
      port: parseInt(process.env.DB_PORT, 10) || 5432 , // PostgreSQL default port is 5432
      username: process.env.DB_USERNAME, // Replace with your DB username
      password: process.env.DB_PASSWORD, // Replace with your DB password
      database: process.env.DB_NAME, // Replace with your DB name
      entities: [User], // Include all entities in your app
      
      synchronize: true, // Set to false in production for safety
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Get the JWT secret from environment variables
      signOptions: { expiresIn: '1h' },  // Set token expiration time
    }),
    UserModule, // Ensure UserModule is imported
  ],
})
export class AppModule {}
