package rest.filemanager.forms;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public class MediaForms {
    
    public static class MediaAddForm {
        
        @Size(min=0, max=255)
        private String title;

        @Size(min=0, max=2000)
        private String description;

        @NotNull
        private MultipartFile file;
        
        
        
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public MultipartFile getFile() {
            return file;
        }

        public void setFile(MultipartFile file) {
            this.file = file;
        }
    }
}
