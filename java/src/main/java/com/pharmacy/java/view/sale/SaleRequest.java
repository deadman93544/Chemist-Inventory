package com.pharmacy.java.view.sale;

import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.view.Request;
import com.pharmacy.java.view.customer.CustomerRequest;
import com.pharmacy.java.view.saleItem.SaleItemRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaleRequest implements Request {

    private Long id;

    private List<SaleItemRequest> saleItemRequests;

    private PaymentStatus paymentStatus;

    private CustomerRequest customerRequest;

}
