package pl.rentcar.server.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class AppUtil {
    public static final String generateOrderNumber(Date date, String prefix){
        SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/mm/ss/SSS");
        return prefix + sdf.format(date);
    }
}
