import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-careers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css'
})
export class CareersComponent {
  openings = [
    {
      id: 1,
      position: 'SEO Specialist',
      experience: '1 Year',
      description: 'Responsible for improving the company’s organic search rankings, driving traffic to our website, and enhancing the overall SEO strategy. Applicants are expected to submit a strong portfolio showcasing previous SEO achievements and analytics reports.',
      responsibility: `Perform keyword research and competitive analysis\n Optimize website content and landing pages\n Monitor and report on SEO performance using tools like Google Analytics and Search Console\n Collaborate with content and development teams for on-page and technical SEO\n Stay up to date with the latest SEO and digital marketing trends`
    },
    {
      id: 2,
      position: 'Social Media Anchor',
      experience: '1 Year',
      description: 'Create engaging video and live content for various social media platforms while representing the brand’s voice and personality. Applicants must include a strong portfolio with previous hosting clips or social media content.',
      responsibility: `Host live sessions and create video content for platforms like Instagram, Facebook, and YouTube\n Engage with the audience in real-time, answering questions and promoting brand values\n Collaborate with the content and marketing team to align messaging\n Track engagement metrics and suggest improvements\n Stay updated with platform trends and audience preferences`
    },
    {
      id: 3,
      position: 'Digital Marketer',
      experience: '1 Year',
      description: 'Develop and execute digital marketing campaigns across various channels to build brand awareness and generate leads. A strong portfolio demonstrating past campaign performance and creative strategy is required.',
      responsibility: `Plan and execute paid and organic campaigns across Google, Facebook, Instagram, etc.\n Analyze and report performance metrics and ROI\n Manage email marketing and marketing automation workflows\n Collaborate with content creators and designers\n Stay informed on digital marketing best practices and trends`
    }
  ];

  careerForm: FormGroup;
  uploadedFile: File | null = null;
  fileError: string = '';
  selectedFileName: string = '';
  isSubmitting = false;

  scriptUrl = 'https://script.google.com/macros/s/AKfycbyGPPO6YIEyUbmi95FcIIDT9Liq2FTH1cHfr4iz55q-vaj5qD8ml62UTaiibqw03zrI/exec'

  constructor(private fb: FormBuilder) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      comments: [''],
      resumeLink: ['', Validators.required]
    });
  }

  formInint() {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      comments: [''],
      resumeLink: ['', Validators.required]
    });
  }

  onCareerSubmit() {
    if (this.careerForm.valid) {
      this.isSubmitting = true;

      const { name, email, phone, position, comments, resumeLink } = this.careerForm.value;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('position', position);
      formData.append('comments', comments || 'N/A');
      formData.append('resumeLink', resumeLink);

      fetch(this.scriptUrl, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          alert('Thank you! Your application has been submitted successfully.');
          this.formInint()
          this.uploadedFile = null;
          this.isSubmitting = false;
        })
        .catch(error => {
          console.error('Error!', error.message);
          alert('Something went wrong. Please try again later.');
          this.isSubmitting = false;
        });

    } else {
      this.fileError = this.uploadedFile ? '' : 'Resume is required.';
      this.careerForm.markAllAsTouched();
    }
  }

}
