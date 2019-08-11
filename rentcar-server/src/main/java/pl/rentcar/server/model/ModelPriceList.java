package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import java.math.BigDecimal;
import java.util.UUID;

@Value
public class ModelPriceList implements CrudModel {
    @EntityDisableCopy
    private UUID id;
    private String name;
    private String description;
    private String currency;
    private BigDecimal pricePerHour;
    private BigDecimal pricePerDay;
    private BigDecimal pricePerWeek;
    private BigDecimal pricePerMonth;
}
