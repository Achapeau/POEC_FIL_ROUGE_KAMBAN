import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

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
  let tokens: string | null = localStorage.getItem('currentUser');
  if (!tokens) return null;
  const token = JSON.parse(tokens);
  return token;
}
