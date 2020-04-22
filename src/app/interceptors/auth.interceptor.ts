import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private toastController: MatSnackBar) {
    console.log('intercepted');
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = this.auth.getToken();

    console.log(' intercept token' + request.url);
    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    request = this.addAppropriateHeadersToRequest(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 0 || !token) {

          return this.auth.fetchToken().pipe(
            flatMap(() => {
              token = this.auth.getToken();

              if (token) {
                request = this.addTokenToRequest(request, token);
              }

              request = this.addAppropriateHeadersToRequest(request);

              return next.handle(request);
            })
          );
        }
        return throwError(error);
      }));
  }

  public async presentToast(msg) {
    this.toastController.open(msg, 'Toast!', {
      duration: 2000,
    });
  }

  private addAppropriateHeadersToRequest(request: HttpRequest<any>) {
    return request;
    if (this.requestDoesNotHaveContentType(request)) {
      request = this.addCorrectContentTypeToRequest(request);
    }
    request = this.addAcceptHeadersToRequest(request);
    return request;
  }

  private addAcceptHeadersToRequest(request: HttpRequest<any>) {
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return request;
  }

  private addCorrectContentTypeToRequest(request: HttpRequest<any>) {
    request = request.clone({
      setHeaders: {
        'content-type': 'application/json'
      }
    });
    return request;
  }

  private requestDoesNotHaveContentType(request: HttpRequest<any>) {
    return !request.headers.has('Content-Type');
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return request;
  }
}
