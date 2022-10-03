import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { CrearMembresiaComponet } from './crear-membresia.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MembresiaService } from '@membresia/shared/service/membresia-service';
import { ClienteService } from 'src/app/feature/cliente/shared/service/cliente-service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Respuesta } from '@core/modelo/respueta-api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';

describe('CrearMembresiaComponet', () => {
  let component: CrearMembresiaComponet;
  let fixture: ComponentFixture<CrearMembresiaComponet>;
  let membresiaService: MembresiaService;
  let clienteTest: Cliente;
  let mockResp: Respuesta<any> ;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMembresiaComponet],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        HttpService,
        MembresiaService,
        ClienteService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMembresiaComponet);
    component = fixture.componentInstance;
    membresiaService = TestBed.inject(MembresiaService);

    clienteTest = { id: 1, nombre: 'Cliente 1'};
    mockResp = { error: false, data: {valor: 21 } , mensaje: '' }

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.membresiaForm.valid).toBeFalsy();
  });

   it('deberia registrar la membresia de forma exitosa', (done) => {
    spyOn(membresiaService, 'guardar').and.returnValue(of(mockResp));
    expect(component.membresiaForm.valid).toBeFalsy();
    component.membresiaForm.controls.idCliente.setValue('1');
    component.membresiaForm.controls.tipoMembresia.setValue('ORO');
    expect(component.membresiaForm.valid).toBeTruthy();

    component.crear();

    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Creado Correctamente!');
      Swal.clickConfirm();
      done();
    })
  });


  it('deberia lanzar error al guardar con membresia no valida', (done) => {

    mockResp = {	error: true, data: null, mensaje: '' };
    spyOn(membresiaService, 'guardar').and.returnValue(of(mockResp));
    component.membresiaForm.controls['idCliente'].setValue(clienteTest.id);
    component.membresiaForm.controls['tipoMembresia'].setValue('ORO111');

    component.crear();

     setTimeout(() => {
      expect('Error').toEqual(Swal.getTitle().textContent);
      Swal.clickConfirm();
      done();
    })
  })

  it('deberia lanzar error al guardar con cliente no valido', (done) => {

    mockResp = {	error: true, data: null, mensaje: '' };
    spyOn(membresiaService, 'guardar').and.returnValue(of(mockResp));
    component.membresiaForm.controls['idCliente'].setValue(null);
    component.membresiaForm.controls['tipoMembresia'].setValue('ORO');

    component.crear();

     setTimeout(() => {
      expect('Error').toEqual(Swal.getTitle().textContent);
      Swal.clickConfirm();
      done();
    })
  })

})



