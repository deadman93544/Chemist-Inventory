package com.pharmacy.java.view.monthSale;

import com.pharmacy.java.entity.MonthSale;
import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MonthSaleResponse implements Response {

    private long id;
    private long month;
    private long year;
    private double monthlySaleAmount;
    private long balanceSalesNumber;
    private double balanceSalePayment;

    public MonthSaleResponse(MonthSale monthSale){
        this.id = monthSale.getId();
        this.month = monthSale.getMonth();
        this.year = monthSale.getYear();
        this.monthlySaleAmount = monthSale.getMonthlySaleAmount();
        this.balanceSalesNumber = monthSale.getBalanceSalesNumber();
        this.balanceSalePayment = monthSale.getBalanceSalePayment();
    }

}
