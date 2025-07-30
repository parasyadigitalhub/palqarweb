import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  scriptUrl = 'https://script.google.com/macros/s/AKfycbyukKttGY65uPn-TW2muPjiqDGt0oJmYQtHIaMLU3IJ-gwHUrfveDGMKlLAjRdtZpRC6A/exec'

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      const { firstName, lastName, email, subject, message } = this.contactForm.value;

      const formData = new FormData();
      formData.append('name', `${firstName} ${lastName}`);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);

      fetch(this.scriptUrl, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          alert('Message submitted successfully!');
          this.contactForm.reset();
          this.isSubmitting = false;
        })
        .catch((error) => {
          console.error('Error!', error.message);
          alert('Something went wrong. Please try again later.');
          this.isSubmitting = false;
        });

    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}
