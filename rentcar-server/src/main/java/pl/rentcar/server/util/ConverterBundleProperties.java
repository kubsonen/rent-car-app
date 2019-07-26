package pl.rentcar.server.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import pl.rentcar.server.model.ModelBundleProperties;
import pl.rentcar.server.model.ModelProperty;

import java.io.IOException;

public class ConverterBundleProperties extends StdSerializer<ModelBundleProperties> {

    protected ConverterBundleProperties() {
        super(ModelBundleProperties.class);
    }

    @Override
    public void serialize(ModelBundleProperties modelBundleProperties, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        for(ModelProperty property: modelBundleProperties.getModelProperties()) {
            jsonGenerator.writeStringField(property.getName(), property.getValue());
        }
        jsonGenerator.writeEndObject();
    }
}
