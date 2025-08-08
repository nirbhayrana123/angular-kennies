import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WpService } from '../../services/wp.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Import this
import { NgIf } from '@angular/common'; // 👈 Optional if you prefer individual directive

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,NgIf],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {
formData = {
    name: '', 
    email: '', 
  };
formSuccess = false;
formSuccessconfidence = false;
formSubmitted = false; 
formSuccessconquerconfrontation = false;
formSuccessboundaries = false;
formSuccessCodependenceGiving = false;
formSuccessFeelingsWheel = false;
constructor(private titleService: Title, private metaService: Meta,  private wpService: WpService) {
    this.titleService.setTitle('Resources | Emotional Authenticity Coach | Emotion Coaching');
    this.metaService.updateTag({
      name: 'description',
      content: 'The Greatness Movement helps you understand “why” things aren’t working, but more importantly, “how” to change them.',
    });
  }

  submitFormresource() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormRejected(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccess = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
        };
        this.formSubmitted = false;
        window.open('/images/pdf/How-To-Remove-Feeling-Rejected-.pdf', '_blank');
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }
  submitFormCodependence() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormcodependencequestionnaire(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccessconfidence = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
        };
        this.formSubmitted = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }

  submitFormBoundaries() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormboundaries(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccessboundaries = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
        };
        this.formSubmitted = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }






  submitFormConquerConfrontation() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormConquerConfrontation(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccessconquerconfrontation = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
        };
        this.formSubmitted = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }







 submitFormConfrontation() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormCodependenceGiving(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccessCodependenceGiving = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
        };
        this.formSubmitted = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to send message. Please try again.');
      }
    });
  }


submitFormFeelingsWheel() {
     this.formSubmitted = true;
      if (!this.formData.name || !this.formData.email) {
    //alert('Please fill in all required fields.');
    return;
  }
    this.wpService.sendFormFeelingsWheel(this.formData).subscribe({
      next: (res) => {
        console.log('✅ Success:', res);
         this.formSuccessFeelingsWheel = true; 
        // alert('Message sent successfully!');
        this.formData = {
          name: '',  
          email: '', 
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
