import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-whatsapp-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-btn.component.html',
  styleUrl: './whatsapp-btn.component.scss',
})
export class WhatsAppBtnComponent {
  public langService = inject(LanguageService);
  public whatsappUrl =
    'https://api.whatsapp.com/send?phone=51941700464&text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20uno%20de%20sus%20servicios%20https://enertronic.com.pe';
}
