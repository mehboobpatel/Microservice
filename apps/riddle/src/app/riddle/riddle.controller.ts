import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('riddle')
export class RiddleController {
  constructor(private configService: ConfigService) {}

  @Get('fetch')
  async getRiddle(): Promise<{ title: string; question: string; answer: string }> {
    try {
      const apiKey = this.configService.get<string>('RIDDLE_API_KEY'); // API key from .env
      console.log("apikey",apiKey);
      
      const response = await axios.get('https://api.api-ninjas.com/v1/riddles', {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      // Assuming the response is an array, return the first riddle
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const riddle = response.data[0];
        return {
          title: riddle.title,
          question: riddle.question,
          answer: riddle.answer,
        };
      }

      // Handle empty array
      throw new Error('No riddles found in the response.');
    } catch (error) {
      console.error('Error fetching riddle:', error.message);
      throw new Error('Failed to fetch riddle.');
    }
  }
}
