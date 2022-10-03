import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { CrearInvitacionComponet } from './crear-invitacion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InvitacionService } from '@invitacion/shared/service/invitacion-service';
import { MembresiaService } from '@membresia/shared/service/membresia-service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Respuesta } from '@core/modelo/respueta-api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Membresia } from '@membresia/shared/model/membresia';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';

describe('CrearInvitacionComponet', () => {
  let component: CrearInvitacionComponet;
  let fixture: ComponentFixture<CrearInvitacionComponet>;
  let invitacionService: InvitacionService;
  let membresiaTest: Membresia;
  let clienteTest: Cliente
  let mockResp: Respuesta<any> ;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearInvitacionComponet],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        HttpService,
        InvitacionService,
        MembresiaService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInvitacionComponet);
    component = fixture.componentInstance;
    invitacionService = TestBed.inject(InvitacionService);

    clienteTest = { id: 1, nombre: 'Cliente 1'};
    membresiaTest = {
      id: 1,
      cliente: clienteTest,
      fechaInicio: '2022-07-11',
      fechaFin: '2022-08-10',
      tipo: 'ORO'
    }
    mockResp = { error: false, data: {valor: 1 } , mensaje: '' }

    fixture.detectChanges();
  });

  it('deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido deberia lanzar error', () => {
    expect(component.invitacionForm.valid).toBeFalsy();
  });

  it('deberia crear la invitacion de forma exitosa', (done) => {
    spyOn(invitacionService, 'guardar').and.returnValue(of(mockResp));
    expect(component.invitacionForm.valid).toBeFalsy();
    component.invitacionForm.controls['idMembresia'].setValue(membresiaTest.id);
    component.invitacionForm.controls['identificacionInvitado'].setValue('12345678');
    component.invitacionForm.controls['nombreInvitado'].setValue('Invitado test');
    expect(component.invitacionForm.valid).toBeTruthy();

    component.crear();

    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Creado Correctamente!');
      Swal.clickConfirm();
      done();
    })
  });

  it('deberia lanzar error al guardar con membresia no valida', (done) => {

    mockResp = {	error: true, data: null, mensaje: '' };
    spyOn(invitacionService, 'guardar').and.returnValue(of(mockResp));
    component.invitacionForm.controls['idMembresia'].setValue('membresiainvalida');
    component.invitacionForm.controls['identificacionInvitado'].setValue('8765432');
    component.invitacionForm.controls['nombreInvitado'].setValue('Test invitado');

    component.crear();

     setTimeout(() => {
      expect('Error').toEqual(Swal.getTitle().textContent);
      Swal.clickConfirm();
      done();
    })
  })


})
