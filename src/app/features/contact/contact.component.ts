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

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  digits: number;
  placeholder: string;
}

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

  public countries: CountryCode[] = [
    { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪', digits: 9, placeholder: '941 700 464' },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', digits: 9, placeholder: '9 1234 5678' },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', digits: 10, placeholder: '300 123 4567' },
    { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', digits: 10, placeholder: '55 1234 5678' },
    { code: 'US', name: 'EE.UU. / Canadá', dialCode: '+1', flag: '🇺🇸', digits: 10, placeholder: '202 555 0123' },
    { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸', digits: 9, placeholder: '612 345 678' },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', digits: 10, placeholder: '11 1234 5678' },
    { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', digits: 9, placeholder: '99 123 4567' },
    { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴', digits: 8, placeholder: '7123 4567' },
    { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷', digits: 11, placeholder: '11 91234 5678' },
    { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', digits: 10, placeholder: '412 123 4567' },
    { code: 'PA', name: 'Panamá', dialCode: '+507', flag: '🇵🇦', digits: 8, placeholder: '6123 4567' },
    { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', digits: 8, placeholder: '8123 4567' },
    { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', digits: 8, placeholder: '99 123 456' },
    { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾', digits: 9, placeholder: '981 123 456' },
  ];

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    countryCode: ['PE'],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    service: ['Programación PLC'],
    message: ['', Validators.required],
  });

  public get selectedCountry(): CountryCode {
    const code = this.contactForm.get('countryCode')?.value || 'PE';
    return this.countries.find((c) => c.code === code) || this.countries[0];
  }

  public onCountryChange(): void {
    const currentPhone = this.contactForm.get('phone')?.value || '';
    const maxDigits = this.selectedCountry.digits;
    if (currentPhone.length > maxDigits) {
      this.contactForm.get('phone')?.setValue(currentPhone.slice(0, maxDigits));
    }
  }

  public onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value.replace(/\D/g, '');
    const maxDigits = this.selectedCountry.digits;
    if (rawValue.length > maxDigits) {
      rawValue = rawValue.slice(0, maxDigits);
    }
    input.value = rawValue;
    this.contactForm.get('phone')?.setValue(rawValue, { emitEvent: false });
  }

  public onPhoneKeydown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Enter',
    ];
    if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  public onSubmit(): void {
    const phoneVal = this.contactForm.value.phone || '';
    if (phoneVal.length !== this.selectedCountry.digits) {
      this.contactForm.get('phone')?.setErrors({ invalidLength: true });
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitted = false;

    const payload = {
      Nombre: this.contactForm.value.name,
      Email: this.contactForm.value.email,
      Teléfono: `${this.selectedCountry.dialCode} ${this.contactForm.value.phone}`,
      País: `${this.selectedCountry.flag} ${this.selectedCountry.name}`,
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
        this.contactForm.reset({ countryCode: 'PE', service: 'Programación PLC' });
      },
      error: (err) => {
        console.error('Error enviando el formulario de contacto:', err);
        this.isSubmitting = false;
        this.submitted = true;
        this.contactForm.reset({ countryCode: 'PE', service: 'Programación PLC' });
      },
    });
  }
}


