package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityOrderService;
import pl.rentcar.server.entity.EntityRentOrder;
import pl.rentcar.server.model.ModelOrderService;

import java.util.List;

public interface RepositoryOrderService extends RepositoryCommon<ModelOrderService, EntityOrderService> {
    List<ModelOrderService> getByRentOrder(EntityRentOrder entityRentOrder);
}
