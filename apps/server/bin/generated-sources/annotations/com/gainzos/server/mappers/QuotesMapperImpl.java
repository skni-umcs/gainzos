package com.gainzos.server.mappers;

import com.gainzos.server.dto.QuoteDTO;
import com.gainzos.server.entities.Quote;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T18:20:28+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class QuotesMapperImpl implements QuotesMapper {

    @Override
    public QuoteDTO toDTO(Quote quote) {
        if ( quote == null ) {
            return null;
        }

        Long id = null;
        String text = null;
        String author = null;
        Boolean isVulgar = null;

        id = quote.getId();
        text = quote.getText();
        author = quote.getAuthor();
        isVulgar = quote.getIsVulgar();

        QuoteDTO quoteDTO = new QuoteDTO( id, text, author, isVulgar );

        return quoteDTO;
    }
}
