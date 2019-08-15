package pl.rentcar.server.model;

import lombok.Data;

@Data
public class ModelTableColumnConfig {
    private Integer index;
    private String field;
    private boolean visible;
}
