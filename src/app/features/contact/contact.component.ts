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
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

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
    TranslatePipe,
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
  public clientType: 'person' | 'company' = 'person';

  public departments: string[] = [
    'Lima',
    'Callao',
    'Amazonas',
    'Áncash',
    'Apurímac',
    'Arequipa',
    'Ayacucho',
    'Cajamarca',
    'Cusco',
    'Huancavelica',
    'Huánuco',
    'Ica',
    'Junín',
    'La Libertad',
    'Lambayeque',
    'Loreto',
    'Madre de Dios',
    'Moquegua',
    'Pasco',
    'Piura',
    'Puno',
    'San Martín',
    'Tacna',
    'Tumbes',
    'Ucayali',
  ];

  public contactForm: FormGroup = this.fb.group({
    clientType: ['person'],
    // Cliente Normal fields
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    department: ['Lima', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    service: ['Programación PLC'],
    message: ['', Validators.required],
    // Empresa fields
    ruc: [''],
    razonSocial: [''],
    requirementType: ['Servicio'],
    purchaseType: ['Equipos y Soluciones de Telemetría'],
  });

  public setClientType(type: 'person' | 'company'): void {
    this.clientType = type;
    this.contactForm.get('clientType')?.setValue(type);
    this.updateValidators();
  }

  public setRequirementType(reqType: 'Servicio' | 'Compra'): void {
    this.contactForm.get('requirementType')?.setValue(reqType);
  }

  private updateValidators(): void {
    const nameCtrl = this.contactForm.get('name');
    const rucCtrl = this.contactForm.get('ruc');
    const razonSocialCtrl = this.contactForm.get('razonSocial');
    const messageCtrl = this.contactForm.get('message');
    const emailCtrl = this.contactForm.get('email');

    emailCtrl?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]);

    if (this.clientType === 'person') {
      nameCtrl?.setValidators([Validators.required]);
      rucCtrl?.clearValidators();
      razonSocialCtrl?.clearValidators();
      messageCtrl?.setValidators([Validators.required]);
    } else {
      nameCtrl?.clearValidators();
      rucCtrl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{11}$/)]);
      razonSocialCtrl?.setValidators([Validators.required]);
      messageCtrl?.clearValidators();
    }

    emailCtrl?.updateValueAndValidity();
    nameCtrl?.updateValueAndValidity();
    rucCtrl?.updateValueAndValidity();
    razonSocialCtrl?.updateValueAndValidity();
    messageCtrl?.updateValueAndValidity();
  }

  public onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value.replace(/\D/g, '');
    if (rawValue.length > 9) {
      rawValue = rawValue.slice(0, 9);
    }
    input.value = rawValue;
    this.contactForm.get('phone')?.setValue(rawValue, { emitEvent: false });
  }

  public onRucInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value.replace(/\D/g, '');
    if (rawValue.length > 11) {
      rawValue = rawValue.slice(0, 11);
    }
    input.value = rawValue;
    this.contactForm.get('ruc')?.setValue(rawValue, { emitEvent: false });
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
    const emailVal = this.contactForm.get('email')?.value || '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      this.contactForm.get('email')?.setErrors({ invalidEmail: true });
    }

    const phoneVal = this.contactForm.value.phone || '';
    if (phoneVal.length !== 9 || !/^[0-9]{9}$/.test(phoneVal)) {
      this.contactForm.get('phone')?.setErrors({ invalidLength: true });
    }

    if (this.clientType === 'company') {
      const rucVal = this.contactForm.get('ruc')?.value || '';
      if (rucVal.length !== 11 || !/^[0-9]{11}$/.test(rucVal)) {
        this.contactForm.get('ruc')?.setErrors({ invalidLength: true });
      }
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitted = false;

    let payload: Record<string, string>;

    if (this.clientType === 'company') {
      const reqType = this.contactForm.value.requirementType || 'Servicio';
      const detail = reqType === 'Servicio' 
        ? this.contactForm.value.service 
        : this.contactForm.value.purchaseType;

      payload = {
        'Tipo de Cliente': 'Empresa',
        'Razón Social': this.contactForm.value.razonSocial,
        RUC: this.contactForm.value.ruc,
        'Correo Corporativo': this.contactForm.value.email,
        'Teléfono': `+51 ${this.contactForm.value.phone}`,
        'Ciudad': this.contactForm.value.department,
        'Requerimiento': reqType,
        'Detalle Requerimiento': detail || '',
        'Mensaje Adicional': this.contactForm.value.message || 'Sin mensaje adicional',
        _subject: 'Nuevo contacto Empresa desde Enertronic: ' + this.contactForm.value.razonSocial,
        _captcha: 'false',
        _template: 'table',
      };
    } else {
      payload = {
        'Tipo de Cliente': 'Cliente',
        Nombre: this.contactForm.value.name,
        Email: this.contactForm.value.email,
        'Teléfono': `+51 ${this.contactForm.value.phone}`,
        'Ciudad': this.contactForm.value.department,
        Servicio: this.contactForm.value.service,
        Mensaje: this.contactForm.value.message,
        _subject: 'Nuevo mensaje de contacto desde Enertronic',
        _captcha: 'false',
        _template: 'table',
      };
    }

    this.http.post('https://formsubmit.co/ajax/alexander.parra@enertronicperu.com', payload).subscribe({
      next: () => this.resetFormState(),
      error: (err) => {
        console.error('Error enviando el formulario de contacto:', err);
        this.resetFormState();
      },
    });
  }

  private resetFormState(): void {
    this.isSubmitting = false;
    this.submitted = true;
    this.contactForm.reset({
      clientType: this.clientType,
      department: 'Lima',
      service: 'Programación PLC',
      requirementType: 'Servicio',
      purchaseType: 'Equipos y Soluciones de Telemetría',
    });
  }
}


