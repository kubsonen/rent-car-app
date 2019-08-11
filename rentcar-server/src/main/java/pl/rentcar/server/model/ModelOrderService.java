package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Value
public class ModelOrderService implements CrudModel{
    @EntityDisableCopy
    private UUID id;
    @NotNull
    private UUID rentOrderId;
    private UUID carId;
    private UUID priceListId;
    @NotNull
    private Date startRent;
    @NotNull
    private Date endRent;
    private Double startMileage;
    private Double endMileage;
    private Double fuel;
    private BigDecimal price;
    private String currency;
}
