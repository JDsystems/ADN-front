import { Injectable } from '@angular/core';
import {  Membresia, MembresiaCreateDto } from '../model/membresia';
import { environment } from 'src/environments/environment';
import {  Observable } from 'rxjs';
import { Respuesta } from '@core/modelo/respueta-api';
import { HttpHandleError } from '@core/services/http-handle-error.service';


@Injectable()
export class MembresiaService extends HttpHandleError {
  peticion;

    public listarActivas(){
      return this.http.doGet<Membresia[]>(`${environment.apiUrlMembresia}/activa`)
    }

    public guardar(dto: MembresiaCreateDto): Observable<Respuesta<any>>{
        this.peticion  = this.http.doPost<MembresiaCreateDto, Respuesta<any>>(environment.apiUrlMembresia, dto);
         return this.formateoRespuesta(this.peticion);
    }

    public cancelar(id: number){
      return this.http.doPost<number, boolean>(`${environment.apiUrlMembresia}/cancelar/${id}`,null);
    }

}
