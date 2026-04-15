import { CalendarDays, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatDate, priorityMeta } from '../../../lib/tareas';
import type { Tarea } from '../../../types';

interface TaskItemProps {
  tarea: Tarea;
  onToggle: (tarea: Tarea) => Promise<void>;
  onDelete: (tarea: Tarea) => Promise<void>;
}

export function TaskItem({ tarea, onToggle, onDelete }: TaskItemProps) {
  const priority = priorityMeta[tarea.prioridad];

  return (
    <article className="panel flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <label className="mt-1 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={tarea.hecha}
            onChange={() => void onToggle(tarea)}
            className="h-5 w-5 rounded border-white/20 bg-brand-950 text-brand-400 focus:ring-brand-400"
          />
        </label>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${priority.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-stone-400">
              <CalendarDays className="h-4 w-4" />
              {formatDate(tarea.fechaVencimiento)}
            </span>
          </div>

          <p
            className={`text-base leading-7 text-stone-100 transition ${
              tarea.hecha ? 'text-stone-500 line-through decoration-2' : ''
            }`}
          >
            {tarea.texto}
          </p>
        </div>
      </div>

      <Button type="button" variant="ghost" className="self-end text-rose-200 hover:bg-rose-500/10 hover:text-rose-100" onClick={() => void onDelete(tarea)}>
        <Trash2 className="h-4 w-4" />
        Eliminar
      </Button>
    </article>
  );
}

