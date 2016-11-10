package rest.filemanager.api.models;

public class ApiModels {

    private static final String LABEL_ERROR = "error";
    private static final String LABEL_SUCCESS = "success";

    public static class ApiResponse {

        private final String status;

        public ApiResponse(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }
    }

    public static class ApiResponseWithModel extends ApiResponse {

        private final Object result;

        public ApiResponseWithModel(String status, Object model) {
            super(status);
            this.result = model;
        }

        public Object getResult() {
            return result;
        }
    }

    public static class ApiResponseWithMessage extends ApiResponse {

        private final String message;

        public ApiResponseWithMessage(String status, String message) {
            super(status);
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class ApiErrorResponse extends ApiResponseWithMessage {

        private final boolean error = Boolean.TRUE;

        public ApiErrorResponse(String message) {
            super(LABEL_ERROR, message);
        }

        public boolean isError() {
            return error;
        }

    }

    public static class ApiErrorValidationResponse<T> extends
            ApiResponseWithMessage {

        private final T validationErrors;
        private final boolean error = Boolean.TRUE;

        public ApiErrorValidationResponse(String message,
                T validationErrors) {
            super(LABEL_ERROR, message);
            this.validationErrors = validationErrors;
        }

        public T getValidationErrors() {
            return validationErrors;
        }

        public boolean isError() {
            return error;
        }
    }

    public static class ApiSuccessResponseWithModelAndMessage extends
            ApiResponseWithMessage {

        private Object result;
        private boolean success = true;

        public ApiSuccessResponseWithModelAndMessage(String message,
                Object model) {
            super(LABEL_SUCCESS, message);
            this.result = model;
        }

        public Object getResult() {
            return result;
        }

        public boolean isSuccess() {
            return success;
        }
    }

}
