package lk.ijse.thogakade.service;

import lk.ijse.thogakade.dto.ItemDto;

import java.util.List;

public interface ItemService {

    void saveItem(String id, ItemDto itemDto);

    void updateItem(String id, ItemDto itemDto);

    void deleteItem(String id);

    List<ItemDto> findAllItems();

    ItemDto findItem(String id);
}
