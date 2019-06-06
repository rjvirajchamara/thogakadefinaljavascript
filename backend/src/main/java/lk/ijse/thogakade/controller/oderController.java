package lk.ijse.thogakade.controller;

import lk.ijse.thogakade.dto.ItemDto;
import lk.ijse.thogakade.dto.oderDto;
import lk.ijse.thogakade.service.ItemService;

import lk.ijse.thogakade.service.oderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by chamara on 9/10/2018.
 */

@CrossOrigin
@RestController
@RequestMapping("api/v1/customers1111")
public class oderController {

    @Autowired
    private oderService  service;
    @PostMapping("/{id}")
    public void saveoder(@PathVariable("id") String id, @RequestBody oderDto oderDto){
       System.out.println("itemDto "+oderDto);
        service.saveoder(id,oderDto);

    }

   /* @PutMapping("/{id}")
    public void updateoder(@PathVariable("id") String id,@RequestBody ItemDto itemDto){
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
      */  }








