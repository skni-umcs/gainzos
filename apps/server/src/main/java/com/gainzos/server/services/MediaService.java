package com.gainzos.server.services;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.gainzos.server.repository.MediaRepository;
import com.gainzos.server.entities.Media;
import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.mappers.MediaMapper;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaRepository repository;
    private final MediaMapper mapper;
    private final FileStorageService storage;

    @Transactional
    public MediaDTO upload(MultipartFile file, String subdir) throws IOException {
        String relativePath = storage.save(subdir, file);
        Media media = Media.builder()
                .url(relativePath)
                .build();
        Media saved = repository.save(media);
        return mapper.toDTO(saved);
    }

    @Transactional(readOnly = true)
    public MediaDTO get(Long id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Media not found: " + id));
    }

    @Transactional(readOnly = true)
    public List<MediaDTO> getAll() {
        return repository.findAll().stream().map(mapper::toDTO).toList();
    }

    @Transactional
    public void delete(Long id) throws IOException {
        Media media = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Media not found: " + id));
        storage.delete(media.getUrl());
        repository.delete(media);
    }

    @Transactional(readOnly = true)
    public Resource loadFile(Long id) {
        Media media = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Media not found: " + id));
        return storage.loadAsResource(media.getUrl());
    }
}
