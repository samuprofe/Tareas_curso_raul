export type Prioridad = 'ALTA' | 'MEDIA' | 'BAJA';

export interface AuthUser {
  userId: number;
  email: string;
  nombreCompleto: string;
}

export interface AuthResponse extends AuthUser {
  token: string;
  tokenType: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  nombreCompleto: string;
}

export interface Tarea {
  id: number;
  texto: string;
  hecha: boolean;
  fechaCreacion: string;
  fechaVencimiento: string | null;
  prioridad: Prioridad;
}

export interface CreateTareaPayload {
  texto: string;
  fechaVencimiento: string | null;
  prioridad: Prioridad;
}

