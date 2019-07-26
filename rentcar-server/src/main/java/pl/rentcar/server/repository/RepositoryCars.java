package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityCar;
import pl.rentcar.server.model.ModelCar;

import java.util.List;

public interface RepositoryCars extends RepositoryCommon<ModelCar, EntityCar> {
    List<ModelCar> findByPlateNumberContainingIgnoreCase(String plateNumber);
}
