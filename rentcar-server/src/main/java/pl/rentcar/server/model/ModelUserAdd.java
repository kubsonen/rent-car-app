package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import java.util.UUID;

@Value
public class ModelUserAdd implements CrudModel {
    @EntityDisableCopy
    private UUID id;
    private String username;
    private String password;
}
