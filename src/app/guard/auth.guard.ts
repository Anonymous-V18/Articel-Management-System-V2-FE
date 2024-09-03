import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RoleResponse } from '../dtos/response/roles/role.response';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const isUserLoggedIn = inject(UserService).isLoggedIn();
  const isUser = inject(UserService)
    .getUserDetailsFromLocalStorage()
    .roles.some((role: RoleResponse) => role.code === 'USER');

  const isPassUserLogin = isUserLoggedIn && isUser;
  if (!isPassUserLogin) {
    router.navigate(['/login']);
  }

  return isPassUserLogin;
};
