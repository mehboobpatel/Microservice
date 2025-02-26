import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import {  RiddleController } from './riddle/riddle.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [RiddleController,AppController],
  providers: [AppService],
  imports: [ 
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
