package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelBundleGroup;
import pl.rentcar.server.service.ServiceBundleGroup;

import java.util.List;

@RestController
@RequestMapping("api/bundleGroup")
public class ControllerBundleGroup extends CrudController<ModelBundleGroup, ModelBundleGroup> {

    private ServiceBundleGroup serviceBundleGroup;

    public ControllerBundleGroup(@Autowired ServiceBundleGroup serviceBundleGroup) {
        super(serviceBundleGroup);
        this.serviceBundleGroup = serviceBundleGroup;
    }

    @GetMapping("/getAll")
    public List<ModelBundleGroup> getAll() {
        return serviceBundleGroup.getAll();
    }

}
