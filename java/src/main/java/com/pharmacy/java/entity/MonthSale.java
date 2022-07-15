package com.pharmacy.java.entity;

import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.view.monthSale.MonthSaleRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MonthSale{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private long month;

    private long year;

    private double monthlySaleAmount;

    private long balanceSalesNumber;

    private double balanceSalePayment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public MonthSale(long month, long year, double monthlySaleAmount, long balanceSalesNumber, double balanceSalePayment) {
        this.month = month;
        this.year = year;
        this.monthlySaleAmount = monthlySaleAmount;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceSalePayment = balanceSalePayment;
    }

    public MonthSale(MonthSaleRequest monthSaleRequest) {
        this.month = monthSaleRequest.getMonth();
        this.year = monthSaleRequest.getYear();
        this.monthlySaleAmount = monthSaleRequest.getMonthlySaleAmount();
        this.balanceSalesNumber = monthSaleRequest.getBalanceSalesNumber();
        this.balanceSalePayment = monthSaleRequest.getBalanceSalePayment();
    }

    @Transient
    public void update(MonthSaleRequest monthSaleRequest){
        this.month = monthSaleRequest.getMonth();
        this.year = monthSaleRequest.getYear();
        this.monthlySaleAmount = monthSaleRequest.getMonthlySaleAmount();
        this.balanceSalesNumber = monthSaleRequest.getBalanceSalesNumber();
        this.balanceSalePayment = monthSaleRequest.getBalanceSalePayment();
    }

    @Transient
    public void update(double monthlySaleAmount, long balanceSalesNumber, double balanceSalePayment){
        this.monthlySaleAmount  = monthlySaleAmount;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceSalePayment = balanceSalePayment;
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
