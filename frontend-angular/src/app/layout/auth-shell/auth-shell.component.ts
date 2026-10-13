import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../core/services/config.service';
import { Language, LanguageService } from '../../core/services/language.service';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { AppInfoDialogComponent } from '../../shared/components/app-info-dialog/app-info-dialog.component';
import { SocialIconComponent } from '../../shared/components/social-icon/social-icon.component';
import { getHandsetFriendlyDialogConfig } from '../../shared/utils/handset-friendly-dialog-config';

/**
 * Guest AuthShell: brand-панель (theme/lang + footer) + form sheet з router-outlet.
 */
@Component({
  selector: 'app-auth-shell',
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: { class: 'auth-shell-host' },
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    SocialIconComponent
  ]
})
export class AuthShellComponent {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
  private readonly dialog = inject(MatDialog);
  readonly configService = inject(ConfigService);

  readonly currentLanguage = this.languageService.language;
  readonly currentTheme = this.themeService.theme;

  readonly languages: { code: Language; label: string }[] = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' }
  ];

  readonly themes: { code: Theme; label: string }[] = [
    { code: 'azure-blue', label: 'Azure & Blue' },
    { code: 'rose-red', label: 'Rose & Red' },
    { code: 'magenta-violet', label: 'Magenta & Violet' },
    { code: 'cyan-orange', label: 'Cyan & Orange' }
  ];

  readonly brandValues = [
    { titleKey: 'pages.login.brand.routes', hintKey: 'pages.login.brand.routesHint', icon: 'route' },
    { titleKey: 'pages.login.brand.freight', hintKey: 'pages.login.brand.freightHint', icon: 'local_shipping' },
    { titleKey: 'pages.login.brand.fleet', hintKey: 'pages.login.brand.fleetHint', icon: 'directions_car' }
  ] as const;

  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  changeLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }

  langCodeLabel(code: Language): string {
    return code === 'uk' ? 'UA' : code.toUpperCase();
  }

  openAppInfoDialog(): void {
    this.dialog.open(AppInfoDialogComponent, getHandsetFriendlyDialogConfig({ autoFocus: false }));
  }
}
