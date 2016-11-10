package rest.filemanager.utils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;
import rest.filemanager.ApplicationConfiguration;

public class ValidationUtils {

    public static Map<String, ErrorDetail> createErrorMapWithLabels(
            BindingResult result) {

        List<ErrorDetail> errorList = new LinkedList<>();
        Map<String, ErrorDetail> errorMap = new HashMap<>();

        if (!result.hasFieldErrors()) {
            return errorMap;
        }

        for (FieldError error : result.getFieldErrors()) {

            String errorKey = error.getField();

            ErrorDetail errorDetail = errorMap.get(errorKey);

            if (errorDetail == null) {
                errorDetail = new ErrorDetail();
                errorDetail.setLabel(errorKey);
                errorMap.put(errorKey, errorDetail);
                errorList.add(errorDetail);
            }

            if (error.isBindingFailure()) {
                errorDetail.addError(error.getDefaultMessage());

            } else {
                errorDetail.addError(error.getDefaultMessage());

            }
        }
        return errorMap;
    }


    public static void rejectValues(BindingResult result, String key, List<String> errors) {
        if (errors == null || errors.isEmpty()) {
            return;
        }

        for (String error : errors) {
            result.reject(key, error);
        }
    }

    public static final class ErrorDetail {

        private String label;
        private List<String> errors = new LinkedList<>();

        public ErrorDetail() {

        }

        public ErrorDetail(String label, String error) {
            this.label = label;
            this.addError(error);
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> errors) {
            this.errors = errors;
        }

        public void addError(String error) {
            errors.add(error);
        }

    }

}
