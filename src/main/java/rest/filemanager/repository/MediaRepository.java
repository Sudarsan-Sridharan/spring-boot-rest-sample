package rest.filemanager.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rest.filemanager.model.Media;

@Repository
public interface MediaRepository extends PagingAndSortingRepository<Media, Long> {

}
