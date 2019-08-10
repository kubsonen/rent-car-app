package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import pl.rentcar.server.model.EnumServiceType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@Audited
@Table(name = "order_service")
public class EntityOrderService extends EntityCommon {

    @ManyToOne
    @JoinColumn(name = "order_id")
    private EntityRentOrder rentOrder;

    @Enumerated(EnumType.STRING)
    private EnumServiceType type;

    private Date startRent;

    private Date endRent;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private EntityCar car;

    private Double startMileage;

    private Double endMileage;

    private Double fuel;

    private BigDecimal price;

    private String currency;

    @ManyToOne
    @JoinColumn(name = "price_list_id")
    private EntityPriceList priceList;

}
