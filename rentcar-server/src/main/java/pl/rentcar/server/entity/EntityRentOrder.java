package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Audited
@Table(name = "rent_order")
public class EntityRentOrder extends EntityCommon {

    private String orderNumber;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "client_id")
    private EntityClient client;

    @OneToMany
    @JoinColumn(name = "order_id")
    private List<EntityOrderService> services;

    private String invoiceNumber;

    private String comments;

    private Date orderDate;

}
