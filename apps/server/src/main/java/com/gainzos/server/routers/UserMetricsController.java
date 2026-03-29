package com.gainzos.server.routers;

import com.gainzos.server.dto.UserMetricsDTO;
import com.gainzos.server.services.UserMetricsService;
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
        value = "/user-metrics",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
@Tag(name = "User Metrics", description = "Endpoints for managing user physical metrics and goals")
public class UserMetricsController {

    private final UserMetricsService userMetricsService;

    @PermitAll
    @GetMapping(value = "/getAll", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get all user metrics")
    public ResponseEntity<List<UserMetricsDTO>> getAllMetrics() {
        return ResponseEntity.ok(userMetricsService.getAll());
    }

    @PermitAll
    @GetMapping(value = "/byUser/{userId}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get metrics by user ID", description = "Retrieves all metrics history for a specific user")
    public ResponseEntity<List<UserMetricsDTO>> getMetricsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(userMetricsService.getByUserId(userId));
    }

    @PermitAll
    @GetMapping(value = "/byId/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Get specific metric record by ID")
    public ResponseEntity<UserMetricsDTO> getMetricsById(@PathVariable Long id) {
        return ResponseEntity.ok(userMetricsService.getById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    @Operation(summary = "Add new user metrics")
    public ResponseEntity<StatusResponse> addMetrics(@RequestBody UserMetricsDTO body) {
        userMetricsService.addMetrics(body);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "User metrics created"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    @Operation(summary = "Update existing user metrics")
    public ResponseEntity<StatusResponse> updateMetrics(@RequestBody UserMetricsDTO body) {
        userMetricsService.updateMetrics(body);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "User metrics updated"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    @Operation(summary = "Delete user metrics")
    public ResponseEntity<StatusResponse> deleteMetrics(@PathVariable Long id) {
        userMetricsService.deleteMetrics(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s).body(new StatusResponse(s.value(), "User metrics deleted"));
    }
}