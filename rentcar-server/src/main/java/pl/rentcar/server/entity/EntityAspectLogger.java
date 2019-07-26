package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "aspect_logger")
public class EntityAspectLogger extends EntityCommon {

    private String action;

    private Date dateAction;

    private String targetMethod;

    private String targetClass;

    private String name;

    public EntityAspectLogger(String action, String targetMethod, String targetClass) {
        this.action = action;
        this.dateAction = new Date();
        this.targetMethod = targetMethod;
        this.targetClass = targetClass;
    }

    @Override
    public String toString() {
        return "EntityAspectLogger{" +
                "action='" + action + '\'' +
                ", dateAction=" + dateAction +
                ", targetMethod='" + targetMethod + '\'' +
                ", targetClass='" + targetClass + '\'' +
                '}';
    }
}
