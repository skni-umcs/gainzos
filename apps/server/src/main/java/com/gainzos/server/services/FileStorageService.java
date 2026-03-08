package com.gainzos.server.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path root;

    public FileStorageService(@Value("${media.storage.root:storage}") String rootDir) throws IOException {
        this.root = Paths.get(rootDir).toAbsolutePath().normalize();
        Files.createDirectories(this.root);
    }

    public String save(String subdir, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Invalid file");
        }
        Path dir = root.resolve(subdir).normalize();
        Files.createDirectories(dir);
        String ext = Optional.ofNullable(file.getOriginalFilename())
                .filter(n -> n.contains("."))
                .map(n -> n.substring(n.lastIndexOf('.')))
                .orElse("");

        String storedName = UUID.randomUUID() + ext;
        Path target = dir.resolve(storedName).normalize();
        if (!target.startsWith(root)) {
            throw new SecurityException("Wrong path");
        }
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return root.relativize(target).toString().replace("\\", "/");
    }

    public Resource loadAsResource(String relativePath) {
        Path p = root.resolve(relativePath).normalize();
        if (!p.startsWith(root)) {
            throw new SecurityException("Wrong path");
        }
        return new FileSystemResource(p.toFile());
    }

    public boolean delete(String relativePath) throws IOException {
        Path p = root.resolve(relativePath).normalize();
        if (!p.startsWith(root)) {
            throw new SecurityException("Wrong path");
        }
        return Files.deleteIfExists(p);
    }
}
