package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Value
public class ModelBundleProperty implements CrudModel{
    @EntityDisableCopy
    private UUID id;
    @EntityDisableCopy
    private String propertyName;
    @NotBlank
    @Size(min = 3, max = 100)
    private String bundleValuePolish;
    @NotBlank
    @Size(min = 3, max = 100)
    private String bundleValueEnglish;
}
