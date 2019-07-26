package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityAuthority;
import pl.rentcar.server.entity.EntityPrivilege;
import pl.rentcar.server.model.ModelPrivilege;

import java.util.List;

public interface RepositoryPrivilege extends RepositoryCommon<ModelPrivilege, EntityPrivilege> {
    EntityPrivilege findByPrivilege(String privilege);
}
