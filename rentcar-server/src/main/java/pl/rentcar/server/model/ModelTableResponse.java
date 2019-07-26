package pl.rentcar.server.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.stream.Stream;

@Getter @Setter
public class ModelTableResponse<T> {
    private int actualPage;
    private int countOfPage;
    private Date downloadDate;
    private Stream<T> data;

    public static ModelTableResponse getFromPage(Page page){
        ModelTableResponse<?> modelTableResponse = new ModelTableResponse<>();
        modelTableResponse.countOfPage = page.getTotalPages();
        modelTableResponse.actualPage = page.getNumber();
        modelTableResponse.data = page.get();
        return modelTableResponse;
    }

}
