package com.gainzos.server.entities;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "quotes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Quote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "author", nullable = false, length = 255)
    private String author;

    @Column(name = "text", nullable = false, length = 255)
    private String text;

    @Column(name = "is_vulgar", nullable = false)
    private Boolean isVulgar;

}

