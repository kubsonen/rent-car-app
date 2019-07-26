package pl.rentcar.server.model;

import lombok.Value;

import java.util.UUID;

@Value
public class ModelAuthorityPrivilege {
    private UUID authorityId;
    private UUID privilegeId;
}
