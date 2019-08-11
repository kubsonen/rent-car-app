package pl.rentcar.server.model;

import lombok.Value;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Value
public class ModelClient implements CrudModel{
    @EntityDisableCopy
    private UUID id;
    @NotBlank
    private String uniqueName;
    @NotBlank
    private String fullName;
    @Email
    private String email;
    private String nip;
    private String phoneNumber;
    private String address;
    private String country;
    private String postalCode;
    private String language;
}
