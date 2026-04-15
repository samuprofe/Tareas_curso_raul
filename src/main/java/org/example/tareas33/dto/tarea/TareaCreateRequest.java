package org.example.tareas33.dto.tarea;

import java.time.LocalDate;
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
public class TareaCreateRequest {

    private String texto;

    private LocalDate fechaVencimiento;

    private Prioridad prioridad;
}


