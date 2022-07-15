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

    private double salePrice;

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

    public Sale(SaleRequest saleRequest, double salePrice, Customer customer, DaySale daySale){
//        this.id = saleRequest.getId();
//        this.saleItems = (Set<SaleItem>) saleRequest.getSaleItems();
        this.paymentStatus = saleRequest.getPaymentStatus();
        this.salePrice = salePrice;
        this.customer = customer;
        this.daySale = daySale;
    }

    @Transient
    public void update(PaymentStatus paymentStatus, double salePrice, Customer customer){
        this.paymentStatus = paymentStatus;
        this.salePrice = salePrice;
        this.customer = customer;
    }

    @Transient
    public void updateSalePrice(double salePrice){
        this.salePrice = salePrice;
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
