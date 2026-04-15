import type {
  AuthResponse,
  CreateTareaPayload,
  LoginPayload,
  RegisterPayload,
  Tarea,
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function extractErrorMessage(payload: unknown, status: number) {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidate = payload as Record<string, unknown>;
    const message = candidate.detail ?? candidate.message ?? candidate.error ?? candidate.title;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return `Error HTTP ${status}`;
}

async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '');

  if (!response.ok) {
    throw new ApiError(extractErrorMessage(payload, response.status), response.status);
  }

  return payload as T;
}

export const authApi = {
  login: (data: LoginPayload) =>
    apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  register: (data: RegisterPayload) =>
    apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const tareasApi = {
  list: (token: string) => apiRequest<Tarea[]>('/api/tareas', {}, token),
  create: (token: string, data: CreateTareaPayload) =>
    apiRequest<Tarea>('/api/tareas', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),
  toggle: (token: string, id: number, hecha: boolean) =>
    apiRequest<Tarea>(`/api/tareas/${id}/hecha`, {
      method: 'PATCH',
      body: JSON.stringify({ hecha }),
    }, token),
  remove: (token: string, id: number) =>
    apiRequest<void>(`/api/tareas/${id}`, {
      method: 'DELETE',
    }, token),
};


