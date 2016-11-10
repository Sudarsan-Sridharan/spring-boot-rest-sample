package rest.filemanager.utils;

import java.util.UUID;

public class UUIDUtils {

    public static String newUUID() {
        return UUID.randomUUID().toString().replaceAll(" ", "");
    }

}
