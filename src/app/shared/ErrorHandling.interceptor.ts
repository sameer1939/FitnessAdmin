import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { ErrorTypes } from "../enum/errortypes";
import { AlertifyService } from "../services/alertify.service";

@Injectable({
    providedIn:"root"
})

export class ErrorHandlingInterceptor implements HttpInterceptor{

    constructor(private alertify:AlertifyService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retryWhen(error=>this.retryRequest(error,10)),
            catchError((error:HttpErrorResponse)=>{
                this.alertify.error(this.setError(error))
                throw new Error(this.setError(error))
            })
        )
    }
    retryRequest(error: Observable<unknown>, NumberofRequest: number): Observable<unknown> {
        return error.pipe(
            concatMap((checkErr:HttpErrorResponse,cntCheck:number)=>{

                if(cntCheck<=NumberofRequest){
                    switch (checkErr.status) {
                        case ErrorTypes.serverdown:
                            return of(checkErr)
                            break;
                        case ErrorTypes.unauthorised:
                            return of(checkErr)
                            break;
                    }
                }
                
                return throwError(checkErr);
            })
        )
    }

    setError(error:HttpErrorResponse):string{
        let errorMessage = "Unknown error occur";
        if(error.error instanceof ErrorEvent){
            // client side error
            errorMessage =error.error.message;
        }else{
            //server side error
            if(error.status==401){
                return error.statusText;
            }
            if(error.error.message && error.status!==0)
                errorMessage = error.error.message;
        }
        return errorMessage;
    }
}