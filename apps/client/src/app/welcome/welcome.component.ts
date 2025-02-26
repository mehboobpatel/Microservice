import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router
import axios from 'axios';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  
  styleUrls: ['./welcome.component.scss'],
  imports: [FormsModule, CommonModule], // Ensure FormsModule and CommonModule are included
})
export class WelcomeComponent {
  userName: string = localStorage.getItem('userName') || 'User';
  popupVisible = false;
  riddleVisible = false;
  amount = 0;
  fromCurrency = '';
  toCurrency = '';
  convertedValue = '';
  riddle: { title: string; question: string; answer: string } | null = null;
  showAnswer = false;
  playTitle = 'Play';
  

  constructor(private router: Router) {} // Inject Router

  onLogout() {
    localStorage.clear(); // Clear all data from localStorage
    this.router.navigate(['/login']); // Redirect to the login page
  }
  

  openPopup() {
    this.closePopup();
    this.popupVisible = true;
  }

  closePopup() {
    this.playTitle = 'Play';
    this.popupVisible = false;
    this.riddleVisible = false;
    this.riddle = null;
    this.showAnswer = false;
  }

  async openRiddlePopup() {
    this.riddleVisible = true;
    this.showAnswer = false; // Reset showAnswer flag
    // await this.fetchNewRiddle(); // Fetch a new riddle when opening the popup
  }

  async fetchNewRiddle() {
    this.playTitle = 'Play Again';
    try {
      const response = await axios.get('http://localhost:3002/riddle/fetch');
      this.riddle = response.data;
      this.showAnswer = false; // Ensure the answer is hidden initially
    } catch (error) {
      console.error('Error fetching riddle:', error);
      this.riddle = null;
    }
  }

  revealAnswer() {
    this.showAnswer = true;
  }

  async convertCurrency() {
    try {
      const response = await axios.get(
        `http://localhost:3001/currency/convert?have=${this.fromCurrency}&want=${this.toCurrency}&amount=${this.amount}`
      );
      this.convertedValue = response.data.convertedAmount;
    } catch (error) {
      console.error('Error converting currency:', error);
      this.convertedValue = 'Failed to convert currency.';
    }
  }
}
