package com.gainzos.server.routers;

import com.gainzos.server.utils.StatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.QuoteService;
import com.gainzos.server.dto.QuoteDTO;

import java.util.List;

@RestController
@RequestMapping("/quotes")
@RequiredArgsConstructor
@Tag(name = "Quotes", description = "Endpoints for managing quotes")
public class QuoteController {

    private final QuoteService quoteService;

    @GetMapping("/getAll")
    @Operation(summary = "Get all quotes", description = "Retrieve a list of all quotes")
    public ResponseEntity<List<QuoteDTO>> getAllQuotes() {
        List<QuoteDTO> quotes = quoteService.getAll();
        return ResponseEntity.ok(quotes);
    }

    @GetMapping("/random")
    @Operation(summary = "Get a random quote", description = "Retrieve a random quote from the collection")
    public ResponseEntity<QuoteDTO> getRandomQuote(
            @RequestParam(name = "includeVulgar", defaultValue = "false") boolean includeVulgar
    ) {
        QuoteDTO randomQuote = quoteService.getRandom(includeVulgar);
        return ResponseEntity.ok(randomQuote);
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new quote", description = "Add a new quote to the collection")
    public ResponseEntity<StatusResponse> addQuote(@RequestBody QuoteDTO quoteDTO) {
        QuoteDTO savedQuote = quoteService.addQuote(quoteDTO);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Quote added with ID: " + savedQuote.id()));
    }

    @PutMapping("/update")
    @Operation(summary = "Update an existing quote", description = "Update the details of an existing quote")
    public ResponseEntity<StatusResponse> updateQuote(@RequestBody QuoteDTO quoteDTO) {
        QuoteDTO updatedQuote = quoteService.updateQuote(quoteDTO);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Quote updated with ID: " + updatedQuote.id()));
    }

    @DeleteMapping("{id}")
    @Operation(summary = "Delete a quote", description = "Delete a quote from the collection")
    public ResponseEntity<StatusResponse> deleteQuote(@PathVariable Long id) {
        quoteService.deleteQuote(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Quote deleted with ID: " + id));
    }
}
