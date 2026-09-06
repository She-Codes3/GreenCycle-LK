package lk.greencycle.common.storage;

import lk.greencycle.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path rootLocation;

    public FileStorageService(@Value("${app.file-storage.location}") String location) {
        this.rootLocation = Path.of(location).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException ex) {
            throw new BusinessException("Could not initialize file storage location");
        }
    }

    public String store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("Cannot store an empty file");
        }

        String originalName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");
        String extension = "";
        int dot = originalName.lastIndexOf('.');
        if (dot >= 0) {
            extension = originalName.substring(dot);
        }
        String storedName = UUID.randomUUID() + extension;

        try {
            Path destination = rootLocation.resolve(storedName).normalize();
            if (!destination.getParent().equals(rootLocation)) {
                throw new BusinessException("Invalid file path");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            }
            return storedName;
        } catch (IOException ex) {
            throw new BusinessException("Failed to store file " + originalName);
        }
    }

    public Path load(String storedName) {
        return rootLocation.resolve(storedName).normalize();
    }

    public void delete(String storedName) {
        try {
            Files.deleteIfExists(load(storedName));
        } catch (IOException ex) {
            throw new BusinessException("Failed to delete file " + storedName);
        }
    }
}
