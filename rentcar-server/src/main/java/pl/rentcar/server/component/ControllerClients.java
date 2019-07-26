package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelClient;
import pl.rentcar.server.service.ServiceClient;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/client")
public class ControllerClients extends CrudController<ModelClient, ModelClient>{

    private ServiceClient serviceClient;

    public ControllerClients(@Autowired ServiceClient serviceClient) {
        super(serviceClient);
        this.serviceClient = serviceClient;
    }

}
