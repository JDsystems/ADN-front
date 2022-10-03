import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearInvitacionComponet } from "./components/crear-invitacion/crear-invitacion.component";
import { InvitacionComponent } from "./components/invitacion/invitacion.component";

const routes: Routes = [
  {
      path: '',
      component: InvitacionComponent,
      children: [
        {
          path: 'crear',
          component: CrearInvitacionComponet
        }
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitacionRoutingModule { }
