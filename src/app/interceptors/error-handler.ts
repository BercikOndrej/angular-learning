import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs"

export const errorHandler = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          console.error('Network error');
          // Navigate with router
          break;
        case 400:
          console.error('Bad Request');
          // Navigate with router
          break;
        case 401:
          console.error('Unauthorized');
          // Navigate with router
          break;
        case 403:
          console.error('Forbidden');
          // Navigate with router
          break;
        case 404:
          console.error('Not found');
          // Navigate with router
          break;
        case 500:
          console.error('Server error');
          // Navigate with router
          break;
        default:
          console.error('Unknown error:', error.status);
          break;
      }

      return throwError(() => error);
    })
  )
}