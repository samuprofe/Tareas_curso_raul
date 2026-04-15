import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import type { CreateTareaPayload, Prioridad } from '../../../types';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateTareaPayload) => Promise<void>;
}

const priorities: Prioridad[] = ['ALTA', 'MEDIA', 'BAJA'];

export function CreateTaskModal({ open, onClose, onCreate }: CreateTaskModalProps) {
  const [texto, setTexto] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [prioridad, setPrioridad] = useState<Prioridad>('MEDIA');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTexto('');
    setFechaVencimiento('');
    setPrioridad('MEDIA');
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!texto.trim()) {
      toast.error('Escribe un texto para la tarea');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({
        texto: texto.trim(),
        fechaVencimiento: fechaVencimiento || null,
        prioridad,
      });
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo crear la tarea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nueva tarea"
      description="Añade una tarea y asignale una prioridad para destacarla en el panel."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="block">
          <span className="label-base">Texto</span>
          <input
            className="input-base"
            placeholder="Ej. Preparar reunion con cliente"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            maxLength={500}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="label-base">Fecha de vencimiento</span>
            <input
              className="input-base"
              type="date"
              value={fechaVencimiento}
              onChange={(event) => setFechaVencimiento(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="label-base">Prioridad</span>
            <select
              className="input-base"
              value={prioridad}
              onChange={(event) => setPrioridad(event.target.value as Prioridad)}
            >
              {priorities.map((value) => (
                <option className="bg-brand-900 text-stone-100" key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar tarea'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}


