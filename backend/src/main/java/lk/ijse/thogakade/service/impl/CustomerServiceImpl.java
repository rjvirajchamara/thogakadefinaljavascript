package lk.ijse.thogakade.service.impl;


import lk.ijse.thogakade.dto.CustomerDto;
import lk.ijse.thogakade.entity.Customer;
import lk.ijse.thogakade.repository.CustomerRepository;
import lk.ijse.thogakade.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CustomerServiceImpl implements CustomerService{


    @Autowired
    private CustomerRepository repository;

    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public void saveCustomer(String customerId, CustomerDto dto) {

        if (!dto.getId().equals(customerId)) {

            throw new RuntimeException("Customer ID mismatched");
        }
        Customer customer=new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setAddress(dto.getAddress());
        repository.save(customer);

    }
    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public void updateCustomer(String id, CustomerDto dto) {
        if (!dto.getId().equals(id)) {
            throw new RuntimeException("Customer ID mismatched");
        }
        if (repository.existsById(id)) {
            repository.save(new Customer(dto.getId(), dto.getName(), dto.getAddress()));
        }else{
            throw new RuntimeException("Customer doesn't exist");
        }
    }
    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public void deleteCustomer(String id) {
        repository.deleteById(id);
    }

    @Override
    public CustomerDto findCustomer(String id) {
        Customer customer = repository.findById(id).get();
        return new CustomerDto(customer.getId(), customer.getName(), customer.getAddress());
    }

    @Override
    public List<CustomerDto> findAllCustomers() {
        List<Customer> allCustomers = repository.findAll();
        List<CustomerDto> list = new ArrayList<>();
        allCustomers.forEach(c -> list.add(new CustomerDto(c.getId(), c.getName(), c.getAddress())));
        return list;
    }
}
