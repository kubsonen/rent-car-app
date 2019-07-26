package pl.rentcar.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pl.rentcar.server.util.EntityDisableCopy;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ServiceModel {

    private static final Logger logger = LoggerFactory.getLogger(ServiceModel.class);

    @PersistenceContext
    private EntityManager entityManager;

    private static final String GETTER_PREFIX = "get";
    private static final String SETTER_PREFIX = "set";

    public void copyFromModel(Object model, Object entity) throws InvocationTargetException, IllegalAccessException, InstantiationException {

        //Methods from model
        Map<String, Method> modelMethods = new HashMap<>();
        for (Method method : model.getClass().getDeclaredMethods()) modelMethods.put(method.getName(), method);

        //Methods from entity
        Map<String, Method> entityMethods = new HashMap<>();
        for (Method method : entity.getClass().getDeclaredMethods()) entityMethods.put(method.getName(), method);

        //Fields from entity
        Map<String, Field> entityFields = new HashMap<>();
        for (Field field : entity.getClass().getDeclaredFields()) entityFields.put(field.getName(), field);

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

                    //Process while field is an OneToOne relation
                    //Check in entity exists field name which is a start string in model field name
                    boolean existsModelFieldNameStartsWithEntityFieldName = false;
                    String foundedEntityFieldName = null;

                    ENTITY_FIELD_NAME_ITERATE:
                    for (String entityFieldName : entityFields.keySet()) {
                        if (fieldName.startsWith(entityFieldName) && !fieldName.equals(entityFieldName)) {
                            existsModelFieldNameStartsWithEntityFieldName = true;
                            foundedEntityFieldName = entityFieldName;
                            break ENTITY_FIELD_NAME_ITERATE;
                        }
                    }

                    Method modelGetter = modelMethods.get(GETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));

                    //Set values for reference object in entity
                    if (existsModelFieldNameStartsWithEntityFieldName) {

                        //Get the entity field (object / reference model)
                        Method entityGetter = entityMethods.get(GETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + foundedEntityFieldName.substring(1));
                        Object referenceEntity = entityGetter.invoke(entity);

                        if (referenceEntity == null) {

                            //Get entity field to create a new instance
                            Class<?> entityReferenceModelType = entityFields.get(foundedEntityFieldName).getType();
                            Object newModelEntityInstance = entityReferenceModelType.newInstance();


                            Method entitySetter = entityMethods.
                                    get(SETTER_PREFIX + foundedEntityFieldName.substring(0, 1).toUpperCase() + foundedEntityFieldName.substring(1));
                            entitySetter.invoke(entity, newModelEntityInstance);
                            referenceEntity = entityGetter.invoke(entity);

                        }

                        //Get reference entity methods
                        Map<String, Method> referenceEntityMethods = new HashMap<>();
                        for (Method method : referenceEntity.getClass().getDeclaredMethods()) referenceEntityMethods.put(method.getName(), method);

                        //Set model value to the entity reference model
                        //The rest of the model field name
                        String referenceEntityFieldName = fieldName.substring(foundedEntityFieldName.length());
                        Method referenceEntitySetter =
                                referenceEntityMethods.get(SETTER_PREFIX + referenceEntityFieldName.substring(0, 1).toUpperCase() + referenceEntityFieldName.substring(1));
                        referenceEntitySetter.invoke(referenceEntity, modelGetter.invoke(model));

                    } else {

                        Method entitySetter = entityMethods.get(SETTER_PREFIX + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
                        entitySetter.invoke(entity, modelGetter.invoke(model));

                    }
                }
            }
        }
    }

}
