import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public langService = inject(LanguageService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  public submitted = false;
  public isSubmitting = false;

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    service: ['Programación PLC'],
    message: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitted = false;

    const payload = {
      Nombre: this.contactForm.value.name,
      Email: this.contactForm.value.email,
      Teléfono: this.contactForm.value.phone || 'No especificado',
      Servicio: this.contactForm.value.service,
      Mensaje: this.contactForm.value.message,
      _subject: 'Nuevo mensaje de contacto desde Enertronic',
      _captcha: 'false',
      _template: 'table',
    };

    this.http.post('https://formsubmit.co/ajax/sebasdarkate@gmail.com', payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        this.contactForm.reset({ service: 'Programación PLC' });
      },
      error: (err) => {
        console.error('Error enviando el formulario de contacto:', err);
        this.isSubmitting = false;
        this.submitted = true;
        this.contactForm.reset({ service: 'Programación PLC' });
      },
    });
  }
}

