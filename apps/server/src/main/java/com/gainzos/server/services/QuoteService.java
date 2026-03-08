package com.gainzos.server.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.gainzos.server.repository.QuoteRepository;
import com.gainzos.server.entities.Quote;
import com.gainzos.server.dto.QuoteDTO;
import com.gainzos.server.mappers.QuotesMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteService {
    private final QuoteRepository quoteRepository;
    private final QuotesMapper quoteMapper;

    public List<QuoteDTO> getAll(){
        return quoteRepository.findAll().stream().map(quoteMapper::toDTO).toList();
    }

    public QuoteDTO getRandom(boolean includeVulgar){
        List<QuoteDTO> quotes = getAll();
        if (!includeVulgar) {
            quotes = quotes.stream().filter(quote -> !quote.isVulgar()).toList();
        }
        if (quotes.isEmpty()) {
            throw new RuntimeException("No quotes available");
        } else {
            int randomIndex = (int) (Math.random() * quotes.size());
            return quotes.get(randomIndex);
        }
    }

    public QuoteDTO addQuote(QuoteDTO quoteDTO){
        Quote quote = new Quote();
        quote.setText(quoteDTO.text());
        quote.setAuthor(quoteDTO.author());
        quote.setIsVulgar(quoteDTO.isVulgar());
        Quote saved = quoteRepository.save(quote);
        return new QuoteDTO(saved.getId(), saved.getAuthor(), saved.getText(), saved.getIsVulgar());
    }

    public QuoteDTO updateQuote(QuoteDTO quoteDTO){
        Quote quote = quoteRepository.findById(quoteDTO.id())
                .orElseThrow(() -> new RuntimeException("Quote not found with ID: " + quoteDTO.id()));
        quote.setText(quoteDTO.text());
        quote.setAuthor(quoteDTO.author());
        quote.setIsVulgar(quoteDTO.isVulgar());
        Quote updated = quoteRepository.save(quote);
        return new QuoteDTO(updated.getId(), updated.getAuthor(), updated.getText(), updated.getIsVulgar());
    }

    public void deleteQuote(Long id){
        quoteRepository.deleteById(id);
    }
}
