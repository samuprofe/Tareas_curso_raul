package org.example.tareas33.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "tareas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tarea", nullable = false, length = 500)
    private String texto;

    @Column(name = "texto", nullable = false, length = 500)
    private String textoLegacy;

    @Column(name = "completada", nullable = false)
    @Builder.Default
    private boolean hecha = false;

    @Column(name = "hecha", nullable = false)
    @Builder.Default
    private boolean hechaLegacy = false;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column
    private LocalDate fechaVencimiento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Prioridad prioridad;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @PrePersist
    @PreUpdate
    private void syncLegacyState() {
        this.hechaLegacy = this.hecha;
        this.textoLegacy = this.texto;
    }

    @PostLoad
    private void syncFromDatabase() {
        this.hecha = this.hecha || this.hechaLegacy;
        if ((this.texto == null || this.texto.isBlank()) && this.textoLegacy != null) {
            this.texto = this.textoLegacy;
        }
    }
}

