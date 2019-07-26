package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.model.ModelCommon;
import pl.rentcar.server.model.ModelPrivilege;
import pl.rentcar.server.service.ServicePrivileges;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/privilege")
public class ControllerPrivilege extends CrudController<ModelPrivilege, ModelPrivilege> {

    private ServicePrivileges servicePrivileges;

    public ControllerPrivilege(@Autowired ServicePrivileges servicePrivileges) {
        super(servicePrivileges);
        this.servicePrivileges = servicePrivileges;
    }

    @GetMapping("/getAll")
    public List<ModelPrivilege> getAll() throws Throwable {
        return servicePrivileges.getAll();
    }

    @GetMapping("/privilegeForAuthority/{authorityUuid}")
    public List<ModelCommon> getForAuthority(@PathVariable UUID authorityUuid) throws Throwable {
        return servicePrivileges.getPrivilegesForAuthority(authorityUuid);
    }

}
