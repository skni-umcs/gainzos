package com.gainzos.server.mappers;
import org.mapstruct.Mapper;
import com.gainzos.server.dto.QuoteDTO;
import com.gainzos.server.entities.Quote;

@Mapper(componentModel = "spring")
public interface QuotesMapper {
    QuoteDTO toDTO(Quote quote);
}
