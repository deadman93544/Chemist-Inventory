package com.pharmacy.java.view.daySale;

import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DaySaleRequest implements Request {

    private Long id;

    private Date date;

    private double daySaleAmount;

    private long numberOfCustomers;

    private long balanceSalesNumber;

    private double  balanceAmount;

    public void update(Long id, Date date, double daySaleAmount, long numberOfCustomers, long balanceSalesNumber, double balanceAmount) {
        this.id = id;
        this.date = date;
        this.daySaleAmount = daySaleAmount;
        this.numberOfCustomers = numberOfCustomers;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceAmount = balanceAmount;
    }
}
