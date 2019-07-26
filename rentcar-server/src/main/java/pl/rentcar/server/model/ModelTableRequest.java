package pl.rentcar.server.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.stream.Stream;

@Getter @Setter
public class ModelTableRequest {
    private int page;
    private int rowsOnPage;
}
