package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Value
public class ModelRefuelling implements CrudModel {
    @EntityDisableCopy
    private UUID id;
    @NotNull
    private UUID refuelCarId;
    private Date refuellingDate;
    private Double mileage;
    private String currency;
    private BigDecimal price;

}
