package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Value
public class ModelBundleGroup implements CrudModel{
    @EntityDisableCopy
    private UUID id;
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;
}
