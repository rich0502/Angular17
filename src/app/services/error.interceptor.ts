import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((err)  => {
    if([504, 404].includes(err.status)){
      console.log("Not Found")
    }
    return throwError(() => err);
  }));
};
