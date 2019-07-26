package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Audited
@Table(name = "authority")
public class EntityAuthority extends EntityCommon implements GrantedAuthority {

    private String authority;

    public EntityAuthority() {
    }

    @ManyToMany
    @JoinTable(name = "authority_privilege",
    joinColumns = {@JoinColumn(name = "authority_id")},
    inverseJoinColumns = {@JoinColumn(name = "privilege_id")})
    private Set<EntityPrivilege> privileges;

    @Override
    public String getAuthority() {
        return authority;
    }

    public void addPrivilege(EntityPrivilege entityPrivilege) {
        if(privileges == null) privileges = new HashSet<>();
        privileges.add(entityPrivilege);
    }

}
