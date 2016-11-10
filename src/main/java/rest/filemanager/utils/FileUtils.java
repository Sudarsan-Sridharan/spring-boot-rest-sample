package rest.filemanager.utils;

import org.apache.commons.io.FilenameUtils;

public class FileUtils {

    public static String getFileExt(String fileName) {
        return FilenameUtils.getExtension(fileName);
    }
    
    
    public static String getFileExtWithDot(String fileName) {
        String ext = FilenameUtils.getExtension(fileName);
        if(ext.length() > 0) {
            return "." + ext;
        }
        
        return "";
    }

}
