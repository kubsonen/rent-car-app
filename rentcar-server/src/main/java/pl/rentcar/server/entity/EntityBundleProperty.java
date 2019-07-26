package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Audited
@Table(name = "bundle_property")
public class EntityBundleProperty extends EntityCommon {

    private String propertyName;

    @ManyToOne
    @JoinColumn(name = "bundle_group_id")
    private EntityBundleGroup bundleGroup;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bundle_value_id")
    private EntityBundleValue bundleValue;

}
