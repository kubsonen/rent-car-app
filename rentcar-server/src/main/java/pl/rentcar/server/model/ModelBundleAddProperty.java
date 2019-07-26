package pl.rentcar.server.model;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Value
public class ModelBundleAddProperty {
    @NotBlank
    @Size(min = 3, max = 100)
    private String propertyName;
    @NotNull
    private UUID bundleGroupId;
}
