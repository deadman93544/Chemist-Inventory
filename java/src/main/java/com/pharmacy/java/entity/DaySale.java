package com.pharmacy.java.entity;

import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.view.daySale.DaySaleRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class DaySale{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private Date date;

    private double daySaleAmount;

    private long numberOfSales;

    private long balanceSalesNumber;

    private double balanceAmount;

    @ManyToOne
    @JoinColumn(name = "monthSale_id")
    private MonthSale monthSale;

    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdDate;

    public DaySale(Date date, double daySaleAmount, long numberOfSales, long balanceSalesNumber, double balanceAmount, MonthSale monthSale){
        this.date = date;
        this.daySaleAmount = daySaleAmount;
        this.numberOfSales = numberOfSales;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceAmount = balanceAmount;
    }

    public DaySale(DaySaleRequest daySaleRequest, MonthSale monthSale){
        this.date = daySaleRequest.getDate();
        this.daySaleAmount = daySaleRequest.getDaySaleAmount();
        this.numberOfSales = daySaleRequest.getNumberOfCustomers();
        this.balanceSalesNumber = daySaleRequest.getBalanceSalesNumber();
        this.balanceAmount = daySaleRequest.getBalanceAmount();
        this.monthSale = monthSale;
    }

    @Transient
    public void update(DaySaleRequest daySaleRequest){
        this.date = daySaleRequest.getDate();
        this.daySaleAmount = daySaleRequest.getDaySaleAmount();
        this.numberOfSales = daySaleRequest.getNumberOfCustomers();
        this.balanceSalesNumber = daySaleRequest.getBalanceSalesNumber();
        this.balanceAmount = daySaleRequest.getBalanceAmount();
    }

    @Transient
    public void update(double daySaleAmount, long numberOfSales, long balanceSalesNumber, double balanceAmount){
        this.daySaleAmount = daySaleAmount;
        this.numberOfSales = numberOfSales;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceAmount = balanceAmount;
    }

    @PreUpdate
    public void preUpdate(){
        this.setLastModifiedDate(java.util.Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }

    @PrePersist
    public void preCreate(){
        this.setCreatedDate(java.util.Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }
}
