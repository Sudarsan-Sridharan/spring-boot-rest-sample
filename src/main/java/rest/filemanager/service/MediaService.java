/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.filemanager.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rest.filemanager.forms.MediaForms.MediaAddForm;
import rest.filemanager.model.Media;
import rest.filemanager.storage.MediaStoreResponse.MediaResourceResponse;
import rest.filemanager.storage.MediaStoreResponse.MediaSaveResponse;

public interface MediaService {

    public Page<Media> list(Pageable pageable);

    public MediaSaveResponse add(MediaAddForm form);
    
    public MediaResourceResponse getAsResource(String referenceId);
}
