import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

/**
 * Full-screen 404 поза AppShell.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, RouterLink, MatButtonModule, MatIconModule]
})
export class NotFoundComponent {
  private readonly authService = inject(AuthService);

  /** Залогінений → /main, гість → /login. */
  readonly homeLink = computed(() => (this.authService.isAuthenticated() ? '/main' : '/login'));
}
