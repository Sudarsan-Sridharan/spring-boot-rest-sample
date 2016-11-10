package rest.filemanager.api.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;
import rest.filemanager.ApplicationConfiguration;
import rest.filemanager.api.models.ApiModels;
import rest.filemanager.api.models.ApiModels.ApiErrorValidationResponse;
import rest.filemanager.api.models.ApiModels.ApiResponse;
import rest.filemanager.api.models.ApiModels.ApiSuccessResponseWithModelAndMessage;
import rest.filemanager.forms.MediaForms.MediaAddForm;
import rest.filemanager.model.Media;
import rest.filemanager.service.MediaService;
import rest.filemanager.storage.MediaStoreResponse.MediaSaveResponse;
import rest.filemanager.utils.ValidationUtils;

@RestController
@RequestMapping("/api/files")
public class MediaApiController {

    protected final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private MediaService mediaService;

    @Autowired
    private ApplicationConfiguration configuration;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<Media> list(@PageableDefault(size = 10, page = 0, sort = {"creationDate"}, direction = Direction.DESC) Pageable pageable) {
        return mediaService.list(pageable);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ApiResponse add(@Valid MediaAddForm addForm, BindingResult result,
            HttpServletResponse response) {

        try {
            
            Thread.sleep(5000);

            if (addForm.getFile() == null || addForm.getFile().getSize() == 0) {
                result.rejectValue("file", "A Vaild file is required");
            }

            if (result.hasErrors()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return new ApiErrorValidationResponse<>(
                        "Validation Failed", ValidationUtils.createErrorMapWithLabels(result));
            }

            MediaSaveResponse mediaResponse = mediaService.add(addForm);

            if (!mediaResponse.isSuccess()) {
                ValidationUtils.rejectValues(result, "file", mediaResponse.getErrors());
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

                if (mediaResponse.isException() && logger.isErrorEnabled()) {
                    logger.error("Unable to upload file", mediaResponse.getException());

                }

                return new ApiErrorValidationResponse<>(
                        "Error uploading Files", ValidationUtils.createErrorMapWithLabels(result));
            }

            return new ApiSuccessResponseWithModelAndMessage("File added successfully", mediaResponse.getMedia());
        } catch (Throwable t) {
            if (logger.isErrorEnabled()) {
                logger.error("Unable to upload file", t);
            }

            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return new ApiModels.ApiErrorResponse("Error unable to add file");

        }
    }
    
    @RestControllerAdvice
    public static  class GlobalControllerExceptionHandler {

    
    @ExceptionHandler(MultipartException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleFileSize(MultipartException e) {
        return new ApiModels.ApiErrorResponse(e.getRootCause().getMessage());
    }
    
    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleStorageFileNotFound(Throwable e) {
        return new ApiModels.ApiErrorResponse("Error an unexpected error has occurred");
    }    
        

    }
    
    
    

}
