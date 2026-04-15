package org.example.tareas33.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.tareas33.dto.tarea.TareaCreateRequest;
import org.example.tareas33.dto.tarea.TareaResponse;
import org.example.tareas33.dto.tarea.TareaUpdateRequest;
import org.example.tareas33.dto.tarea.ToggleHechaRequest;
import org.example.tareas33.service.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
public class TareaController {

    private final TareaService tareaService;

    @GetMapping
    public ResponseEntity<List<TareaResponse>> listar(Authentication authentication) {
        return ResponseEntity.ok(tareaService.listarPorUsuario(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TareaResponse> obtenerPorId(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(tareaService.obtenerPorId(authentication.getName(), id));
    }

    @PostMapping
    public ResponseEntity<TareaResponse> crear(
            @RequestBody TareaCreateRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tareaService.crear(authentication.getName(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaResponse> actualizar(
            @PathVariable Long id,
            @RequestBody TareaUpdateRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(tareaService.actualizar(authentication.getName(), id, request));
    }

    @PatchMapping("/{id}/hecha")
    public ResponseEntity<TareaResponse> marcarHecha(
            @PathVariable Long id,
            @RequestBody ToggleHechaRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(tareaService.marcarHecha(authentication.getName(), id, request.getHecha()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, Authentication authentication) {
        tareaService.eliminar(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}


