import { Injectable } from '@angular/core';
import { InvitacionDTO } from '../model/invitacion';
import { environment } from 'src/environments/environment';
import { Respuesta } from '@core/modelo/respueta-api';
import {  Observable } from 'rxjs';
import { HttpHandleError } from '@core/services/http-handle-error.service';

@Injectable()
export class InvitacionService extends HttpHandleError{
  peticion;

  public guardar(dto: InvitacionDTO): Observable<Respuesta<any>>{
    this.peticion  = this.http.doPost<InvitacionDTO, Respuesta<any>>(environment.apiUrlInvitacion, dto);
    return this.formateoRespuesta(this.peticion);
  }

}
