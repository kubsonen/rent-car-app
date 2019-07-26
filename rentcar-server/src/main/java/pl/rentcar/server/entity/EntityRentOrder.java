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

    @Column(name = "order_number")
    private String orderNumber;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "client_id")
    private EntityClient client;

    @OneToMany
    @JoinColumn(name = "order_id")
    private List<EntityOrderService> services;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "comments")
    private String comments;

    @Column(name = "order_date")
    private Date orderDate;

    @Override
    public String toString() {
        return "EntityRentOrder{" +
                "orderNumber='" + orderNumber + '\'' +
                ", client=" + client +
                ", services=" + services +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", comments='" + comments + '\'' +
                '}';
    }
}
