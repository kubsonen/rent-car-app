package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityOrderService;
import pl.rentcar.server.entity.EntityRentOrder;
import pl.rentcar.server.model.ModelOrderService;
import pl.rentcar.server.repository.RepositoryOrderService;
import pl.rentcar.server.repository.RepositoryOrders;

import java.util.List;
import java.util.UUID;

@Service
public class ServiceOrderService extends CrudServiceImplementation<ModelOrderService, ModelOrderService, EntityOrderService> {

    @Autowired
    private RepositoryOrders repositoryOrders;

    //Get repository
    private RepositoryOrderService repositoryOrderService() {
        return (RepositoryOrderService) repositoryCommon;
    }

    public List<ModelOrderService> getServiceForOrder(UUID orderId) throws Throwable {
        EntityRentOrder entityRentOrder = repositoryOrders.findById(orderId).get();
        return repositoryOrderService().getByRentOrder(entityRentOrder);
    }

}
