package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelPriceList;
import pl.rentcar.server.service.ServicePriceList;

@RestController
@RequestMapping("api/priceList")
public class ControllerPriceList extends CrudController<ModelPriceList, ModelPriceList>{

    private ServicePriceList servicePriceList;

    public ControllerPriceList(@Autowired ServicePriceList servicePriceList) {
        super(servicePriceList);
        this.servicePriceList = servicePriceList;
    }
}
