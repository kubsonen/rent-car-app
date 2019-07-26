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
    @NotBlank
    private String email;
    @NotBlank
    private String nip;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String address;
    @NotBlank
    private String country;
    @NotBlank
    private String postalCode;
    private String language;
}
