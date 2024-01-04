import { HttpInterceptorFn } from '@angular/common/http';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    headers : req.headers.set("Authorization", "Bearer Token")
  })
  return next(request);
};
