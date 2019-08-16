package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelUser;
import pl.rentcar.server.model.ModelUserAdd;
import pl.rentcar.server.service.ServiceUser;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("api/user")
public class ControllerUser extends CrudController<ModelUserAdd, ModelUser> {

    private ServiceUser serviceUser;

    public ControllerUser(@Autowired ServiceUser serviceUser) {
        super(serviceUser);
        this.serviceUser = serviceUser;
    }
}
