import { ListTodo, LogOut, Plus, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { ApiError, tareasApi } from '../../../lib/api';
import { sortTareasByPriority } from '../../../lib/tareas';
import { useAuth } from '../../auth/context/AuthContext';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { TaskItem } from '../components/TaskItem';
import type { CreateTareaPayload, Tarea } from '../../../types';

export function DashboardPage() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sortedTasks = useMemo(() => sortTareasByPriority(tareas), [tareas]);
  const completadas = useMemo(() => tareas.filter((tarea) => tarea.hecha).length, [tareas]);

  const handleUnauthorized = () => {
    logout();
    toast.error('Tu sesion ha expirado. Vuelve a iniciar sesion.');
    navigate('/');
  };

  const loadTasks = async (showRefresh = false) => {
    if (!token) {
      return;
    }

    if (showRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await tareasApi.list(token);
      setTareas(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        handleUnauthorized();
        return;
      }
      toast.error(error instanceof Error ? error.message : 'No se pudieron cargar las tareas');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadTasks();
  }, [token]);

  const createTask = async (payload: CreateTareaPayload) => {
    if (!token) {
      return;
    }

    try {
      const created = await tareasApi.create(token, payload);
      setTareas((current) => [created, ...current]);
      toast.success('Tarea creada');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        handleUnauthorized();
        return;
      }
      throw error;
    }
  };

  const toggleTask = async (task: Tarea) => {
    if (!token) {
      return;
    }

    try {
      const updated = await tareasApi.toggle(token, task.id, !task.hecha);
      setTareas((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      toast.success(updated.hecha ? 'Tarea marcada como realizada' : 'Tarea reactivada');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        handleUnauthorized();
        return;
      }
      toast.error(error instanceof Error ? error.message : 'No se pudo actualizar la tarea');
    }
  };

  const deleteTask = async (task: Tarea) => {
    if (!token) {
      return;
    }

    try {
      await tareasApi.remove(token, task.id);
      setTareas((current) => current.filter((item) => item.id !== task.id));
      toast.success('Tarea eliminada');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        handleUnauthorized();
        return;
      }
      toast.error(error instanceof Error ? error.message : 'No se pudo eliminar la tarea');
    }
  };

  return (
    <main className="page-shell gap-6">
      <header className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-200/70">Panel principal</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Hola, {user?.nombreCompleto ?? 'Usuario'}
          </h1>
          <p className="mt-2 text-sm text-stone-400">Prioriza tus tareas y manten el foco en lo importante.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={() => void loadTasks(true)} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Recargar
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Nueva tarea
          </Button>
          <Button
            variant="ghost"
            className="border border-white/10"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <p className="text-sm text-stone-400">Usuario</p>
          <p className="mt-2 text-lg font-semibold text-white">{user?.email}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-stone-400">Tareas totales</p>
          <p className="mt-2 text-3xl font-semibold text-white">{tareas.length}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-stone-400">Completadas</p>
          <p className="mt-2 text-3xl font-semibold text-white">{completadas}</p>
        </div>
      </section>

      <section className="panel flex-1 p-5 sm:p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-white">
              <ListTodo className="h-5 w-5 text-brand-200" />
              Tus tareas ordenadas por prioridad
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              Primero se muestran las tareas mas prioritarias y cada nivel se diferencia por color.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center text-stone-400">Cargando tareas...</div>
        ) : sortedTasks.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-brand-950/40 px-6 text-center">
            <p className="text-lg font-semibold text-white">Todavia no tienes tareas</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-stone-400">
              Crea tu primera tarea desde el boton superior y empieza a organizar tu trabajo por prioridad.
            </p>
            <Button className="mt-5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Crear tarea
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((tarea) => (
              <TaskItem key={tarea.id} tarea={tarea} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        )}
      </section>

      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={createTask} />
    </main>
  );
}


