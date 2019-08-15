package pl.rentcar.server.component;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import pl.rentcar.server.model.CrudModel;
import pl.rentcar.server.model.ModelCommons;
import pl.rentcar.server.model.ModelTableColumnConfig;
import pl.rentcar.server.model.ModelTableResponse;
import pl.rentcar.server.service.CrudService;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public abstract class CrudController<ADD, M extends CrudModel> {

    private CrudService<ADD, M> crudService;

    public CrudController(CrudService<ADD, M> crudService) {
        this.crudService = crudService;
    }

    @GetMapping
    public ModelTableResponse<M> findAll(@PageableDefault(size = 200) Pageable pageable) throws Throwable {
        return crudService.findAll(pageable);
    }

    @GetMapping("{entityUuid}")
    public M get(@PathVariable UUID entityUuid) throws Throwable {
        return crudService.findById(entityUuid);
    }

    @GetMapping("/search")
    public List<M> searchModels(@RequestParam(name = "search", required = false) String searchText) throws Throwable {
        if(searchText == null) return null;
        return crudService.searchModels(searchText);
    }

    @PostMapping
    public M add(@Valid @RequestBody ADD model) throws Throwable {
        return crudService.addModel(model);
    }

    @PutMapping
    public M update(@Valid @RequestBody M model) throws Throwable {
        return crudService.updateModel(model);
    }

    @DeleteMapping("/{modelId}")
    public void delete(@PathVariable UUID modelId) throws Throwable {
        crudService.deleteModel(modelId);
    }

    @DeleteMapping
    public void delete(@RequestBody ModelCommons modelCommons) throws Throwable {
        crudService.deleteModels(modelCommons.getIds());
    }

    @GetMapping("/tableColumnConfig/{tableId}")
    public List<ModelTableColumnConfig> getTableColumnsConfig(@PathVariable String tableId) {
        return crudService.getTableColumnsConfig(tableId);
    }

    @PostMapping("/tableColumnConfig/{tableId}")
    public void saveTableColumnsConfig(@PathVariable String tableId, @RequestBody ModelTableColumnConfig[] modelTableColumnConfigs) {
        crudService.saveTableColumnsConfig(tableId, Arrays.stream(modelTableColumnConfigs).collect(Collectors.toList()));
    }

    @GetMapping("/tableFields/{tableId}")
    public List<String> getTableFields(@PathVariable String tableId) {
        return crudService.getVisibleFieldsForTable(tableId);
    }
}
