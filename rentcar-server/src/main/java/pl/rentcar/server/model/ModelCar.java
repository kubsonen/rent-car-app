package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.ConstantValue;
import pl.rentcar.server.util.EntityDisableCopy;

import java.util.Date;
import java.util.UUID;

@Value
public class ModelCar implements CrudModel {
    @EntityDisableCopy
    private UUID id;
    private UUID defaultPriceListId;
    @ConstantValue(group = "Brands")
    private String brand;
    private String model;
    private String type;
    private String fuelType;
    private Integer engineCapacity;
    private String plateNumber;
    private Date productionDate;
    private Date registerDate;
    private String vin;
}
