package pl.rentcar.server.component;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerAngular {

    @GetMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }

}
