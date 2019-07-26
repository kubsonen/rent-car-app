package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Audited
@Table(name = "refuelling")
public class EntityRefuelling extends EntityCommon {

    private String refuellingDate;

    private Double mileage;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private EntityInvoice invoice;

}
