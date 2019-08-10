package pl.rentcar.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;
import pl.rentcar.server.model.CrudModel;
import pl.rentcar.server.model.ModelCommon;
import pl.rentcar.server.util.AppUtil;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @param <P> - main projection
 * @param <T> - real entity
 */

@NoRepositoryBean
public interface RepositoryCommon<P, T> extends CrudRepository<T, UUID> {
    Page<P> findByArchiveIsNullOrArchiveIsFalse(Pageable pageable);

    List<P> findByArchiveIsNullOrArchiveIsFalse();

    P getById(UUID id);

    //Search by inputted items
    default <T extends CrudModel> List<T> searchHelper(String[] searchItems, String searchMethodName) {

        Method[] methods = this.getClass().getDeclaredMethods();
        Method method = null;

        for (Method m : methods)
            if (m.getName().equals(searchMethodName))
                method = m;

        List<String[]> searchParams = AppUtil.variations(searchItems, method.getParameterCount());
        List<T> itemsToReturn = new ArrayList<>();
        List<T> objectsFromRepo;

        for (String[] params : searchParams) {

            try {
                objectsFromRepo = (List<T>) method.invoke(this, params);
            } catch (Throwable t) {
                t.printStackTrace();
                objectsFromRepo = new ArrayList<>();
            }

            for (T o : objectsFromRepo)
                if (o.getId() != null && !itemsToReturn.stream().anyMatch(t -> t.getId().equals(o.getId())))
                    itemsToReturn.add(o);

        }

        return itemsToReturn;

    }

}
