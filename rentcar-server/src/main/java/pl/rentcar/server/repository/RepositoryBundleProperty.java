package pl.rentcar.server.repository;

import org.springframework.data.jpa.repository.Query;
import pl.rentcar.server.entity.EntityBundleGroup;
import pl.rentcar.server.entity.EntityBundleProperty;
import pl.rentcar.server.model.ModelBundleProperty;
import pl.rentcar.server.model.ModelProperty;

import java.util.List;

public interface RepositoryBundleProperty extends RepositoryCommon<ModelBundleProperty, EntityBundleProperty>{
    @Query("select new pl.rentcar.server.model.ModelProperty(p.propertyName, v.polish) from EntityBundleProperty p inner join p.bundleValue v")
    List<ModelProperty> getBundlePropertiesPl();
    @Query("select new pl.rentcar.server.model.ModelProperty(p.propertyName, v.english) from EntityBundleProperty p inner join p.bundleValue v")
    List<ModelProperty> getBundlePropertiesEn();
    List<ModelBundleProperty> findAllByBundleGroup(EntityBundleGroup entityBundleGroup);
    @Query("select p.propertyName from EntityBundleProperty p where p.bundleGroup = :entityBundleGroup")
    List<String> getPropertyNamesForGroup(EntityBundleGroup entityBundleGroup);
}
