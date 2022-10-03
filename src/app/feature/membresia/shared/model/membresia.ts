
import { Cliente } from "src/app/feature/cliente/shared/model/cliente";

export interface Membresia {
    id: number;
    cliente: Cliente,
    fechaInicio: string,
    fechaFin: string,
    tipo: string
}

//manejar interfaces independientes
export interface MembresiaCreateDto {
  idCliente: number;
  tipoMembresia: string
}
