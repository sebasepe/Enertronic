import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  public langService = inject(LanguageService);
}
