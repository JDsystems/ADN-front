import { NgModule } from "@angular/core";
import { MembresiaRoutingModule } from "./membresia-routing.module";
import { CrearMembresiaComponet } from "./components/crear-membresia/crear-membresia.component";
import { ListarMembresiaComponent } from "./components/listar-membresia/listar-membresia.component";
import { MembresiaComponent } from "./components/membresia/membresia.component";
import { SharedModule } from "@shared/shared.module";
import { MembresiaService } from "./shared/service/membresia-service";
import { ClienteService } from "../cliente/shared/service/cliente-service";


@NgModule({
    declarations: [
        CrearMembresiaComponet,
        ListarMembresiaComponent,
        MembresiaComponent
    ],
    imports: [
        MembresiaRoutingModule,
        SharedModule
    ],
    providers: [ MembresiaService,ClienteService ]
})
export class MembresiaModule {}
