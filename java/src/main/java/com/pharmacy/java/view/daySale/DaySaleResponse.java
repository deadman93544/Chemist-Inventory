package com.pharmacy.java.view.daySale;

import com.pharmacy.java.entity.DaySale;
import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
public class DaySaleResponse implements Response {

    private Long id;
    private Date date;
    private double daySaleAmount;
    private long numberOfCustomers;
    private long balanceSalesNumber;
    private double balanceAmount;

    public DaySaleResponse(DaySale daySale){
        this.id = daySale.getId();
        this.date = (Date) daySale.getDate();
        this.daySaleAmount = daySale.getDaySaleAmount();
        this.numberOfCustomers = daySale.getNumberOfSales();
        this.balanceSalesNumber = daySale.getBalanceSalesNumber();
        this.balanceAmount = daySale.getBalanceAmount();
    }
}
