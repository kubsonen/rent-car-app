package pl.rentcar.server.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource(value = "classpath:rentcar.properties")
public class Constant {

    @Autowired
    private MessageSource messageSource;




}
