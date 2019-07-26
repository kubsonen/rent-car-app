package pl.rentcar.server.model;

import lombok.Value;

import java.util.UUID;

@Value
public class ModelPriceList implements CrudModel{
    private UUID id;
}
