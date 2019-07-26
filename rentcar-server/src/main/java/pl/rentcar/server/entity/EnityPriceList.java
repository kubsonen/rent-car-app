package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Audited
@Table(name = "price_list")
public class EnityPriceList extends EntityCommon {
}
