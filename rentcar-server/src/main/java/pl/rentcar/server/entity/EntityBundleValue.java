package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Audited
@Table(name = "bundle_value")
public class EntityBundleValue extends EntityCommon {

    private String polish;

    private String english;

}
