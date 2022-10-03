import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Cliente } from '../model/cliente';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClienteService {

  constructor(protected http: HttpService){}

  public listarTodos(){
    return this.http.doGet<Cliente[]>(`${environment.apiUrlCliente}/todos`);
  }
}
