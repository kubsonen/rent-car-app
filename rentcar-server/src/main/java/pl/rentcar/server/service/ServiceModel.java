package pl.rentcar.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rentcar.server.util.ConstantValue;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ServiceModel {

    private static final Logger logger = LoggerFactory.getLogger(ServiceModel.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ServiceBundleProperty serviceBundleProperty;

    private static final String GETTER_PREFIX = "get";
    private static final String SETTER_PREFIX = "set";

    public void copyFromModel(Object model, Object entity) throws InvocationTargetException, IllegalAccessException {

        //Methods from model
        Map<String, Method> modelMethods = new HashMap<>();
        for (Method method : model.getClass().getDeclaredMethods()) modelMethods.put(method.getName(), method);

        //Methods from entity
        Map<String, Method> entityMethods = new HashMap<>();
        for (Method method : entity.getClass().getDeclaredMethods()) entityMethods.put(method.getName(), method);

        //Fields from entity
        Map<String, Field> entityFields = new HashMap<>();
        for (Field field : entity.getClass().getDeclaredFields()) entityFields.put(field.getName(), field);

        ITERATE_EACH_MODEL_FIELD:
        for (Field field : model.getClass().getDeclaredFields()) {

            //Get the fields from objects
            String fieldName = field.getName();

            if (!field.isAnnotationPresent(EntityDisableCopy.class)) {

                //Now we must get entity object class and create an instance
                //Here we set the reference object
                String fieldType = field.getType().getName();
                if (fieldType.equals("java.util.UUID") && fieldName.endsWith("Id") && fieldName.length() > 2) {
                    Method modelGetter = modelMethods.get(GETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
                    fieldName = fieldName.substring(0, fieldName.length() - 2);
                    Method entitySetter = entityMethods.get(SETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
                    Field entityField = entityFields.get(fieldName);
                    UUID uuidModel = (UUID) modelGetter.invoke(model);
                    if (uuidModel != null) {
                        Object dboObject = entityManager.getReference(entityField.getType(), uuidModel);
                        logger.info("Obtain object reference.");
                        entitySetter.invoke(entity, dboObject);
                    } else {
                        Object nullArg = null;
                        entitySetter.invoke(entity, nullArg);
                    }
                } else {

                    //Skip reference entity fields (not id)
                    for (String entityFieldName : entityFields.keySet())
                        if (fieldName.startsWith(entityFieldName) && !fieldName.equals(entityFieldName))
                            continue ITERATE_EACH_MODEL_FIELD;

                    Method modelGetter = modelMethods.get(GETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
                    Object modelFieldValue = modelGetter.invoke(model);

                    if (modelFieldValue != null && field.isAnnotationPresent(ConstantValue.class)) {
                        ConstantValue constantValue = field.getAnnotation(ConstantValue.class);
                        String group = constantValue.group();

                        List<String> constants = serviceBundleProperty.getConstantsValues(group);
                        if (constants == null || constants.isEmpty() || !constants.contains(modelFieldValue))
                            throw new RuntimeException("Constant not found exception.");
                    }

                    Method entitySetter = entityMethods.get(SETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
                    entitySetter.invoke(entity, modelFieldValue);
                }
            }
        }
    }

}
