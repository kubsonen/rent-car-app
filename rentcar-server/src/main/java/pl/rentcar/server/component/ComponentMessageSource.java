package pl.rentcar.server.component;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.stereotype.Component;
import pl.rentcar.server.model.ModelProperty;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
@Qualifier(value = "messageSource")
public class ComponentMessageSource extends ReloadableResourceBundleMessageSource {

    private Locale locale;
    private Map<String, String> propertiesMap;

    @PostConstruct
    private void init(){
        setBasename("classpath:values");
        setDefaultEncoding("UTF-8");
        setCacheSeconds(60);
    }

    private void getAllProperties(Locale locale){
        if(this.locale == null || !locale.equals(this.locale)){
            this.locale = locale;
            propertiesMap = new HashMap<>();
            clearCacheIncludingAncestors();
            PropertiesHolder propertiesHolder = getMergedProperties(this.locale);
            Properties properties = propertiesHolder.getProperties();
            for(String name: properties.stringPropertyNames()) propertiesMap.put(name, properties.getProperty(name));
        }
    }

    public List<ModelProperty> getPropertiesStartsWith(Locale locale, String propertyStartName){
        getAllProperties(locale);
        List<ModelProperty> modelProperties = new ArrayList<>();
        for(String name: propertiesMap.keySet()) {
            if(name.startsWith(propertyStartName)){
                modelProperties.add(new ModelProperty(name, propertiesMap.get(name)));
            }
        }
        return modelProperties;
    }

    public Optional<Boolean> propertyExists(Locale locale, String propertyName){
        if(propertyName == null || propertyName.isEmpty()) return Optional.of(false);
        getAllProperties(locale);
        for(String name: propertiesMap.keySet()){
            if(name.equals(propertyName)) return Optional.of(true);
        }
        return Optional.of(false);
    }

    public Optional<ModelProperty> getModelProperty(Locale locale, String propertyName){
        if(propertyName == null || propertyName.isEmpty()) return Optional.empty();
        String propertyValue = getMessage(propertyName, null, locale);
        return Optional.of(new ModelProperty(propertyName, propertyValue));
    }

}
