import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

import { ConfigService } from '@nestjs/config';  // To access the environment variables

@Controller('currency')
export class CurrencyController {
  constructor(private configService: ConfigService) {}

  @Get('convert')
  async convertCurrency(
    @Query('have') have: string,
    @Query('want') want: string,
    @Query('amount') amount: number,
  ): Promise<{ convertedAmount: number }> {
    try {
      const apiKey = this.configService.get<string>('CURRENCY_API_KEY');  // Access the API key from .env
      console.log("APIKEYiseq",apiKey )
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${have}/${want}/${amount}`
      );

      // Return the converted amount from the response
      return { convertedAmount: response.data.conversion_result };
    } catch (error) {
      console.error('Error converting currency:', error);
      throw new Error('Failed to convert currency.');
    }
  }
}
