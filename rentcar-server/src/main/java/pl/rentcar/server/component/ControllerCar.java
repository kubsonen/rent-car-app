package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelCar;
import pl.rentcar.server.service.ServiceCar;

@RestController
@RequestMapping("api/car")
public class ControllerCar extends CrudController<ModelCar, ModelCar> {

    private ServiceCar serviceCar;

    public ControllerCar(@Autowired ServiceCar serviceCar) {
        super(serviceCar);
        this.serviceCar = serviceCar;
    }
}
