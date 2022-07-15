package com.pharmacy.java.view.customer;

import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRequest implements Request {

    private long id;

    private String name;

    private String phoneNum;

    private Double balance;
}
