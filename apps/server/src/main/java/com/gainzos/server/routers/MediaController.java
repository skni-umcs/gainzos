package com.gainzos.server.routers;

import com.gainzos.server.utils.StatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.gainzos.server.services.MediaService;
import com.gainzos.server.dto.MediaDTO;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
@Tag(name = "Media", description = "Endpoints for managing media")
public class MediaController {

    private final MediaService mediaService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload file (multipart/form-data) -> MediaDTO")
    public ResponseEntity<MediaDTO> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam(defaultValue = "uploads") String subdir
    ) throws Exception {
        MediaDTO dto = mediaService.upload(file, subdir);
        HttpStatus s = HttpStatus.CREATED;
        return ResponseEntity.status(s)
                .body(dto);
    }

    @GetMapping("/getMetadata/{id}")
    @Operation(summary = "Get metadata of the file by id")
    public ResponseEntity<MediaDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(mediaService.get(id));
    }

    @GetMapping("/getAll")
    @Operation(summary = "Get all media")
    public ResponseEntity<List<MediaDTO>> list() {
        return ResponseEntity.ok(mediaService.getAll());
    }

    @GetMapping("/byId/{id}")
    @Operation(summary = "Get file by id(download/stream)")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Resource res = mediaService.loadFile(id);
        String filename = res.getFilename();
        if (filename == null) filename = "file";
        String encoded = URLEncoder.encode(filename, StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename*=UTF-8''" + encoded)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(res);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete media from database and disk")
    public ResponseEntity<StatusResponse> delete(@PathVariable Long id) throws Exception {
        mediaService.delete(id);
        HttpStatus s = HttpStatus.OK;
        return ResponseEntity.status(s)
                .body(new StatusResponse(s.value(), "Media deleted with ID: " + id));
    }
}
