import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { MembresiaService } from './membresia-service';
import { Membresia, MembresiaCreateDto } from '../model/membresia';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';


describe('MembresiaService', ()  => {
  let httpMock: HttpTestingController;
  let service: MembresiaService;
  const endpointApiMembresia = `${environment.apiUrlMembresia}`;
  let membresiasTest: Membresia[];
  let membresiaCreateDTOTest: MembresiaCreateDto;
  let clienteTest: Cliente;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MembresiaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(MembresiaService);
    clienteTest = { id: 1, nombre: 'Cliente 1'};
     membresiasTest = [
      {
          id: 2,
          cliente: clienteTest,
          fechaInicio: "2022-07-06",
          fechaFin: "2022-08-05",
          tipo: "PLATA"
      }
    ];

    membresiaCreateDTOTest = {
      idCliente: clienteTest.id,
      tipoMembresia: 'BRONCE'
    };

  });

  it('Deberia crear el servicio correctamente', () => {
    const membresiaService: MembresiaService = TestBed.inject(MembresiaService);
    expect(membresiaService).toBeTruthy();
  });

  it('deberia listar las membresias activas', () => {
    service.listarActivas().subscribe(membresias => {
      expect(membresias.length).toBe(1);
      expect(membresias).toEqual(membresiasTest);
    });
    const req = httpMock.expectOne(`${endpointApiMembresia}/activa`);
    expect(req.request.method).toBe('GET');
    req.flush(membresiasTest);
  });

  it('deberia crear una membresia de forma exitosa', () => {
    service.guardar(membresiaCreateDTOTest).subscribe((respuesta) => {
      expect(respuesta.data.valor).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(`${endpointApiMembresia}`);
    expect(req.request.method).toBe('POST');
  });

  it('deberia de cancelar la membresia correctamente', () => {
    const idmembresia = membresiasTest[0].id;
    service.cancelar(idmembresia).subscribe();
    const req = httpMock.expectOne(`${endpointApiMembresia}/cancelar/${idmembresia}`);
    expect(req.request.method).toBe('POST');
  });

});
