import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../shared/models';

interface MainLinkItem {
  route: string;
  icon: string;
  titleKey: string;
  hintKey: string;
  accent?: boolean;
}

interface ActivityEmpty {
  icon: string;
  titleKey: string;
  bodyKey: string;
  ctaRoute: string;
  ctaKey: string;
}

const KPI_BY_ROLE: Record<UserRole, MainLinkItem[]> = {
  admin: [
    {
      route: '/admin/route-requests',
      icon: 'inbox',
      titleKey: 'navigation.adminRouteRequests',
      hintKey: 'pages.main.cardQueueHint',
      accent: true
    },
    {
      route: '/admin/trips',
      icon: 'map',
      titleKey: 'navigation.adminTrips',
      hintKey: 'pages.main.cardRoutesHint'
    },
    {
      route: '/admin/vehicles',
      icon: 'directions_car',
      titleKey: 'navigation.adminVehicles',
      hintKey: 'pages.main.cardFleetHint'
    },
    {
      route: '/admin/users',
      icon: 'group',
      titleKey: 'navigation.adminUsers',
      hintKey: 'pages.main.kpiUsersHint'
    }
  ],
  manager: [
    {
      route: '/admin/route-requests',
      icon: 'inbox',
      titleKey: 'navigation.adminRouteRequests',
      hintKey: 'pages.main.cardQueueHint',
      accent: true
    },
    {
      route: '/admin/trips',
      icon: 'map',
      titleKey: 'navigation.adminTrips',
      hintKey: 'pages.main.cardRoutesHint'
    },
    {
      route: '/admin/vehicles',
      icon: 'directions_car',
      titleKey: 'navigation.adminVehicles',
      hintKey: 'pages.main.cardFleetHint'
    },
    {
      route: '/admin/drivers',
      icon: 'badge',
      titleKey: 'navigation.adminDrivers',
      hintKey: 'pages.main.kpiDriversHint'
    }
  ],
  driver: [
    {
      route: '/my-trips',
      icon: 'explore',
      titleKey: 'navigation.myTrips',
      hintKey: 'pages.main.kpiMyTripsHint',
      accent: true
    },
    {
      route: '/profile',
      icon: 'person',
      titleKey: 'navigation.profile',
      hintKey: 'pages.main.kpiProfileHint'
    }
  ],
  user: [
    {
      route: '/routes',
      icon: 'route',
      titleKey: 'navigation.routes',
      hintKey: 'pages.main.cardRoutesHint',
      accent: true
    },
    {
      route: '/my-freight-requests',
      icon: 'local_shipping',
      titleKey: 'navigation.myFreightRequests',
      hintKey: 'pages.main.cardFreightHint'
    },
    {
      route: '/route-builder',
      icon: 'add',
      titleKey: 'pages.routeBuilder.newRoute',
      hintKey: 'pages.main.kpiNewRouteHint'
    }
  ]
};

