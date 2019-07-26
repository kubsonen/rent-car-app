package pl.rentcar.server.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import pl.rentcar.server.util.ConverterBundleProperties;

import java.util.List;

@Data
@JsonSerialize(using = ConverterBundleProperties.class)
public class ModelBundleProperties {

    private List<ModelProperty> modelProperties;

    public ModelBundleProperties(List<ModelProperty> modelProperties) {
        this.modelProperties = modelProperties;
    }
}

