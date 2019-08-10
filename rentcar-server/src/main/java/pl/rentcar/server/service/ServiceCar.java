package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityCar;
import pl.rentcar.server.model.ModelCar;
import pl.rentcar.server.repository.RepositoryCars;

import java.util.List;

@Service
public class ServiceCar extends CrudServiceImplementation<ModelCar, ModelCar, EntityCar> {

    @Autowired
    private RepositoryCars repositoryCars;

    @Override
    public List<ModelCar> searchModels(String searchText) {
        return repositoryCars.searchHelper(searchText.split(" "),
                "findTop10ByBrandContainingIgnoreCaseOrPlateNumberContainingIgnoreCaseOrModelContainingIgnoreCase");
    }

}
