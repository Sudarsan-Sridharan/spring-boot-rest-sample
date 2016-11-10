package rest.filemanager.storage;

import java.util.LinkedList;
import java.util.List;
import org.springframework.core.io.Resource;
import rest.filemanager.model.Media;

public class MediaStoreResponse {

    
    
    static abstract class MediaBaseResponse<T> {

        private final boolean success;
        private T media;
        private final List<String> errors;

        public MediaBaseResponse(T media) {
            this.media = media;
            this.success = true;
            errors = new LinkedList<>();
            this.media = media;
        }

        public MediaBaseResponse(List<String> errors) {
            this.errors = errors;
            this.success = false;
            this.media = null;
        }

        public boolean isSuccess() {
            return success;
        }

        public T getMedia() {
            return media;
        }

        public List<String> getErrors() {
            return errors;
        }
    }

    public static class MediaSaveResponse extends MediaBaseResponse<Media> {

        private final Throwable exception;

        public MediaSaveResponse(Media media) {
            super(media);
            exception = null;
        }

        public MediaSaveResponse(List<String> errors, Throwable t) {
            super(errors);
            this.exception = t;
        }

        public Throwable getException() {
            return exception;
        }

        public boolean isException() {
            return exception != null;
        }

        public static MediaSaveResponse success(Media media) {
            return new MediaSaveResponse(media);
        }

        public static MediaSaveResponse error(String error) {
            return MediaSaveResponse.error(error, null);
        }

        public static MediaSaveResponse error(String error, Throwable t) {
            List<String> errors = new LinkedList<>();
            errors.add(error);
            return new MediaSaveResponse(errors, null);
        }
    }

    public static class MediaResourceResponse extends MediaBaseResponse<Resource> {

        public MediaResourceResponse(Resource media) {
            super(media);
        }

        public MediaResourceResponse(List<String> errors) {
            super(errors);
        }

        public static MediaResourceResponse success(Resource media) {
            return new MediaResourceResponse(media);
        }

        public static MediaResourceResponse error(String error) {
            List<String> errors = new LinkedList<>();
            errors.add(error);
            return new MediaResourceResponse(errors);
        }
    }

}
