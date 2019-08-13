package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@Audited
@Table(name = "refuelling")
public class EntityRefuelling extends EntityCommon {

    private Date refuellingDate;
    private Double mileage;
    private String currency;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private EntityCar refuelCar;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private EntityInvoice invoice;

}
