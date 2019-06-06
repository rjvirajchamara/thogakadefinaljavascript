package lk.ijse.thogakade.controller;

import lk.ijse.thogakade.dto.CustomerDto;
import lk.ijse.thogakade.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v2/customer")
public class CustomerController {

    @Autowired
    private CustomerService service;


    @PostMapping("/{id}")
    public void saveCustomer(@PathVariable("id") String id,
                             @RequestBody CustomerDto customerDto){
        service.saveCustomer(id,customerDto);
    }

    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable("id") String id,
                               @RequestBody CustomerDto customerDTO){
        service.updateCustomer(id, customerDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable("id") String id){
        service.deleteCustomer(id);
    }

    @GetMapping("/{id}")
    public CustomerDto findCustomer(@PathVariable("id") String id)
    {
        return service.findCustomer(id);

    }

    @GetMapping
    public Object findAllCustomer(@RequestParam(value = "action", required=false) String action,@RequestParam(value = "name",required = false)String name) {
        if (null != action) {
            switch (action) {
                default:
                    return service.findAllCustomers();
            }
        } else {
           return service.findAllCustomers();
        }
    }
}
