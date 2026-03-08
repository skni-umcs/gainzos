package com.gainzos.server.routers;

import com.gainzos.server.utils.StatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.ExercisesTypeService;
import com.gainzos.server.dto.ExercisesTypeDTO;

import java.util.List;

@RestController
@RequestMapping(
        value = "/exercises-types",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "Exercises Types", description = "Endpoints for managing exercises types")
public class ExercisesTypeController {

    private final ExercisesTypeService service;

    @GetMapping(value = "/getAll", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get all exercises types")
    public ResponseEntity<List<ExercisesTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get exercise type by ID")
    public ResponseEntity<ExercisesTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new exercise type")
    public ResponseEntity<StatusResponse> add(@RequestBody ExercisesTypeDTO dto) {
        service.addExercisesType(dto);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Exercise type created"));
    }

    @PutMapping("/update")
    @Operation(summary = "Update an existing exercise type")
    public ResponseEntity<StatusResponse> update(@RequestBody ExercisesTypeDTO dto) {
        service.updateExercisesType(dto);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Exercise type updated"));
    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete an exercise type")
    public ResponseEntity<StatusResponse> delete(@PathVariable Long id) {
        service.deleteExercisesType(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Exercise type deleted"));
    }
}
