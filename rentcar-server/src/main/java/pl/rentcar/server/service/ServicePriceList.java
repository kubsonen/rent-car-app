package pl.rentcar.server.service;

import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityPriceList;
import pl.rentcar.server.model.ModelPriceList;
import pl.rentcar.server.repository.RepositoryPriceList;

import java.util.List;

@Service
public class ServicePriceList extends CrudServiceImplementation<ModelPriceList, ModelPriceList, EntityPriceList> {

    @Override
    public List<ModelPriceList> searchModels(String searchText) {
        return repositoryPriceList().searchHelper(searchText.split(" "), "findTop10ByNameContainingIgnoreCase");
    }

    private RepositoryPriceList repositoryPriceList() {
        return (RepositoryPriceList) repositoryCommon;
    }

}
