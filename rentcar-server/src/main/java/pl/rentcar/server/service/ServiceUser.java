package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityAuthority;
import pl.rentcar.server.entity.EntityPrivilege;
import pl.rentcar.server.entity.EntityUser;
import pl.rentcar.server.model.ModelUser;
import pl.rentcar.server.model.ModelUserAdd;
import pl.rentcar.server.repository.RepositoryAuthority;
import pl.rentcar.server.repository.RepositoryPrivilege;
import pl.rentcar.server.repository.RepositoryUsers;

import javax.transaction.Transactional;
import java.util.Set;

@Service
public class ServiceUser extends CrudServiceImplementation<ModelUserAdd, ModelUser, EntityUser> implements UserDetailsService {

    @Autowired
    private RepositoryAuthority repositoryAuthority;

    @Autowired
    private RepositoryPrivilege repositoryPrivilege;

    @Autowired
    private RepositoryUsers repositoryUsers;

    @Autowired
    private ServiceModel serviceModel;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ModelUser addModel(ModelUserAdd model) throws Throwable {
        System.out.println(model.toString());
        ModelUserAdd modelUserAdd =
                new ModelUserAdd(null, model.getUsername(), passwordEncoder.encode(model.getPassword()));
        return super.addModel(modelUserAdd);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EntityUser entityUser = repositoryUsers.findByUsername(username);
        if (entityUser == null) throw new UsernameNotFoundException("User with that name not found.");
        EntityAuthority entityAuthority = entityUser.getEntityAuthority();
        if (entityAuthority != null)
            entityAuthority.getPrivileges().size(); //Initialize privileges
        return entityUser;
    }

    @Transactional
    public void createAuthority(String authority) {
        EntityAuthority entityAuthority = new EntityAuthority();
        entityAuthority.setAuthority(authority);
        repositoryAuthority.save(entityAuthority);
    }

    @Transactional
    public void createPrivilege(String privilege) {
        EntityPrivilege entityPrivilege = new EntityPrivilege();
        entityPrivilege.setPrivilege(privilege);
        repositoryPrivilege.save(entityPrivilege);
    }

    @Transactional
    public void addPrivilegeToAuthority(String privilege, String authority) {
        EntityAuthority entityAuthority = repositoryAuthority.findByAuthority(authority);
        EntityPrivilege entityPrivilege = repositoryPrivilege.findByPrivilege(privilege);
        entityAuthority.addPrivilege(entityPrivilege);
    }

    @Transactional
    public void addAuthorityToUser(String username, String authority) {
        EntityUser entityUser = repositoryUsers.findByUsername(username);
        entityUser.setEntityAuthority(repositoryAuthority.findByAuthority(authority));
    }

    @Transactional
    public void deleteAuthorities() {
        repositoryAuthority.deleteAll();
    }

    @Transactional
    public void deletePrivileges() {
        repositoryPrivilege.deleteAll();
    }

    @Transactional
    public void checkData() {
        repositoryUsers.findAll().forEach(entityUser -> {
            System.out.println("Found user: " + entityUser.getPassword());
            EntityAuthority entityAuthority = entityUser.getEntityAuthority();
            System.out.println("With authority: " + entityAuthority.getAuthority());
            Set<EntityPrivilege> entityPrivileges = entityAuthority.getPrivileges();
            entityPrivileges.size();
            for (EntityPrivilege entityPrivilege : entityPrivileges)
                System.out.println("Authority " + entityAuthority.getAuthority() + " has got " + entityPrivilege.getPrivilege());
        });
    }

    public EntityUser getLoginUser() {
        Object o = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (o instanceof EntityUser) return (EntityUser) o;
        return null;
    }

    public boolean loginUserHasPrivilege(String privilege) {
        Set<EntityPrivilege> entityPrivileges = getLoginUser().getEntityAuthority().getPrivileges();
        for (EntityPrivilege entityPrivilege : entityPrivileges) {
            if (entityPrivilege.getPrivilege().equals(privilege)) return true;
        }
        return false;
    }

}
