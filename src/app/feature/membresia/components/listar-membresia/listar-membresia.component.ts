import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';

import { MembresiaService } from "@membresia/shared/service/membresia-service";
import { Membresia } from "@membresia/shared/model/membresia";

@Component({
  selector: 'app-listar-membresia',
  templateUrl: './listar-membresia.component.html',
  styleUrls: ['./listar-membresia.component.css']
})
export class ListarMembresiaComponent implements OnInit{
  public listaMembresias: Membresia[];

  constructor(protected membresiaService: MembresiaService){}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.membresiaService.listarActivas().subscribe(data => {
      this.listaMembresias = data;
    });
  }

  cancelarMembresia(id: number): void{
      this.membresiaService.cancelar(id)
      .subscribe(() => {
        //extraer en servicio aparte
        Swal.fire(
          'Operación Exitosa!',
          'Membresia cancelada con éxito',
          'success'
        )
        this.listar();
      }, response => {
        Swal.fire({
          title: 'Error',
          text: response.error.mensaje,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }


}
