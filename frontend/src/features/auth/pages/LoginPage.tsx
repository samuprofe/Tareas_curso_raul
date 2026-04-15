import { LogIn, UserRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      toast.success('Sesion iniciada correctamente');
      navigate('/app');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo iniciar sesion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell justify-center">
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 text-stone-100 shadow-warm backdrop-blur lg:block">
          <div className="mb-6 inline-flex rounded-full border border-brand-300/20 bg-brand-400/10 p-4 text-brand-200">
            <UserRound className="h-9 w-9" />
          </div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-brand-200/70">Tareas33</p>
          <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">
            Organiza tus tareas con un panel moderno, claro y centrado en prioridades.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-stone-300">
            Gestiona tu dia, marca tareas completadas, prioriza lo importante y accede desde una interfaz elegante con tonos marrones.
          </p>
        </section>

        <section className="panel mx-auto w-full max-w-xl p-6 sm:p-8">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-200/70">Bienvenido</p>
          <h2 className="text-3xl font-semibold text-white">Inicia sesion</h2>
          <p className="mt-2 text-sm text-stone-400">Accede con tu email y contrasena para gestionar tus tareas.</p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="ana@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              id="login-password"
              label="Contrasena"
              type="password"
              placeholder="******"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <LogIn className="h-4 w-4" />
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-stone-400">
            ¿No tienes cuenta?{' '}
            <Link className="font-semibold text-brand-200 transition hover:text-brand-100" to="/register">
              Registrate aqui
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}


