package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import pl.rentcar.server.model.CrudModel;
import pl.rentcar.server.entity.EntityCommon;
import pl.rentcar.server.model.ModelTableResponse;
import pl.rentcar.server.repository.RepositoryCommon;

import javax.transaction.Transactional;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.UUID;

public class CrudServiceImplementation<ADD, PROJECTION extends CrudModel, E extends EntityCommon>
        implements CrudService<ADD, PROJECTION> {

    @Autowired
    protected ServiceModel serviceModel;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    protected RepositoryCommon<PROJECTION, E> repositoryCommon;

    @Override
    public ModelTableResponse<PROJECTION> findAll(Pageable pageable) throws Throwable {
        return ModelTableResponse.getFromPage(repositoryCommon.findByArchiveIsNullOrArchiveIsFalse(pageable));
    }

    @Override
    public PROJECTION findById(UUID id) throws Throwable {
        return repositoryCommon.getById(id);
    }

    @Override
    public List<PROJECTION> searchModels(String searchText) throws Throwable {
        return null;
    }

    @Override
    @Transactional
    public PROJECTION addModel(ADD model) throws Throwable {
        Type type = getClass().getGenericSuperclass();
        ParameterizedType parameterizedType = (ParameterizedType) type;
        Class<E> entityType = (Class<E>) parameterizedType.getActualTypeArguments()[2];
        E entityInstance = entityType.newInstance();
        serviceModel.copyFromModel(model, entityInstance);
        repositoryCommon.save(entityInstance);
        return findById(entityInstance.getId());
    }

    @Override
    @Transactional
    public PROJECTION updateModel(PROJECTION model) throws Throwable {
        E entity = repositoryCommon.findById(model.getId()).get();
        serviceModel.copyFromModel(model, entity);
        return findById(entity.getId());
    }

    @Override
    @Transactional
    public void deleteModel(UUID id) throws Throwable {
        repositoryCommon.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteModels(List<UUID> uuids) throws Throwable {
        for(UUID id: uuids) deleteModel(id);
    }
}
