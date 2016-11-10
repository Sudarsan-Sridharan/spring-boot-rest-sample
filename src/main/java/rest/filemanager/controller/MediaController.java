package rest.filemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import rest.filemanager.service.MediaService;
import rest.filemanager.storage.MediaStoreResponse.MediaResourceResponse;

@Controller
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @GetMapping("/files/{reference:.+}")
    @ResponseBody
    public ResponseEntity serveFile(@PathVariable String reference) {
        MediaResourceResponse response = mediaService.getAsResource(reference);

        if (response.isSuccess()) {
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + response.getMedia().getFilename() + "\"")
                    .body(response.getMedia());
        }

        return ResponseEntity.notFound().build();
        
    }

   


public MediaService getMediaService() {
        return mediaService;
    }

    public void setMediaService(MediaService mediaService) {
        this.mediaService = mediaService;
    }
    
}
