package com.gainzos.server.dto;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ExercisesTypeDTO(
        Long id,
        String name,
        MediaDTO image
) {}
