package rest.filemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import rest.filemanager.forms.MediaForms.MediaAddForm;
import rest.filemanager.model.Media;
import rest.filemanager.repository.MediaRepository;
import rest.filemanager.storage.MediaStore;
import rest.filemanager.storage.MediaStoreResponse;
import rest.filemanager.storage.MediaStoreResponse.MediaSaveResponse;
import rest.filemanager.utils.FileUtils;

@Service
public class MediaServiceImpl implements MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private MediaStore mediaStore;

    @Override
    public Page<Media> list(Pageable pageable) {
        return mediaRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = false)
    public MediaSaveResponse add(MediaAddForm form) {

        MediaSaveResponse response = mediaStore.save(form);

        if (response.isSuccess()) {
            setTitleIfRequired(form.getFile(), response.getMedia());
            setDescriptionIfRequired(form.getFile(), response.getMedia());
            mediaRepository.save(response.getMedia());
        }

        return response;
    }

    private static final String DESCRIPTION_FORMAT = "Original File Name: %s, File Size: %s bytes, File Ext: %s";

    private void setTitleIfRequired(MultipartFile file, Media media) {
        if (media.getTitle() == null || media.getTitle().trim().equals("")) {
            media.setTitle(file.getOriginalFilename());
        }
    }

    private void setDescriptionIfRequired(MultipartFile file, Media media) {
        if (media.getDescription() == null || media.getDescription().trim().equals("")) {
            media.setDescription(String.format(DESCRIPTION_FORMAT, file.getOriginalFilename(), file.getSize(),
                    FileUtils.getFileExt(file.getOriginalFilename())));
        }
    }

    @Override
    public MediaStoreResponse.MediaResourceResponse getAsResource(String referenceId) {
        return mediaStore.getAsResource(referenceId);
    }

    public MediaRepository getMediaRepository() {
        return mediaRepository;
    }

    public void setMediaRepository(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public MediaStore getMediaStore() {
        return mediaStore;
    }

    public void setMediaStore(MediaStore mediaStore) {
        this.mediaStore = mediaStore;
    }

}
