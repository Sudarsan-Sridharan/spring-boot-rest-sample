package rest.filemanager.storage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import rest.filemanager.ApplicationConfiguration;
import rest.filemanager.forms.MediaForms.MediaAddForm;
import rest.filemanager.model.Media;
import rest.filemanager.storage.MediaStoreResponse.MediaResourceResponse;
import rest.filemanager.storage.MediaStoreResponse.MediaSaveResponse;
import rest.filemanager.utils.FileUtils;
import rest.filemanager.utils.UUIDUtils;

@Service
public class MediaFileStoreImpl implements MediaStore {
   
    private final Path rootDir;
    private final boolean useUUID;


    @Autowired
    private final ApplicationConfiguration config;

    public MediaFileStoreImpl(ApplicationConfiguration config) {
        this.config = config;
        this.rootDir = Paths.get(config.getUploadFolder());
        this.useUUID = config.isUseUUIDAsFileName();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.rootDir);

        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }

    @Override
    public void deleteAll() {
        try {
            FileSystemUtils.deleteRecursively(this.rootDir.toFile());
            Files.createDirectories(this.rootDir);
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }

    @Override
    public MediaSaveResponse save(MediaAddForm addForm) {
        try {

            if (addForm.getFile().isEmpty()) {
                return MediaSaveResponse.error("A valid file is required");
            }

            final String referenceId = getFileName(addForm.getFile().getOriginalFilename());
            final Path filePath = resolvePath(referenceId);
            Files.copy(addForm.getFile().getInputStream(), filePath);

            return MediaSaveResponse.success(new Media(addForm.getTitle(), referenceId, addForm.getDescription(),
                    addForm.getFile().getSize(), addForm.getFile().getOriginalFilename()));
        } catch (IOException e) {
            return MediaSaveResponse.error("A valid file is required", e);
        }
    }
    
    @Override
    public MediaSaveResponse save(InputStream stream, String fileName, String fileDescription) {
        try {

            final String referenceId = getFileName(fileName);
            final Path filePath = resolvePath(referenceId);
            Files.copy(stream, filePath);
            File file = filePath.toFile();

            return MediaSaveResponse.success(new Media(file.getName(), 
                    referenceId, fileDescription, file.length(), fileName));
        } catch (IOException e) {
            return MediaSaveResponse.error("A valid file is required", e);
        }
    }

   
    @Override
    public MediaResourceResponse getAsResource(String referenceId) {
        try {
            Resource resource = new UrlResource(resolvePath(referenceId).toUri());
            if (resource.exists() || resource.isReadable()) {
                return MediaResourceResponse.success(resource);
            } else {
                return MediaResourceResponse.error("Unable to read resource");
            }
        } catch (MalformedURLException e) {
            return MediaResourceResponse.error("Unable to read resource");
        }
    }

    private Path resolvePath(String fileReference) {
        return this.rootDir.resolve(fileReference);
    }

    private String getFileName(String fileName) {
        if (config.isUseUUIDAsFileName()) {
            return UUIDUtils.newUUID() + FileUtils.getFileExtWithDot(fileName);
        }

        return fileName;
    }
}
