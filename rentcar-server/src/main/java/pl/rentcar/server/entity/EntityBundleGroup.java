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
@Table(name = "bundle_group")
public class EntityBundleGroup extends EntityCommon  {

    @Column(unique = true)
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "bundle_group_id")
    private Set<EntityBundleProperty> properties;

}
