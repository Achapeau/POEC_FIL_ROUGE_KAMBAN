import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor');
  
  const jwtToken = getJwtToken();
  if (jwtToken) {
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log('with token', cloned);
    return next(cloned).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('api response', event);
        }
      })
    )
  }
  console.log('without token');
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('api response', event);
      }
    })
  );
};

function getJwtToken(): string | null {
  let tokens: string | null = localStorage.getItem('currentUser');
  if (!tokens) return null;
  const token = JSON.parse(tokens);
  return token;
}
