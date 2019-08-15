package pl.rentcar.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.rentcar.server.entity.EntityTableColumn;
import pl.rentcar.server.entity.EntityUser;

import java.util.List;
import java.util.UUID;

public interface RepositoryTableColumn extends CrudRepository<EntityTableColumn, UUID> {
    List<EntityTableColumn> findByCreatedByAndModelTypeAndTableId(EntityUser createdBy, String modelType, String tableId);
}
