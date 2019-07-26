package pl.rentcar.server.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rentcar.server.repository.RepositoryAspectLogger;
import pl.rentcar.server.service.ServiceUser;
import pl.rentcar.server.util.HasPrivilege;

@RestController
@RequestMapping("api/dashboard")
public class ControllerDashboard {

    private static final Logger logger = LoggerFactory.getLogger(ControllerDashboard.class);

    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private RepositoryAspectLogger repositoryAspectLogger;

    @PostMapping("/add-data")
    public void addExampleUsersData() {

        serviceUser.deleteAuthorities();
        serviceUser.deletePrivileges();

        //Add authorities
        serviceUser.createAuthority("ADMIN");
        serviceUser.createAuthority("MANAGER");
        serviceUser.createAuthority("USER");

        //Add privileges
        serviceUser.createPrivilege("DO_ACTION");
        serviceUser.createPrivilege("DELETE_ORDER");
        serviceUser.createPrivilege("REFRESH_LIST_ORDER");

        //Authority configuration
        serviceUser.addPrivilegeToAuthority("DO_ACTION", "ADMIN");
        serviceUser.addPrivilegeToAuthority("DELETE_ORDER", "ADMIN");
        serviceUser.addPrivilegeToAuthority("DELETE_ORDER", "MANAGER");
        serviceUser.addPrivilegeToAuthority("REFRESH_LIST_ORDER", "ADMIN");
        serviceUser.addPrivilegeToAuthority("REFRESH_LIST_ORDER", "MANAGER");
        serviceUser.addPrivilegeToAuthority("REFRESH_LIST_ORDER", "USER");

        //Users configuration
        serviceUser.addAuthorityToUser("admin", "ADMIN");
        serviceUser.addAuthorityToUser("manager", "MANAGER");
        serviceUser.addAuthorityToUser("user", "USER");

    }

    @PostMapping("/check-data")
    public void checkData() {
        serviceUser.checkData();
    }

    @PostMapping("/do-action")
    @HasPrivilege("DO_ACTION")
    public void doAction() {
        repositoryAspectLogger.findTop10ByOrderByDateActionDesc().stream().forEach(entityAspectLogger -> {
            logger.info(entityAspectLogger.toString());
        });
    }

}
