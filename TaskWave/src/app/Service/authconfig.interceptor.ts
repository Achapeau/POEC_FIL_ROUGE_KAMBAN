import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
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
    console.log('with token');
    return next(cloned).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          
          console.log('transitory step :', res);
        }
      })
    );
  }
  console.log('without token');
  return next(req);
};

function getJwtToken(): string | null {
  let tokens: string | null = localStorage.getItem('currentUser');
  if (!tokens) return null;
  const token = JSON.parse(tokens);
  // .access_token;
  return token;
}
