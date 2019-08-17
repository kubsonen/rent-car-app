package pl.rentcar.server.component;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerAngular {

    @GetMapping(value = {
            "/{[path:[^\\.]*}",
            "/cars/{[path:[^\\.]*}",
            "/clients/{[path:[^\\.]*}",
            "/clients/{[path:[^\\.]*}",
            "/authority/{[path:[^\\.]*}",
            "/orders/{[path:[^\\.]*}",
            "/bundle/{[path:[^\\.]*}",
            "/refuelling/{[path:[^\\.]*}",
            "/priceList/{[path:[^\\.]*}"})
    public String redirect() {
        return "forward:/index.html";
    }

}
