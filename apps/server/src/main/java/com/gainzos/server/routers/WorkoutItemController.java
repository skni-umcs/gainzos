package com.gainzos.server.routers;

import com.gainzos.server.dto.WorkoutItemDTO;
import com.gainzos.server.services.WorkoutItemService;
import com.gainzos.server.utils.StatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(
        value = "/workout-items",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "Workout Items", description = "Endpoints for managing individual exercises within templates")
public class WorkoutItemController {

    private final WorkoutItemService workoutItemService;

    @PermitAll
    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get a specific workout item by ID")
    public ResponseEntity<WorkoutItemDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutItemService.getById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/addToTemplate/{templateId}")
    @Operation(summary = "Add a new exercise item to an existing template")
    public ResponseEntity<StatusResponse> addItemToTemplate(
            @PathVariable Long templateId,
            @RequestBody WorkoutItemDTO body) {
        workoutItemService.addItemToTemplate(templateId, body);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout item added to template"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    @Operation(summary = "Update an existing workout item (e.g. change sets/reps)")
    public ResponseEntity<StatusResponse> updateItem(@RequestBody WorkoutItemDTO body) {
        workoutItemService.updateItem(body);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout item updated"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete a workout item")
    public ResponseEntity<StatusResponse> deleteItem(@PathVariable Long id) {
        workoutItemService.deleteItem(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout item deleted"));
    }
}