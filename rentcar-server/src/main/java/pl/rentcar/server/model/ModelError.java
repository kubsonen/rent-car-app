package pl.rentcar.server.model;

import lombok.Value;

import java.util.Date;

@Value
public class ModelError {
    private Date occurrenceDate;
    private String message;
    private String details;
}
