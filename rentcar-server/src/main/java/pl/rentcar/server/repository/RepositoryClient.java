package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityClient;
import pl.rentcar.server.model.ModelClient;

import java.util.List;

public interface RepositoryClient extends RepositoryCommon<ModelClient, EntityClient> {
    List<ModelClient> findTop10ByFullNameContainingIgnoreCase(String fullName);
}
