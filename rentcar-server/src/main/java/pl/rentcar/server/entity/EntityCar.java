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
@Table(name = "car")
public class EntityCar extends EntityCommon {

    private String brand;

    private String model;

    private String type; //Lorry, Bus, Passenger car

    private String fuelType;

    private Integer engineCapacity;

    private String plateNumber;

    private Date productionDate;

    private Date registerDate;

    private String vin;

    @OneToMany
    @JoinColumn(name = "car_id")
    private List<EntityRepair> repairs;

    @ManyToOne
    @JoinColumn(name = "price_list_id")
    private EntityPriceList defaultPriceList;

}
