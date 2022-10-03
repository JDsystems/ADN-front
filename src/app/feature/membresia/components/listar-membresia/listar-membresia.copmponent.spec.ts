import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMembresiaComponent } from './listar-membresia.component';
import { MembresiaService } from '@membresia/shared/service/membresia-service';
import { Membresia } from '@membresia/shared/model/membresia';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';

describe('ListarMembresiaComponent', () => {
  let component: ListarMembresiaComponent;
  let fixture: ComponentFixture<ListarMembresiaComponent>;
  let membresiaService: MembresiaService;
  const listadoClientes: Cliente[] = [
    {
      id: 1,
      nombre: 'cliente 1'
    },
    {
      id: 2,
      nombre: 'cliente 2'
    },
    {
      id: 3,
      nombre: 'cliente 3'
    }
  ];

  const listadoMembresias: Membresia[] = [
    {
      id: 1,
      cliente: listadoClientes[0],
      fechaInicio: '2022-07-07',
      fechaFin: '2022-08-06',
      tipo: 'ORO'
    },
    {
      id: 2,
      cliente: listadoClientes[1],
      fechaInicio: '2022-07-07',
      fechaFin: '2022-08-06',
      tipo: 'PLATA'
    },
    {
      id: 3,
      cliente: listadoClientes[2],
      fechaInicio: '2022-07-07',
      fechaFin: '2022-08-06',
      tipo: 'BRONCE'
    }
  ];

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListarMembresiaComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MembresiaService,
        HttpService
      ]
    }).compileComponents()
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMembresiaComponent);
    component = fixture.componentInstance;

  membresiaService = TestBed.inject(MembresiaService);
    spyOn(membresiaService, 'listarActivas').and.returnValue(of(listadoMembresias));
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia listar las membresias', () => {
    expect(listadoMembresias).toBe(component.listaMembresias);
    expect(3).toBe(component.listaMembresias.length);
  });

})
