package pl.rentcar.server.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityAuthority;
import pl.rentcar.server.entity.EntityPrivilege;
import pl.rentcar.server.model.ModelCommon;
import pl.rentcar.server.model.ModelPrivilege;
import pl.rentcar.server.repository.RepositoryAuthority;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ServicePrivileges extends CrudServiceImplementation<ModelPrivilege, ModelPrivilege, EntityPrivilege> {

    @Autowired
    private RepositoryAuthority repositoryAuthority;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public List<ModelCommon> getPrivilegesForAuthority(UUID authorityId) {
        EntityAuthority entityAuthority = repositoryAuthority.findById(authorityId).get();
        List<ModelCommon> modelPrivileges = new ArrayList<>();
        entityAuthority.getPrivileges().stream().forEach(entityPrivilege -> modelPrivileges.add(modelMapper.map(entityPrivilege, ModelCommon.class)));
        return modelPrivileges;
    }

    public List<ModelPrivilege> getAll() {
        return repositoryCommon.findByArchiveIsNullOrArchiveIsFalse();
    }

}
