package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "table_column")
public class EntityTableColumn extends EntityCommon {
    private String modelType;
    private String tableId;
    private Integer sequence;
    private String columnName;
}
