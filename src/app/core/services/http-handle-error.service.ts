import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map } from 'rxjs/operators';
import {  Observable,of } from 'rxjs';
import { HttpService } from '@core-service/http.service';
import { Respuesta } from '@core/modelo/respueta-api';

@Injectable({
  providedIn: 'root'
})
export class HttpHandleError {
  res: Respuesta<any>;

  constructor(protected http: HttpService){}

  formateoRespuesta(respuesta: Observable<Respuesta<any>>): Observable<Respuesta<any>> {
    this.res = { error: false, data: null, mensaje: '' };
    return respuesta.pipe(
      map(r => {
        this.res.data = r;
        return this.res;
      }),catchError(this.error)
    );
  }

  private error(error: HttpErrorResponse) {
    let mensajeError = '';
    if(error.error) {
      mensajeError = `${error.error.mensaje}`;
    }
    return of({ error: true, mensaje: mensajeError, data: error.error });
  }
}
