package pl.rentcar.server.service;

import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityBundleGroup;
import pl.rentcar.server.model.ModelBundleGroup;

import java.util.List;

@Service
public class ServiceBundleGroup extends CrudServiceImplementation<ModelBundleGroup, ModelBundleGroup, EntityBundleGroup> {
    public List<ModelBundleGroup> getAll() {
        return repositoryCommon.findByArchiveIsNullOrArchiveIsFalse();
    }
}
