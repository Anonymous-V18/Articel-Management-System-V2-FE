import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getToken();
  if (token !== null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
