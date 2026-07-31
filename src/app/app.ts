import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { WhatsAppBtnComponent } from './shared/components/whatsapp-btn/whatsapp-btn.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsAppBtnComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public themeService = inject(ThemeService);
}
