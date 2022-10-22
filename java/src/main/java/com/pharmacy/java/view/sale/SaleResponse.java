package com.pharmacy.java.view.sale;

import com.pharmacy.java.entity.Customer;
import com.pharmacy.java.entity.Sale;
import com.pharmacy.java.entity.SaleItem;
import com.pharmacy.java.view.Response;
import com.pharmacy.java.view.customer.CustomerResponse;
import com.pharmacy.java.view.saleItem.SaleItemResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SaleResponse implements Response {
    private Long id;
    private List<SaleItemResponse> saleItemResponse;
    private String paymentStatus;
    private double salePrice;
    private CustomerResponse customerResponse;
    private Date createdDate;

    public SaleResponse(Sale sale, List<SaleItemResponse> saleItemResponse){
        this.id = sale.getId();
        this.saleItemResponse = saleItemResponse;
        this.paymentStatus = String.valueOf(sale.getPaymentStatus());
        this.salePrice = sale.getDiscountedPrice();
        this.customerResponse = sale.getCustomer() == null ?
                new CustomerResponse(new Customer(sale.getCustomerName(), null, 0)) :
                new CustomerResponse(sale.getCustomer());
        this.createdDate = sale.getCreatedDate();
    }

    public SaleResponse(Long id){
        this.id = id;
    }
}
