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
@Table(name = "invoice")
public class EntityInvoice extends EntityCommon {

    private String invoiceNumber;

    private Date invoiceDate;

    @ManyToOne
    @JoinColumn(name = "client")
    private EntityClient client; //Issuing

    private String comments;

    private BigDecimal price;

    private String currency;

}
