// book-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service'; // Add this if you have one

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book: any;
  addingToCart = false;
  
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}
  
  viewBookDetails(): void {
    if (this.book && this.book._id) {
      this.router.navigate(['/details', this.book._id]);
    } else {
      console.error('Unable to navigate: book ID is missing');
    }
  }
  
  addToCart(): void {
    if (!this.book || !this.book._id) {
      console.error('Cannot add to cart: book ID is missing');
      return;
    }
    
    this.addingToCart = true;
    this.cartService.addToCart(this.book._id, 1).subscribe({
      next: (response) => {
        console.log('Book added to cart:', this.book.title);
        // Add success feedback if desired
        this.addingToCart = false;
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        // Handle specific error cases
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        this.addingToCart = false;
      }
    });
  }
}