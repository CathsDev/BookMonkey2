import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {map, take, takeUntil} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated$.pipe(
        take(1),
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            } else {
                const msg = $localize
                `:alert message when not logged in@@AuthGuardAlert:Not logged in!!`;
                window.alert(msg);
                return router.parseUrl('/home');
            }
        })
    );

};
