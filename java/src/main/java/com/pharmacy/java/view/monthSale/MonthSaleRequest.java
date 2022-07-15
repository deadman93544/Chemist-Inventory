package com.pharmacy.java.view.monthSale;

import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonthSaleRequest implements Request {

    private Long id;

    private Long month;

    private Long year;

    private double monthlySaleAmount;

    private Long balanceSalesNumber;

    private double balanceSalePayment;

    public void update(Long id, Long month, Long year, double monthlySaleAmount, Long balanceSalesNumber, double balanceSalePayment){
        this.id = id;
        this.month = month;
        this.year = year;
        this.monthlySaleAmount = monthlySaleAmount;
        this.balanceSalesNumber = balanceSalesNumber;
        this.balanceSalePayment = balanceSalePayment;
    }
}
