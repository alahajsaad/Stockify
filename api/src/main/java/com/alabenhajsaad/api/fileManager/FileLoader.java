package com.alabenhajsaad.api.fileManager;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileLoader {
    private final Path root = Paths.get( "uploads");



    public String uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide ou non fourni.");
        }

        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        // Prevent security risks from path traversal attacks
        if (originalFileName.contains("..")) {
            throw new SecurityException("Nom de fichier invalide : " + originalFileName);
        }

        String uniqueFileName = generateUniqueFileName(originalFileName);

        try {
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            // Enregistrer le fichier dans le dossier "uploads"
            Path filePath = root.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du téléchargement du fichier : " + e.getMessage(), e);
        }
    }

    public Resource downloadFile(String uniqueFileName){
        try {
            Path filePath = root.resolve(uniqueFileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file! File path: " + filePath + " Resource: " + resource);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
    // Helper method to determine content type based on file extension
    public String determineContentType(String filename) {
        String extension = StringUtils.getFilenameExtension(filename);
        if (extension == null) {
            return "application/octet-stream";
        }

        return switch (extension.toLowerCase()) {
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            case "gif" -> "image/gif";
            case "svg" -> "image/svg+xml";
            case "pdf" -> "application/pdf";
            default -> "application/octet-stream";
        };}

    private static String generateUniqueFileName(String originalFileName) {
        String extension = StringUtils.getFilenameExtension(originalFileName);

        if (extension == null || extension.isEmpty()) {
            throw new IllegalArgumentException("Le fichier ne possède pas d'extension valide.");
        }

        String uniqueID = UUID.randomUUID().toString();
        return uniqueID + "." + extension;
    }
}
