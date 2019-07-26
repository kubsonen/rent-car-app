package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityUser;
import pl.rentcar.server.model.ModelUser;

public interface RepositoryUsers extends RepositoryCommon<ModelUser, EntityUser> {
    EntityUser findByUsername(String username);
}
