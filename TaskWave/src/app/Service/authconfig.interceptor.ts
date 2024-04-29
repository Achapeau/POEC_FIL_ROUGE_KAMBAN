import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log('if :', cloned);

    return next(cloned);
  }
  console.log(req);

  return next(req);
};

function getJwtToken(): string | null {
  let tokens: string | null = localStorage.getItem('currentUser');

  if (!tokens) return null;
  const token = JSON.parse(tokens);
  // .access_token;
  console.log(token);

  return token;
}
