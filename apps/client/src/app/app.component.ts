// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { WelcomeComponent } from './welcome/welcome.component'; // Import WelcomeComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, CommonModule, WelcomeComponent, RouterModule], // Ensure FormsModule and CommonModule are included
})
export class AppComponent {
  title = 'client';
}
