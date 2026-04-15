package org.example.tareas33.repository;

import java.util.List;
import java.util.Optional;
import org.example.tareas33.entity.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    List<Tarea> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);

    Optional<Tarea> findByIdAndUsuarioId(Long id, Long usuarioId);

    long deleteByIdAndUsuarioId(Long id, Long usuarioId);
}

