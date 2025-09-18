import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('etoken');
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            isRefreshing = false;
            if (res?.token) {
              localStorage.setItem('etoken', res.token);
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.token}` }
              });
              return next(newReq);
            } else {
              logout();
              return throwError(() => error);
            }
          }),
          catchError((refreshErr) => {
            isRefreshing = false;
            logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );

  function logout() {
    localStorage.removeItem('etoken');
    localStorage.removeItem('refreshToken');
    router.navigate(['/login']);
  }
};
