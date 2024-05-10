import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const jwtToken = getJwtToken();
  if (jwtToken) {
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return next(cloned)
  }
  return next(req)
};

function getJwtToken(): string | null {
  let authService = inject(AuthService);
  let tokens: string | null = authService.getToken();
  if (!tokens) return null;
  const token = JSON.parse(tokens);
  return token;
}
