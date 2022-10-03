import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { InvitacionService } from './invitacion-service';
import { InvitacionDTO } from '../model/invitacion';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';
import { Membresia } from '@membresia/shared/model/membresia';



describe('InvitacionService', () => {
  let httpMock: HttpTestingController;
  let service: InvitacionService;
  const endpointApiInvitacion = `${environment.apiUrlInvitacion}`;
  let invitacionDTOTest: InvitacionDTO;
  let clienteTest: Cliente
  let membresiasTest: Membresia;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvitacionService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(InvitacionService);
    clienteTest = { id: 1, nombre: 'Cliente 1'};
    membresiasTest = { id: 2, cliente: clienteTest, fechaInicio: '2022-07-06', fechaFin: '2022-08-05', tipo: 'PLATA' };
    invitacionDTOTest = { idMembresia: membresiasTest.id, identificacionInvitado: '12345670', nombreInvitado: 'Test invitado'}

  });


  it('Deberia crear el servicio correctamente', () => {
    const invitacionService: InvitacionService = TestBed.inject(InvitacionService);
    expect(invitacionService).toBeTruthy();
  });

  it('deberia crear una invitacion de forma exitosa', () => {
    service.guardar(invitacionDTOTest).subscribe((respuesta) => {
      expect(respuesta.data.valor).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(`${endpointApiInvitacion}`);
    expect(req.request.method).toBe('POST');
  });

});
