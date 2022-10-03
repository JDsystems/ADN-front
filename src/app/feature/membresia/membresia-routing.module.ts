import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearMembresiaComponet } from "./components/crear-membresia/crear-membresia.component";
import { ListarMembresiaComponent } from "./components/listar-membresia/listar-membresia.component";
import { MembresiaComponent } from "./components/membresia/membresia.component";


const routes: Routes = [
    {
        path: '',
        component: MembresiaComponent,
        children: [
          {
            path: 'crear',
            component: CrearMembresiaComponet
          },
          {
            path: 'listar',
            component: ListarMembresiaComponent
          }
        ]
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembresiaRoutingModule { }
