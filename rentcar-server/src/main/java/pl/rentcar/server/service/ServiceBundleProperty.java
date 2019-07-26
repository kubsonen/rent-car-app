package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityBundleGroup;
import pl.rentcar.server.entity.EntityBundleProperty;
import pl.rentcar.server.model.ModelBundleAddProperty;
import pl.rentcar.server.model.ModelBundleProperties;
import pl.rentcar.server.model.ModelBundleProperty;
import pl.rentcar.server.model.ModelProperty;
import pl.rentcar.server.repository.RepositoryBundleGroup;
import pl.rentcar.server.repository.RepositoryBundleProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceBundleProperty extends CrudServiceImplementation<ModelBundleAddProperty, ModelBundleProperty, EntityBundleProperty> {

    @Autowired
    private RepositoryBundleGroup repositoryBundleGroup;

    @Autowired
    private RepositoryBundleProperty repositoryBundleProperty;

    private RepositoryBundleProperty getRepositoryBundleProperty() {
        return (RepositoryBundleProperty) repositoryCommon;
    }

    public List<ModelBundleProperty> findPropertiesByGroup(UUID groupId) {
        EntityBundleGroup bundleGroup = repositoryBundleGroup.findById(groupId).get();
        return getRepositoryBundleProperty().findAllByBundleGroup(bundleGroup);
    }

    public ModelBundleProperties getTranslatePl() {
        return new ModelBundleProperties(getRepositoryBundleProperty().getBundlePropertiesPl());
    }

    public ModelBundleProperties getTranslateEn() {
        return new ModelBundleProperties(getRepositoryBundleProperty().getBundlePropertiesEn());
    }

    public List<String> getConstantsValues(String groupName) {
        EntityBundleGroup bundleGroup = repositoryBundleGroup.findByName(groupName);
        if (bundleGroup == null) return new ArrayList<>();
        return repositoryBundleProperty.getPropertyNamesForGroup(bundleGroup);
    }

}
