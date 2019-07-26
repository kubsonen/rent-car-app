package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelOrder;
import pl.rentcar.server.service.ServiceOrders;

@RestController
@RequestMapping("api/order")
public class ControllerOrder extends CrudController<ModelOrder, ModelOrder>{

    private ServiceOrders serviceOrders;

    public ControllerOrder(@Autowired ServiceOrders serviceOrders) {
        super(serviceOrders);
        this.serviceOrders = serviceOrders;
    }

}
