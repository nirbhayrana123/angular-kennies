import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WpService } from '../../services/wp.service';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgIf ],
  templateUrl: './books.component.html',
  styleUrls : ['./books.component.css']
})
export class BooksComponent {

formData = {
    name: '', 
    email: '', 
  };
formSubmitted = false; 
  formSuccessBooks = false;

constructor(private titleService: Title, private metaService: Meta, private wpService: WpService) {
    this.titleService.setTitle('books');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }




submitFormBooks() {
  this.formSubmitted = true;

  if (!this.formData.name || !this.formData.email) {
    return; // Required fields empty
  }

  this.wpService.sendFormBookspage(this.formData).subscribe({
    next: (res) => {
      console.log('✅ Success:', res);
      this.formSuccessBooks = true;

      // Reset form
      this.formData = { name: '', email: '' };
      this.formSubmitted = false;
 
    },
    error: (err) => {
      console.error('❌ Error:', err);
      alert('Failed to send message. Please try again.');
    }
  });
}






}