const QUICK_BY_ROLE: Record<UserRole, MainLinkItem[]> = {
  admin: [
    {
      route: '/admin/route-requests',
      icon: 'inbox',
      titleKey: 'pages.main.adminRouteRequestsLink',
      hintKey: 'pages.main.cardQueueHint'
    },
    {
      route: '/admin/trips',
      icon: 'map',
      titleKey: 'navigation.adminTrips',
      hintKey: 'pages.main.cardRoutesHint'
    },
    {
      route: '/admin/vehicles',
      icon: 'directions_car',
      titleKey: 'navigation.adminVehicles',
      hintKey: 'pages.main.cardFleetHint'
    },
    {
      route: '/admin/drivers',
      icon: 'badge',
      titleKey: 'navigation.adminDrivers',
      hintKey: 'pages.main.kpiDriversHint'
    },
    {
      route: '/admin/users',
      icon: 'group',
      titleKey: 'navigation.adminUsers',
      hintKey: 'pages.main.kpiUsersHint'
    },
    {
      route: '/my-trips',
      icon: 'explore',
      titleKey: 'navigation.myTrips',
      hintKey: 'pages.main.kpiMyTripsHint'
    }
  ],
  manager: [
    {
      route: '/admin/route-requests',
      icon: 'inbox',
      titleKey: 'pages.main.adminRouteRequestsLink',
      hintKey: 'pages.main.cardQueueHint'
    },
    {
      route: '/admin/trips',
      icon: 'map',
      titleKey: 'navigation.adminTrips',
      hintKey: 'pages.main.cardRoutesHint'
    },
    {
      route: '/admin/vehicles',
      icon: 'directions_car',
      titleKey: 'navigation.adminVehicles',
      hintKey: 'pages.main.cardFleetHint'
    },
    {
      route: '/admin/drivers',
      icon: 'badge',
      titleKey: 'navigation.adminDrivers',
      hintKey: 'pages.main.kpiDriversHint'
    },
    {
      route: '/my-trips',
      icon: 'explore',
      titleKey: 'navigation.myTrips',
      hintKey: 'pages.main.kpiMyTripsHint'
    },
    {
      route: '/profile',
      icon: 'person',
      titleKey: 'navigation.profile',
      hintKey: 'pages.main.kpiProfileHint'
    }
  ],
  driver: [
    {
      route: '/my-trips',
      icon: 'explore',
      titleKey: 'navigation.myTrips',
      hintKey: 'pages.main.kpiMyTripsHint'
    },
    {
      route: '/profile',
      icon: 'person',
      titleKey: 'navigation.profile',
      hintKey: 'pages.main.kpiProfileHint'
    }
  ],
  user: [
    {
      route: '/route-builder',
      icon: 'add',
      titleKey: 'pages.routeBuilder.newRoute',
      hintKey: 'pages.main.kpiNewRouteHint'
    },
    {
      route: '/routes',
      icon: 'route',
      titleKey: 'navigation.routes',
      hintKey: 'pages.main.cardRoutesHint'
    },
    {
      route: '/my-freight-requests',
      icon: 'local_shipping',
      titleKey: 'pages.main.freightCalculationLink',
      hintKey: 'pages.main.cardFreightHint'
    },
    {
      route: '/profile',
      icon: 'person',
      titleKey: 'navigation.profile',
      hintKey: 'pages.main.kpiProfileHint'
    }
  ]
};

const ACTIVITY_BY_ROLE: Record<UserRole, ActivityEmpty> = {
  admin: {
    icon: 'inbox',
    titleKey: 'pages.adminRouteRequests.empty',
    bodyKey: 'pages.main.activityEmptyBody',
    ctaRoute: '/admin/route-requests',
    ctaKey: 'pages.main.adminRouteRequestsLink'
  },
  manager: {
    icon: 'inbox',
    titleKey: 'pages.adminRouteRequests.empty',
    bodyKey: 'pages.main.activityEmptyBody',
    ctaRoute: '/admin/route-requests',
    ctaKey: 'pages.main.adminRouteRequestsLink'
  },
  driver: {
    icon: 'explore',
    titleKey: 'pages.myTrips.empty',
    bodyKey: 'pages.main.activityEmptyBodyDriver',
    ctaRoute: '/my-trips',
    ctaKey: 'navigation.myTrips'
  },
  user: {
    icon: 'route',
    titleKey: 'pages.routes.empty',
    bodyKey: 'pages.main.activityEmptyBodyUser',
    ctaRoute: '/route-builder',
    ctaKey: 'pages.routeBuilder.newRoute'
  }
};

/**
 * Головна: hero + KPI (без цифр) + quick actions + activity empty.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, MatIconModule, MatButtonModule]
})
export class MainComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.authService.user;
  readonly canSeeManagerSection = computed(() => this.authService.hasAnyRole(['admin', 'manager']));
  readonly canSeeAdminSection = computed(() => this.authService.hasAnyRole(['admin']));

  private readonly role = computed((): UserRole => this.authService.user()?.role ?? 'user');

  readonly kpiItems = computed(() => KPI_BY_ROLE[this.role()] ?? KPI_BY_ROLE.user);
  readonly quickItems = computed(() => QUICK_BY_ROLE[this.role()] ?? QUICK_BY_ROLE.user);
  readonly activity = computed(() => ACTIVITY_BY_ROLE[this.role()] ?? ACTIVITY_BY_ROLE.user);

  navigateTo(route: string): void {
    if (route === '/route-builder') {
      void this.router.navigate([route], {
        queryParams: { mode: 'create', routeId: null }
      });
      return;
    }
    void this.router.navigate([route]);
  }
}
