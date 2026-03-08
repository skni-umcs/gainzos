package com.gainzos.server.dto;

public record QuoteDTO(
        Long id,
        String text,
        String author,
        Boolean isVulgar
        ) {}
