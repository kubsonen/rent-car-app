package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Audited
@Table(name = "privilege")
public class EntityPrivilege extends EntityCommon {

    private String privilege;

    private String description;

    public EntityPrivilege() {
    }

    public EntityPrivilege(String privilege) {
        this.privilege = privilege;
    }
}
