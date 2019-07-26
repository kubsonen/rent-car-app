package pl.rentcar.server.service;

import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityRentOrder;
import pl.rentcar.server.model.ModelOrder;
import pl.rentcar.server.util.AppUtil;

import java.util.Date;

@Service
public class ServiceOrders extends CrudServiceImplementation<ModelOrder, ModelOrder, EntityRentOrder> {

    @Override
    public ModelOrder addModel(ModelOrder model) throws Throwable {
        EntityRentOrder entityRentOrder = new EntityRentOrder();
        serviceModel.copyFromModel(model, entityRentOrder);
        entityRentOrder.setOrderNumber(AppUtil.generateOrderNumber(new Date(), "ORDER"));
        repositoryCommon.save(entityRentOrder);
        return findById(entityRentOrder.getId());
    }
}
