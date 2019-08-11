package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityPriceList;
import pl.rentcar.server.model.ModelPriceList;

import java.util.List;

public interface RepositoryPriceList extends RepositoryCommon<ModelPriceList, EntityPriceList>{
    List<ModelPriceList> findTop10ByNameContainingIgnoreCase(String name);
}
