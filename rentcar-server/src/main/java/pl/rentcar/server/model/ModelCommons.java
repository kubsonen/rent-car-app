package pl.rentcar.server.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ModelCommons {
    List<UUID> ids;
}
