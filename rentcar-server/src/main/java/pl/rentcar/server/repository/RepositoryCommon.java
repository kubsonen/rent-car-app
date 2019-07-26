package pl.rentcar.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.UUID;

/**
 * @param <P> - main projection
 * @param <T> - real entity
 */

@NoRepositoryBean
public interface RepositoryCommon<P,T> extends CrudRepository<T, UUID> {
    Page<P> findByArchiveIsNullOrArchiveIsFalse(Pageable pageable);
    List<P> findByArchiveIsNullOrArchiveIsFalse();
    P getById(UUID id);
}
