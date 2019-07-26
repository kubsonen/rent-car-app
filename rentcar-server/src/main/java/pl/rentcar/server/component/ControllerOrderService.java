package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelOrderService;
import pl.rentcar.server.service.ServiceOrderService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/orderService")
public class ControllerOrderService extends CrudController<ModelOrderService, ModelOrderService>{

    private ServiceOrderService serviceOrderService;

    public ControllerOrderService(@Autowired ServiceOrderService serviceOrderService) {
        super(serviceOrderService);
        this.serviceOrderService = serviceOrderService;
    }

    @GetMapping("/servicesForOrder/{orderUuid}")
    public List<ModelOrderService> getForOrder(@PathVariable UUID orderUuid) throws Throwable {
        return serviceOrderService.getServiceForOrder(orderUuid);
    }

}
