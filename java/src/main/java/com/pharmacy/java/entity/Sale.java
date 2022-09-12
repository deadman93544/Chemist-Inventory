package com.pharmacy.java.entity;

import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.view.sale.SaleRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

//    @OneToMany
//    private Set<SaleItem> saleItems;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private double actualPrice;

    private double discountPercent;

    private double discountedPrice;

    private double balance;

    @ManyToOne
    @JoinColumn(name = "daySale_id")
    private DaySale daySale;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    private String customerName;

    public Sale(SaleRequest saleRequest, Customer customer, DaySale daySale){
//        this.id = saleRequest.getId();
//        this.saleItems = (Set<SaleItem>) saleRequest.getSaleItems();
        this.paymentStatus = saleRequest.getPaymentStatus();
        this.actualPrice = saleRequest.getActualPrice();
        this.discountPercent = saleRequest.getDiscountPercent();
        this.discountedPrice = saleRequest.getDiscountedPrice();
        this.balance = saleRequest.getBalance();
        this.customer = customer;
        this.daySale = daySale;
        this.customerName = customer == null ? saleRequest.getCustomerRequest().getName() : customer.getName();
    }

    @Transient
    public void update(PaymentStatus paymentStatus, double salePrice, Customer customer){
        this.paymentStatus = paymentStatus;
        this.actualPrice = salePrice;
        this.customer = customer;
    }

    @Transient
    public void updateSalePrice(double salePrice){
        this.actualPrice = salePrice;
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
