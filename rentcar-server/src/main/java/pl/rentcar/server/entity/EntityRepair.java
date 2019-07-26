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
@Table(name = "repair")
public class EntityRepair extends EntityCommon {

    private Date startRepair;

    private Date endRepair;

    @ManyToOne
    @JoinColumn(name = "mechanic_id")
    private EntityClient mechanic;

    @ManyToMany
    @JoinTable(name = "join_table_repair_invoices",
            joinColumns = @JoinColumn(name = "repair_id"),
            inverseJoinColumns = @JoinColumn(name = "invoice_id"))
    private List<EntityInvoice> invoices;

}
