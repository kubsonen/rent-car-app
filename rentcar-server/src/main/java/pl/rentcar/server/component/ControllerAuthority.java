package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.rentcar.server.model.ModelAuthority;
import pl.rentcar.server.model.ModelAuthorityPrivilege;
import pl.rentcar.server.service.ServiceAuthority;

import java.util.List;

@RestController
@RequestMapping("api/authority")
public class ControllerAuthority extends CrudController<ModelAuthority, ModelAuthority> {

    private ServiceAuthority serviceAuthority;

    public ControllerAuthority(@Autowired ServiceAuthority serviceAuthority) {
        super(serviceAuthority);
        this.serviceAuthority = serviceAuthority;
    }

    @GetMapping("/getAll")
    public List<ModelAuthority> getAll() {
        return serviceAuthority.getAll();
    }

    @PostMapping("/performPrivilege")
    public void performPrivilege(@RequestBody ModelAuthorityPrivilege mar) {
        serviceAuthority.performPrivilege(mar);
    }

}
