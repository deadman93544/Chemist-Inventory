package com.pharmacy.java.view.saleItem;

import com.pharmacy.java.view.Request;
import com.pharmacy.java.view.item.ItemRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class SaleItemRequest implements Request {

    private Long id;

    private Long quantity;

    private Long subQuantity;

    private Long saleId;

    private ItemRequest itemRequest;

    private double saleItemPrice;

    private Date expirationDate;

    private String batchNumber;
}
