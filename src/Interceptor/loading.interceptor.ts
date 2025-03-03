import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

let isLoading = false;  
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  if (!isLoading) {
    isLoading = true;
    // Show the loading indicator here
    // For example, you can use the ProgressSpinner component
    // this.progressSpinner.show();
  }

  return next(req).pipe(
    tap(() => {
      isLoading = false;
      // Hide the loading indicator here
      // this.progressSpinner.hide();
    })
  );
};