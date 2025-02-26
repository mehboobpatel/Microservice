import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import { CurrencyController } from './currency/currency.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [CurrencyController,AppController],
  providers: [AppService],
  imports: [ 
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
