package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class EntityAuditable<T> {

    @CreatedBy
    @Column(name = "created_by")
    private T createdBy;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    private T lastModifiedBy;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

}
