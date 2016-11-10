package rest.filemanager.storage;

import java.io.InputStream;
import rest.filemanager.forms.MediaForms.MediaAddForm;
import rest.filemanager.storage.MediaStoreResponse.MediaResourceResponse;
import rest.filemanager.storage.MediaStoreResponse.MediaSaveResponse;


public interface MediaStore {
    public void deleteAll();
    public MediaSaveResponse save(InputStream stream, String fileName, String fileDescription);
    public MediaSaveResponse save(MediaAddForm addForm);
    public MediaResourceResponse getAsResource(String referenceId);
}
