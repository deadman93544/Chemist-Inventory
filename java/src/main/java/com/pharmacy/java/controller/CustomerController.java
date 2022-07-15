package com.pharmacy.java.controller;

import com.pharmacy.java.service.CustomerService;
import com.pharmacy.java.view.customer.CustomerRequest;
import com.pharmacy.java.view.customer.CustomerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public void createCustomer(@RequestBody CustomerRequest customerRequest){
        customerService.createCustomer(customerRequest);
    }

    @GetMapping
    public CustomerResponse getCustomer(@RequestParam Long customerId){
        return customerService.getCustomerById(customerId);
    }

    @GetMapping("/list")
    public List<CustomerResponse> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @PutMapping
    public void updateCustomer(@RequestBody CustomerRequest customerRequest){
        customerService.updateCustomer(customerRequest);
    }

    @DeleteMapping
    public void deleteCustomer(@RequestParam Long customerId){
        customerService.deleteCustomer(customerId);
    }
}
