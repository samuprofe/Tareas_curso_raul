import { ArrowLeft, UserPlus } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register({ nombreCompleto, email, password });
      toast.success('Registro completado correctamente');
      navigate('/app');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo completar el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell justify-center">
      <section className="panel mx-auto w-full max-w-2xl p-6 sm:p-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-400 transition hover:text-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al login
        </Link>

        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-200/70">Nuevo usuario</p>
        <h1 className="text-3xl font-semibold text-white">Crear cuenta</h1>
        <p className="mt-2 text-sm text-stone-400">
          Registrate para acceder a tu panel personal y gestionar tus tareas por prioridad.
        </p>

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
          <div className="sm:col-span-2">
            <Input
              id="register-name"
              label="Nombre completo"
              placeholder="Samuel Garcia"
              value={nombreCompleto}
              onChange={(event) => setNombreCompleto(event.target.value)}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="samuel@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              id="register-password"
              label="Contrasena"
              type="password"
              placeholder="Minimo 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              <UserPlus className="h-4 w-4" />
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate('/')}>
              Ya tengo cuenta
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}


