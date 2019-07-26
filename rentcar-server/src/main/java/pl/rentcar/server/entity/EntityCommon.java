package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@MappedSuperclass
public class EntityCommon extends EntityAuditable<EntityUser>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Version
    protected Long version;

    @Column(name = "archive")
    protected Boolean archive;
}
