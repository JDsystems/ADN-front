import { Component,OnInit } from "@angular/core";
import { MembresiaService } from "../../shared/service/membresia-service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Respuesta } from "@core/modelo/respueta-api";
import { Cliente } from "src/app/feature/cliente/shared/model/cliente";
import Swal from 'sweetalert2';
import { ClienteService } from "src/app/feature/cliente/shared/service/cliente-service";


@Component({
    selector: 'app-crear-membresia',
    templateUrl: './crear-membresia.component.html',
    styleUrls: ['./crear-membresia.component.css']
})
export class CrearMembresiaComponet implements OnInit {

    membresiaForm : FormGroup;
    listaClientes: Cliente[]

    constructor(
      protected membresiaService: MembresiaService,
      protected clienteService: ClienteService
      ){}

    ngOnInit(){
      this.construirFormulariomembresia();
      this.listarClientes();
    }

    crear(){
      this.membresiaService.guardar(this.membresiaForm.value)
      .subscribe(res => {
        this.respuesta(res);
      })
    }

    private respuesta(respuesta: Respuesta<any>){
      if(respuesta.error){
        Swal.fire({
          title: 'Error',
          text: respuesta.mensaje,
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return
      }else{
        Swal.fire({
          title: 'Creado Correctamente!',
          text: 'Usted tiene '+ respuesta.data.valor+' dias hábiles para asistir al gimnasio.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    }


    listarClientes(){
      this.clienteService.listarTodos().subscribe(data => {
        this.listaClientes = data;
      })
    }

    private construirFormulariomembresia(){
        this.membresiaForm = new FormGroup({
            idCliente: new FormControl(null, [Validators.required]),
            tipoMembresia: new FormControl('', [Validators.required])
        });
    }
}


