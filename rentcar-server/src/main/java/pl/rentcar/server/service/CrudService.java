package pl.rentcar.server.service;

import org.springframework.data.domain.Pageable;
import pl.rentcar.server.model.ModelTableResponse;

import java.util.List;
import java.util.UUID;

public interface CrudService<ADD, PROJECTION> {
    ModelTableResponse<PROJECTION> findAll(Pageable pageable) throws Throwable;
    PROJECTION findById(UUID id) throws Throwable;
    List<PROJECTION> searchModels(String searchText) throws Throwable;
    PROJECTION addModel(ADD model) throws Throwable;
    PROJECTION updateModel(PROJECTION model) throws Throwable;
    void deleteModel(UUID id) throws Throwable;
    void deleteModels(List<UUID> id) throws Throwable;
}
