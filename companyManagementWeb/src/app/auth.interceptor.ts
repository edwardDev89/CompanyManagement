import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const userToken = localStorage.getItem('userToken') ?? '';
  request = request.clone({
    setHeaders: {
      Authorization: userToken ? `Token ${userToken}` : '',
    },
  });

  return next(request);
};