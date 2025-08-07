import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { WpService } from '../../services/wp.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Import this
import { NgIf } from '@angular/common'; // 👈 Optional if you prefer individual directive

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  };
formSuccess = false;
formSubmitted = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private wpService: WpService
  ) {
    this.titleService.setTitle('Contact Kenny Weiss - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Face your pain and break free from self-destructive behaviors with a video response from Kenny, directed to you privately.',
    });
  }

  submitForm(contactForm :any) {
     this.formSubmitted = true;
    this.wpService.sendForm(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccess = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',
          lastname: '',
          email: '',
          phone: '',
          message: ''
        };
        this.formSubmitted = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }
}
