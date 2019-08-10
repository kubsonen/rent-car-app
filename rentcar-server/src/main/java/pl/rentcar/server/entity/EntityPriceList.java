package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Entity
@Audited
@Table(name = "price_list")
public class EntityPriceList extends EntityCommon {

    private String priceListName;
    private String priceListDescription;

    @OneToMany
    @JoinColumn(name = "price_list_id")
    private Set<EntityCar> carsImplementedPriceList;

    private BigDecimal pricePerHour;
    private BigDecimal pricePerDay;
    private BigDecimal pricePerWeek;
    private BigDecimal pricePerMonth;



}
