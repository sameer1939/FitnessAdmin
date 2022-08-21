import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { ErrorTypes } from "../enum/errortypes";
import { AlertifyService } from "../services/alertify.service";

@Injectable({
    providedIn:"root"
})

export class JwtInterceptor implements HttpInterceptor{

    constructor(private alertify:AlertifyService,private router:Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        if(token){
            req = req.clone({
                setHeaders:{Authorization:`Bearer ${token}`}
            })
        }
        return next.handle(req);
    }

   
}