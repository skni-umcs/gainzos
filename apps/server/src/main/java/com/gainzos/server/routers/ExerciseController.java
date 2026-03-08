package com.gainzos.server.routers;

import com.gainzos.server.utils.StatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.ExerciseService;
import com.gainzos.server.dto.ExerciseDTO;


import java.util.List;

@RestController
@RequestMapping(
        value = "/exercises",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "Exercises", description = "Endpoints for managing exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping(value = "/getAll", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get all exercises")
    public ResponseEntity<List<ExerciseDTO>> getAllExercises(){
        return ResponseEntity.ok(exerciseService.getAll());
    }

    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get exercise by ID")
    public ResponseEntity<ExerciseDTO> getExerciseById(@PathVariable Long id) {
        return ResponseEntity.ok(exerciseService.getById(id));
    }

    @GetMapping(value = "/byName/{name}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get exercise by name")
    public ResponseEntity<ExerciseDTO> getExerciseByName(@PathVariable String name) {
        return ResponseEntity.ok(exerciseService.getByName(name));
    }

    @GetMapping(value = "/byType/{typeId}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get exercise by type ID")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByType(@PathVariable Long typeId) {
        return ResponseEntity.ok(exerciseService.getByType(typeId));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new exercise")
    public ResponseEntity<StatusResponse> addExercise(@RequestBody ExerciseDTO body) {
        exerciseService.addExercise(body);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Exercise created"));
    }

    @PutMapping("/update")
    @Operation(summary = "Update an existing exercise")
    public ResponseEntity<StatusResponse> updateExercise(@RequestBody ExerciseDTO body) {
        exerciseService.updateExercise(body);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Exercise updated"));
    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete an exercise")
    public ResponseEntity<StatusResponse> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Exercise deleted"));
    }
}
