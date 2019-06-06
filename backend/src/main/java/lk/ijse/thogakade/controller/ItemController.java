package lk.ijse.thogakade.controller;

import lk.ijse.thogakade.dto.ItemDto;
import lk.ijse.thogakade.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/items")
public class ItemController {

    @Autowired
    private ItemService service;
    @PostMapping("/{id}")
    public void saveItem(@PathVariable("id") String id, @RequestBody ItemDto itemDto){
        System.out.println("itemDto "+itemDto);
        service.saveItem(id,itemDto);

    }

    @PutMapping("/{id}")
    public void updateItem(@PathVariable("id") String id,@RequestBody ItemDto itemDto){
        service.updateItem(id,itemDto);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable("id") String id){
        service.deleteItem(id);
    }

    @GetMapping({"{id}"})
    public ItemDto findItem(@PathVariable("id") String id){
        return service.findItem(id);
    }

    @GetMapping
    public Object findAllItems(@RequestParam(value = "action",required = false)String action,@RequestParam(value = "name",required = false) String name){
        if(null !=action){
            switch(action){
                default:
                    return service.findAllItems();
            }
        }else{
            return service.findAllItems();
        }

    }
}
