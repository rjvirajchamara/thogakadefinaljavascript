package lk.ijse.thogakade.repository;

import lk.ijse.thogakade.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,String> {
}
