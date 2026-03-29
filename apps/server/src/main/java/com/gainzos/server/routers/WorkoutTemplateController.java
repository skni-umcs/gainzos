package com.gainzos.server.routers;

import com.gainzos.server.dto.WorkoutTemplateDTO;
import com.gainzos.server.services.WorkoutTemplateService;
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

import java.util.List;

@RestController
@RequestMapping(
        value = "/workout-templates",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "Workout Templates", description = "Endpoints for managing workout templates and their items")
public class WorkoutTemplateController {

    private final WorkoutTemplateService workoutTemplateService;

    @PermitAll
    @GetMapping(value = "/public", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get all public workout templates")
    public ResponseEntity<List<WorkoutTemplateDTO>> getAllPublic() {
        return ResponseEntity.ok(workoutTemplateService.getAllPublic());
    }

    @PermitAll
    @GetMapping(value = "/byOwner/{ownerId}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get workout templates by owner ID")
    public ResponseEntity<List<WorkoutTemplateDTO>> getByOwnerId(@PathVariable Long ownerId) {
        return ResponseEntity.ok(workoutTemplateService.getByOwnerId(ownerId));
    }

    @PermitAll
    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get a specific workout template by ID")
    public ResponseEntity<WorkoutTemplateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutTemplateService.getById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    @Operation(summary = "Create a new workout template with items")
    public ResponseEntity<StatusResponse> addTemplate(@RequestBody WorkoutTemplateDTO body) {
        workoutTemplateService.addTemplate(body);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Template created successfully"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete a workout template")
    public ResponseEntity<StatusResponse> deleteTemplate(@PathVariable Long id) {
        workoutTemplateService.deleteTemplate(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Template deleted successfully"));
    }
}