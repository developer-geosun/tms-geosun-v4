import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  // Ініціалізуємо сервіс під час старту застосунку
  private readonly languageService = inject(LanguageService);
  title = 'tms-geosun';
}
