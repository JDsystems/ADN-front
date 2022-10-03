export interface Respuesta<T> {
	error: boolean,
  data: T,
  mensaje: string
}
