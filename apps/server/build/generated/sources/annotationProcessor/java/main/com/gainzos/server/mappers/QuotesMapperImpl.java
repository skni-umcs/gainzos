package com.gainzos.server.mappers;

import com.gainzos.server.dto.QuoteDTO;
import com.gainzos.server.entities.Quote;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T23:21:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
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
