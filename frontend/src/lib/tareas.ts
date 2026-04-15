import type { Prioridad, Tarea } from '../types';

const priorityOrder: Record<Prioridad, number> = {
  ALTA: 0,
  MEDIA: 1,
  BAJA: 2,
};

export const priorityMeta: Record<
  Prioridad,
  { badge: string; dot: string; label: string }
> = {
  ALTA: {
    badge: 'border-rose-400/40 bg-rose-500/10 text-rose-200',
    dot: 'bg-rose-400',
    label: 'Alta',
  },
  MEDIA: {
    badge: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
    dot: 'bg-amber-400',
    label: 'Media',
  },
  BAJA: {
    badge: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
    dot: 'bg-emerald-400',
    label: 'Baja',
  },
};

export function sortTareasByPriority(tareas: Tarea[]) {
  return [...tareas].sort((a, b) => {
    const priorityDiff = priorityOrder[a.prioridad] - priorityOrder[b.prioridad];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
  });
}

export function formatDate(date: string | null) {
  if (!date) {
    return 'Sin vencimiento';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

