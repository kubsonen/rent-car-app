package pl.rentcar.server.model;

import lombok.Value;

import java.util.UUID;

@Value
public class ModelRefuelling implements CrudModel{
    private UUID id;
}
