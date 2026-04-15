package org.example.tareas33.config;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.tareas33.entity.Prioridad;
import org.example.tareas33.entity.Tarea;
import org.example.tareas33.entity.Usuario;
import org.example.tareas33.repository.TareaRepository;
import org.example.tareas33.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final TareaRepository tareaRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        List<SeedUser> users = List.of(
                new SeedUser("ana@example.com", "ana12345", "Ana Diaz"),
                new SeedUser("bruno@example.com", "bruno12345", "Bruno Lopez"),
                new SeedUser("carla@example.com", "carla12345", "Carla Ramos")
        );

        for (SeedUser seed : users) {
            Usuario usuario = usuarioRepository.findByEmail(seed.email())
                    .orElseGet(() -> usuarioRepository.save(Usuario.builder()
                            .email(seed.email())
                            .password(passwordEncoder.encode(seed.rawPassword()))
                            .nombreCompleto(seed.nombreCompleto())
                            .build()));

            if (tareaRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuario.getId()).isEmpty()) {
                tareaRepository.saveAll(List.of(
                        Tarea.builder()
                                .texto("Planificar semana")
                                .prioridad(Prioridad.ALTA)
                                .fechaVencimiento(LocalDate.now().plusDays(2))
                                .usuario(usuario)
                                .build(),
                        Tarea.builder()
                                .texto("Leer documentacion JWT")
                                .prioridad(Prioridad.MEDIA)
                                .fechaVencimiento(LocalDate.now().plusDays(4))
                                .usuario(usuario)
                                .build(),
                        Tarea.builder()
                                .texto("Ordenar backlog personal")
                                .prioridad(Prioridad.BAJA)
                                .fechaVencimiento(LocalDate.now().plusDays(7))
                                .usuario(usuario)
                                .build()
                ));
            }

            log.info("Usuario inicial -> email: {} | password: {}", seed.email(), seed.rawPassword());
        }
    }

    private record SeedUser(String email, String rawPassword, String nombreCompleto) {
    }
}

