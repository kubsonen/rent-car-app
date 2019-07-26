package pl.rentcar.server.model;

import lombok.Value;

import java.util.UUID;

@Value
public class ModelRepair implements CrudModel{
    private UUID id;
}
