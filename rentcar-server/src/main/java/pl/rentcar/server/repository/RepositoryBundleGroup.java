package pl.rentcar.server.repository;

import pl.rentcar.server.entity.EntityBundleGroup;
import pl.rentcar.server.model.ModelBundleGroup;

public interface RepositoryBundleGroup extends RepositoryCommon<ModelBundleGroup, EntityBundleGroup> {
    EntityBundleGroup findByName(String name);
}
