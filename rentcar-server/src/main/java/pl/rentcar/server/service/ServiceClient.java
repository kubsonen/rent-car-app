package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityClient;
import pl.rentcar.server.model.ModelClient;
import pl.rentcar.server.repository.RepositoryClient;

import java.util.List;

@Service
public class ServiceClient extends CrudServiceImplementation<ModelClient, ModelClient, EntityClient> {

    @Autowired
    private RepositoryClient repositoryClient;

    @Override
    public List<ModelClient> searchModels(String searchText) throws Throwable {
        return repositoryClient.findTop10ByFullNameContainingIgnoreCase(searchText);
    }
}
