package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelBundleAddProperty;
import pl.rentcar.server.model.ModelBundleProperties;
import pl.rentcar.server.model.ModelBundleProperty;
import pl.rentcar.server.service.ServiceBundleProperty;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/bundleProperty")
public class ControllerBundleProperty extends CrudController<ModelBundleAddProperty, ModelBundleProperty> {

    private ServiceBundleProperty serviceBundleProperty;

    public ControllerBundleProperty(@Autowired ServiceBundleProperty serviceBundleProperty) {
        super(serviceBundleProperty);
        this.serviceBundleProperty = serviceBundleProperty;
    }

    @GetMapping("/propertiesForGroup/{groupUuid}")
    public List<ModelBundleProperty> getForAuthority(@PathVariable UUID groupUuid) throws Throwable {
        return serviceBundleProperty.findPropertiesByGroup(groupUuid);
    }

    @GetMapping("/translate/{language}")
    public ModelBundleProperties getLanguageProperties(@PathVariable String language) {
        switch (language) {
            case "pl":
                return serviceBundleProperty.getTranslatePl();
            case "en":
                return serviceBundleProperty.getTranslateEn();
            default:
                return serviceBundleProperty.getTranslateEn();
        }
    }

    @GetMapping("/constants/{groupName}")
    public List<String> getConstantValues(@PathVariable String groupName) {
        return serviceBundleProperty.getConstantsValues(groupName);
    }

}
