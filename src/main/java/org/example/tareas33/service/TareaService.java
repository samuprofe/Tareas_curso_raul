package org.example.tareas33.service;

import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.tareas33.dto.tarea.TareaCreateRequest;
import org.example.tareas33.dto.tarea.TareaResponse;
import org.example.tareas33.dto.tarea.TareaUpdateRequest;
import org.example.tareas33.entity.Tarea;
import org.example.tareas33.entity.Usuario;
import org.example.tareas33.repository.TareaRepository;
import org.example.tareas33.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TareaService {

    private final TareaRepository tareaRepository;
    private final UsuarioRepository usuarioRepository;

    public List<TareaResponse> listarPorUsuario(String email) {
        Usuario usuario = getUsuarioByEmail(email);
        return tareaRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuario.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TareaResponse obtenerPorId(String email, Long id) {
        Usuario usuario = getUsuarioByEmail(email);
        Tarea tarea = tareaRepository.findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada"));
        return toResponse(tarea);
    }

    @Transactional
    public TareaResponse crear(String email, TareaCreateRequest request) {
        validateCreateRequest(request);
        Usuario usuario = getUsuarioByEmail(email);

        Tarea tarea = Tarea.builder()
                .texto(request.getTexto())
                .fechaVencimiento(request.getFechaVencimiento())
                .prioridad(request.getPrioridad())
                .usuario(usuario)
                .build();

        return toResponse(tareaRepository.save(tarea));
    }

    @Transactional
    public TareaResponse actualizar(String email, Long id, TareaUpdateRequest request) {
        validateUpdateRequest(request);
        Usuario usuario = getUsuarioByEmail(email);

        Tarea tarea = tareaRepository.findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada"));

        tarea.setTexto(request.getTexto());
        tarea.setFechaVencimiento(request.getFechaVencimiento());
        tarea.setPrioridad(request.getPrioridad());
        if (request.getHecha() != null) {
            tarea.setHecha(request.getHecha());
        }

        return toResponse(tareaRepository.save(tarea));
    }

    @Transactional
    public TareaResponse marcarHecha(String email, Long id, Boolean hecha) {
        if (hecha == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El campo hecha es obligatorio");
        }
        Usuario usuario = getUsuarioByEmail(email);

        Tarea tarea = tareaRepository.findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada"));

        tarea.setHecha(hecha);
        return toResponse(tareaRepository.save(tarea));
    }

    @Transactional
    public void eliminar(String email, Long id) {
        Usuario usuario = getUsuarioByEmail(email);
        long deleted = tareaRepository.deleteByIdAndUsuarioId(id, usuario.getId());
        if (deleted == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada");
        }
    }

    private Usuario getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no autenticado"));
    }

    private TareaResponse toResponse(Tarea tarea) {
        return TareaResponse.builder()
                .id(tarea.getId())
                .texto(tarea.getTexto())
                .hecha(tarea.isHecha())
                .fechaCreacion(tarea.getFechaCreacion())
                .fechaVencimiento(tarea.getFechaVencimiento())
                .prioridad(tarea.getPrioridad())
                .build();
    }

    private void validateCreateRequest(TareaCreateRequest request) {
        if (request == null || isBlank(request.getTexto()) || request.getPrioridad() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de tarea incompletos");
        }
    }

    private void validateUpdateRequest(TareaUpdateRequest request) {
        if (request == null || isBlank(request.getTexto()) || request.getPrioridad() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de actualizacion incompletos");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}



