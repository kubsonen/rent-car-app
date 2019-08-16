package pl.rentcar.server.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "rent_user")
public class EntityUser extends EntityCommon implements UserDetails {

    private String username;

    private String password;

    public EntityUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @ManyToOne
    @JoinColumn(name = "authority_id")
    private EntityAuthority entityAuthority;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (entityAuthority == null) return new ArrayList<>();
        return Arrays.asList(entityAuthority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
