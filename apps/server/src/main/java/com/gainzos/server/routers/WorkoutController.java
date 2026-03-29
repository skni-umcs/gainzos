package com.gainzos.server.routers;

import com.gainzos.server.dto.WorkoutDTO;
import com.gainzos.server.services.WorkoutService;
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
        value = "/workouts",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "Workouts", description = "Endpoints for managing user workout history")
public class WorkoutController {

    private final WorkoutService workoutService;

    @PermitAll
    @GetMapping(value = "/getAll", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get all workouts history")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.getAll());
    }

    @PermitAll
    @GetMapping(value = "/byUser/{userId}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get workout history by user ID")
    public ResponseEntity<List<WorkoutDTO>> getWorkoutsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(workoutService.getByUserId(userId));
    }

    @PermitAll
    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get a specific workout by ID")
    public ResponseEntity<WorkoutDTO> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    @Operation(summary = "Log a new completed workout")
    public ResponseEntity<StatusResponse> addWorkout(@RequestBody WorkoutDTO body) {
        workoutService.addWorkout(body);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout logged successfully"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    @Operation(summary = "Update an existing workout log (duration/volume)")
    public ResponseEntity<StatusResponse> updateWorkout(@RequestBody WorkoutDTO body) {
        workoutService.updateWorkout(body);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout updated successfully"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete a workout from history")
    public ResponseEntity<StatusResponse> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "Workout deleted successfully"));
    }
}