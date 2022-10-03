import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { ClienteService } from './cliente-service';
import { Cliente } from '../model/cliente';

describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let service: ClienteService;
  const endpointApiCliente = `${environment.apiUrlCliente}/todos`;
  let clientesTest: Cliente[];


  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService,HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ClienteService);
    clientesTest = [
      { id: 1, nombre: 'Cliente 1'},
      { id: 2, nombre: 'Cliente 2'},
      { id: 3, nombre: 'Cliente 3'},
      { id: 4, nombre: 'Cliente 4'}
    ];
  });

  it('Deberia crear el servicio1 correctamente', () => {
    const clienteService: ClienteService = TestBed.inject(ClienteService);
    expect(clienteService).toBeTruthy();
  });

  it('deberia listar todos los clientes', () => {
    service.listarTodos().subscribe(clientes => {
      expect(clientes.length).toBe(4);
      expect(clientes).toEqual(clientesTest);
    });
    const req = httpMock.expectOne(`${endpointApiCliente}`);
    expect(req.request.method).toBe('GET');
    req.flush(clientesTest);
  });
});
