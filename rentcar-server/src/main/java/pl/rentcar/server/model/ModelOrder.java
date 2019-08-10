package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Value
public class ModelOrder implements CrudModel{
    @EntityDisableCopy
    private UUID id;
    @EntityDisableCopy
    private String orderNumber;
    @NotNull
    private UUID clientId;
    @EntityDisableCopy
    private String clientUniqueName;
    private Date orderDate;
    private String comments;
}
