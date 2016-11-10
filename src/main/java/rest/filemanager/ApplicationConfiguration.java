package rest.filemanager;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationConfiguration {

    @Value("${app.media.uploadFolder}")
    private String uploadFolder = "files";

    @Value("${app.media.useUUID}")
    private boolean useUUIDAsFileName = true;

    
    public String getUploadFolder() {
        return uploadFolder;
    }

    public boolean isUseUUIDAsFileName() {
        return useUUIDAsFileName;
    }



}
