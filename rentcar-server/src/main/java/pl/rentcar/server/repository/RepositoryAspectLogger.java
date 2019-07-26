package pl.rentcar.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.rentcar.server.entity.EntityAspectLogger;

import java.util.List;
import java.util.UUID;

public interface RepositoryAspectLogger extends CrudRepository<EntityAspectLogger, UUID> {
    List<EntityAspectLogger> findTop10ByOrderByDateActionDesc();
}
