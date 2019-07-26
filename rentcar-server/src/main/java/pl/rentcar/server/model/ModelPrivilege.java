package pl.rentcar.server.model;

import lombok.*;
import pl.rentcar.server.util.EntityDisableCopy;

import java.util.UUID;

@Value
public class ModelPrivilege implements CrudModel {
    @EntityDisableCopy
    private UUID id;
    private String privilege;
    private String description;
}

