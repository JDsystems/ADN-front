import { Component,OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Membresia } from "@membresia/shared/model/membresia";
import { MembresiaService } from "@membresia/shared/service/membresia-service";
import Swal from 'sweetalert2';
import { InvitacionService } from "../../shared/service/invitacion-service";
import { Respuesta } from "@core/modelo/respueta-api";

@Component({
  selector: 'app-crear-invitacion',
  templateUrl: './crear-invitacion.component.html',
  styleUrls: ['./crear-invitacion.component.css']
})
export class CrearInvitacionComponet implements OnInit {

  invitacionForm : FormGroup;
  listaMembresias: Membresia[]

  constructor(
    protected invitacionService: InvitacionService,
    protected membresiaService: MembresiaService
    ){}

  ngOnInit(){
    this.listarMembresias();
    this.construirFormularioInvitacion();
  }

  crear(){
    if(this.invitacionForm.valid){
        this.invitacionService.guardar(this.invitacionForm.value)
            .subscribe((res) => {
              this.respuestaInvitacion(res);
            })
    }
}

private respuestaInvitacion(respuesta: Respuesta<any>){
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
      text: 'Invitación creada con éxito',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }
}

listarMembresias(){
  this.membresiaService.listarActivas().subscribe(data => {
    this.listaMembresias = data;
  })
}

  private construirFormularioInvitacion(){
    this.invitacionForm = new FormGroup({
      idMembresia: new FormControl(null, [Validators.required]),
      identificacionInvitado: new FormControl('', [Validators.required,Validators.min(1)]),
      nombreInvitado: new FormControl('', [Validators.required])
    });
}
}
