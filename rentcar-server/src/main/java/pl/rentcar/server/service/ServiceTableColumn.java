package pl.rentcar.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.entity.EntityTableColumn;
import pl.rentcar.server.entity.EntityUser;
import pl.rentcar.server.model.ModelTableColumnConfig;
import pl.rentcar.server.repository.RepositoryTableColumn;

import javax.transaction.Transactional;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceTableColumn {

    @Autowired
    private RepositoryTableColumn repositoryTableColumn;

    @Autowired
    private ServiceUser serviceUser;

    public List<String> getVisibleFieldsForTable(Class<?> modelClass, String tableId) {

        if (tableId == null || tableId.isEmpty())
            return Arrays.asList(null);

        List<String> fields = getTableColumnsForCurrentUser(modelClass, tableId).stream()
                .sorted(Comparator.comparing(EntityTableColumn::getSequence))
                .map(entityTableColumn -> entityTableColumn.getColumnName())
                .collect(Collectors.toList());

        if (!fields.isEmpty()) {
            return fields;
        } else {
            return Arrays.stream(modelClass.getDeclaredFields())
                    .filter(field -> {
                        String name = field.getName();
                        if (name.length() > 2 && name.toLowerCase().contains("id")) {
                            return false;
                        }
                        return true;
                    })
                    .map(field -> field.getName())
                    .collect(Collectors.toList());
        }

    }

    @Transactional(rollbackOn = Throwable.class)
    public void saveTableColumnsConfig(Class<?> modelClass, String tableId, List<ModelTableColumnConfig> tableColumnsConfig) {

        List<EntityTableColumn> tableColumns = getTableColumnsForCurrentUser(modelClass, tableId);
        //Remove existing configuration
        repositoryTableColumn.deleteAll(tableColumns);

        tableColumnsConfig = tableColumnsConfig.stream()
                .filter(modelTableColumnConfig -> modelTableColumnConfig.isVisible())
                .sorted(Comparator.comparing(ModelTableColumnConfig::getIndex))
                .collect(Collectors.toList());

        for (int i = 0; i < tableColumnsConfig.size(); i++)
            tableColumnsConfig.get(i).setIndex(i);

        //Create database objects
        EntityUser loginUser = serviceUser.getLoginUser();
        List<EntityTableColumn> etcs = tableColumnsConfig.stream().map(mtc -> {
            EntityTableColumn tableColumn = new EntityTableColumn();
            tableColumn.setCreatedBy(loginUser);
            tableColumn.setCreatedDate(new Date());
            tableColumn.setTableId(tableId);
            tableColumn.setModelType(modelClass.getTypeName());
            tableColumn.setColumnName(mtc.getField());
            tableColumn.setSequence(mtc.getIndex());
            return tableColumn;
        }).collect(Collectors.toList());

        repositoryTableColumn.saveAll(etcs);

    }

    public List<ModelTableColumnConfig> getTableColumnsConfig(Class<?> modelClass, String tableId) {

        //Fields to show
        List<Field> fields = Arrays.stream(modelClass.getDeclaredFields())
                .filter(field -> {
                    String name = field.getName();
                    if (name.length() > 2 && name.toLowerCase().contains("id")) {
                        return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        List<ModelTableColumnConfig> columnConfigs = fields.stream().map(field -> {
            ModelTableColumnConfig columnConfig = new ModelTableColumnConfig();
            columnConfig.setField(field.getName());
            return columnConfig;
        }).collect(Collectors.toList());

        List<String> visibleFields = getVisibleFieldsForTable(modelClass, tableId);

        columnConfigs.forEach(modelTableColumnConfig -> {
            String fieldName = modelTableColumnConfig.getField();
            if (visibleFields.contains(fieldName)) {
                modelTableColumnConfig.setVisible(true);
                modelTableColumnConfig.setIndex(visibleFields.indexOf(fieldName));
            }
        });

        //Get max visible index
        int i = 0;
        for (ModelTableColumnConfig columnConfig: columnConfigs)
            if (columnConfig.getIndex() != null && columnConfig.getIndex() > i)
                i = columnConfig.getIndex();

        //Add missing indexes to invisible fields
        for (ModelTableColumnConfig columnConfig: columnConfigs)
            if (columnConfig.getIndex() == null)
                columnConfig.setIndex(++i);

        return columnConfigs;

    }

    private List<EntityTableColumn> getTableColumnsForCurrentUser(Class<?> modelClass, String tableId) {
        EntityUser loginUser = serviceUser.getLoginUser();
        List<EntityTableColumn> tableColumns =
                repositoryTableColumn.findByCreatedByAndModelTypeAndTableId(loginUser, modelClass.getTypeName(), tableId);
        return tableColumns;
    }

}
