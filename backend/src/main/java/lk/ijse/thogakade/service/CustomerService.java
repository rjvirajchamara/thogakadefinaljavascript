package lk.ijse.thogakade.service;




import lk.ijse.thogakade.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    void saveCustomer(String customerId, CustomerDto dto);

    void updateCustomer(String customerId, CustomerDto dto);

    void deleteCustomer(String customerId);

    CustomerDto findCustomer(String customerId);

    List<CustomerDto> findAllCustomers();


}
