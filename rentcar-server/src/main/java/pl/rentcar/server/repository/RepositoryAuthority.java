package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityAuthority;
import pl.rentcar.server.model.ModelAuthority;

public interface RepositoryAuthority extends RepositoryCommon<ModelAuthority, EntityAuthority> {
    EntityAuthority findByAuthority(String authority);
}
