package lk.ijse.thogakade.service.impl;

import lk.ijse.thogakade.dto.ItemDto;
import lk.ijse.thogakade.entity.Item;
import lk.ijse.thogakade.repository.ItemRepository;
import lk.ijse.thogakade.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository repository;

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public void saveItem(String id, ItemDto itemDto) {
        if (!itemDto.getId().equals(id)) {

            throw new RuntimeException("Item ID mismatched");
        }
        Item item=new Item();
        item.setId(itemDto.getId());
        item.setDescription(itemDto.getDescription());
        item.setQty(itemDto.getQty());
        item.setUnitPrice(itemDto.getUnitPrice());
        repository.save(item);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public void updateItem(String id, ItemDto itemDto) {
        if (!itemDto.getId().equals(id)) {
            throw new RuntimeException("Item ID mismatched");
        }
        if (repository.existsById(id)) {
            repository.save(new Item(itemDto.getId(),itemDto.getDescription(),itemDto.getQty(),itemDto.getUnitPrice()));
        }else{
            throw new RuntimeException("Item doesn't exist");
        }
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public void deleteItem(String id) {
        repository.deleteById(id);
    }

    @Override
    public List<ItemDto> findAllItems() {
        List<Item> allCustomers = repository.findAll();
        List<ItemDto> list = new ArrayList<>();
        allCustomers.forEach(c -> list.add(new ItemDto(c.getId(),c.getDescription(),c.getQty(),c.getUnitPrice())));
        return list;
    }

    @Override
    public ItemDto findItem(String id) {
        Item item = repository.findById(id).get();
        return new ItemDto(item.getId(),item.getDescription(),item.getQty(),item.getUnitPrice());
    }
}
