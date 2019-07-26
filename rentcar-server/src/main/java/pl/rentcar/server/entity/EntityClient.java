package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Audited
@Table(name = "client")
public class EntityClient extends EntityCommon{

    @Column(name = "unique_name", unique = true)
    private String uniqueName;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "nip")
    private String nip;

    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "language")
    private String language;

    @Column(name = "country")
    private String country;

    @Column(name = "postal_code")
    private String postalCode;

    @Override
    public String toString() {
        return "EntityClient{" +
                "id='" + getId() + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", nip='" + nip + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", country='" + country + '\'' +
                ", postalCode='" + postalCode + '\'' +
                '}';
    }
}
