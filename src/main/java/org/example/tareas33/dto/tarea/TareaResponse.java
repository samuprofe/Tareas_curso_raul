package org.example.tareas33.dto.tarea;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.tareas33.entity.Prioridad;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TareaResponse {

    private Long id;
    private String texto;
    private boolean hecha;
    private LocalDateTime fechaCreacion;
    private LocalDate fechaVencimiento;
    private Prioridad prioridad;
}

