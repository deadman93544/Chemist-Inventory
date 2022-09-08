package com.pharmacy.java.entity;

import com.pharmacy.java.view.customer.CustomerRequest;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private String phoneNum;

    private double balance;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Customer(CustomerRequest customerRequest){
        this.name = customerRequest.getName();
        this.phoneNum = customerRequest.getPhoneNum();
        this.balance = customerRequest.getBalance();
    }

    public Customer(String name, String phoneNum, double balance){
        this.name = name;
        this.phoneNum = phoneNum;
        this.balance = balance;
    }

    @Transient
    public void update(CustomerRequest customerRequest){
        this.name = customerRequest.getName();
        this.phoneNum = customerRequest.getPhoneNum();
        this.balance = customerRequest.getBalance();
    }

    @PreUpdate
    public void preUpdate(){
        this.setLastModifiedDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }

    @PrePersist
    public void preCreate(){
        this.setCreatedDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }

}
