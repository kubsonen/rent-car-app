package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityAuthority;
import pl.rentcar.server.entity.EntityPrivilege;
import pl.rentcar.server.model.ModelAuthority;
import pl.rentcar.server.model.ModelAuthorityPrivilege;
import pl.rentcar.server.repository.RepositoryPrivilege;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ServiceAuthority extends CrudServiceImplementation<ModelAuthority, ModelAuthority, EntityAuthority> {

    @Autowired
    private RepositoryPrivilege repositoryPrivilege;

    public List<ModelAuthority> getAll() {
        return repositoryCommon.findByArchiveIsNullOrArchiveIsFalse();
    }

    @Transactional
    public void performPrivilege(ModelAuthorityPrivilege mar) {
        EntityAuthority entityAuthority = repositoryCommon.findById(mar.getAuthorityId()).get();
        EntityPrivilege entityPrivilege = repositoryPrivilege.findById(mar.getPrivilegeId()).get();

        boolean exists = false;
        EntityPrivilege toRemove = null;

        for (EntityPrivilege ep : entityAuthority.getPrivileges()) {
            if (ep.getId().equals(entityPrivilege.getId())) {
                exists = true;
                toRemove = ep;
                break;
            }
        }

        if (exists) {
            entityAuthority.getPrivileges().remove(toRemove);
        } else {
            entityAuthority.getPrivileges().add(entityPrivilege);
        }

    }
}
