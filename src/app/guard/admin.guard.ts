import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RoleResponse } from '../dtos/response/roles/role.response';
import { UserService } from './../services/user.service';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const isUserLoggedIn = inject(UserService).isLoggedIn();
  const isAdmin = inject(UserService)
    .getUserDetailsFromLocalStorage()
    .roles.some((role: RoleResponse) => role.code === 'ADMIN');

  const isPassAdminLogin = isUserLoggedIn && isAdmin;
  if (!isPassAdminLogin) {
    router.navigate(['/login']);
  }

  return isPassAdminLogin;
};
