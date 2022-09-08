package com.pharmacy.java.service;

import com.pharmacy.java.entity.Customer;
import com.pharmacy.java.jpa.CustomerRepository;
import com.pharmacy.java.view.customer.CustomerRequest;
import com.pharmacy.java.view.customer.CustomerResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    public static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(CustomerRequest customerRequest){
        logger.info("Creating a new Customer: {}", customerRequest.getName());
        return customerRepository.saveAndFlush(new Customer(customerRequest));
    }

    public List<CustomerResponse> getAllCustomers(){
        logger.info("Returning a list of all customers");
        return customerRepository.findAll()
                .stream().map(CustomerResponse::new)
                .collect(Collectors.toList());
    }

    public CustomerResponse getCustomerById(Long CustomerId){
        logger.info("Finding a customer with customerId: {}", CustomerId);
        return customerRepository.findById(CustomerId)
                .map(CustomerResponse::new)
                .orElseThrow(RuntimeException::new);
    }

    public Customer getOrCreateCustomer(CustomerRequest customerRequest){
        return customerRepository.findById(customerRequest.getId())
                .orElse(customerRepository.saveAndFlush(new Customer(customerRequest.getName(), customerRequest.getPhoneNum(), 0)));
    }

    public void updateCustomerBalance(Customer customer, double balance){
        customer.setBalance(customer.getBalance() + balance);
        customerRepository.saveAndFlush(customer);
    }

    public void updateCustomer(CustomerRequest customerRequest){
        Customer customer = customerRepository.findById(customerRequest.getId()).orElseThrow(RuntimeException::new);
        logger.info("Customer found with CustomerId: {} to update", customerRequest.getId());
        customer.update(customerRequest);
        customerRepository.saveAndFlush(customer);
//        return customer;
    }

    public void updateFromSales(Customer customer, double salePrice){
        customer.setBalance(customer.getBalance() + salePrice);
        logger.info("Customer with Id {} has {} balance", customer.getId(), customer.getBalance());
        customer = customerRepository.saveAndFlush(customer);
        logger.info("Customer Id from updateFrom Sales: " + customer.getId());
    }

    public void deleteCustomer(Long customerId){
        Customer customer = customerRepository.findById(customerId).orElseThrow(RuntimeException::new);
        logger.info("Customer with Id {} found for deletion", customer.getId());
        customerRepository.delete(customer);
    }
}
