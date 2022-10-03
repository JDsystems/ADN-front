import { NgModule } from "@angular/core";
import { InvitacionRoutingModule } from "./invitacion-routing.module";
import { CrearInvitacionComponet } from "./components/crear-invitacion/crear-invitacion.component";
import { InvitacionComponent } from "./components/invitacion/invitacion.component";
import { SharedModule } from "@shared/shared.module";
import { InvitacionService } from "./shared/service/invitacion-service";


@NgModule({
  declarations: [
      CrearInvitacionComponet,
      InvitacionComponent
  ],
  imports: [
    InvitacionRoutingModule,
      SharedModule
  ],
  providers: [ InvitacionService ]
})
export class InvitacionModule {}
