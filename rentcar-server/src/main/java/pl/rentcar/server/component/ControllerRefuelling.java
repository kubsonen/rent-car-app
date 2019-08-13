package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelRefuelling;
import pl.rentcar.server.service.ServiceRefuelling;

@RestController
@RequestMapping("api/refuelling")
public class ControllerRefuelling extends CrudController<ModelRefuelling, ModelRefuelling> {

    private ServiceRefuelling serviceRefuelling;

    public ControllerRefuelling(@Autowired ServiceRefuelling serviceRefuelling) {
        super(serviceRefuelling);
        this.serviceRefuelling = serviceRefuelling;
    }
}
