package com.pharmacy.java.view.customer;

import com.pharmacy.java.entity.Customer;
import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CustomerResponse implements Response {

    private Long id;
    private String name;
    private String phoneNum;
    private double balance;
    private Date lastModifiedDate;
    private Date createdDate;

    public CustomerResponse(Customer customer){
        this.id = customer.getId();
        this.name = customer.getName();
        this.phoneNum = customer.getPhoneNum();
        this.balance = customer.getBalance();
        this.lastModifiedDate = customer.getLastModifiedDate();
        this.createdDate = customer.getCreatedDate();
    }

}
