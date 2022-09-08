package com.pharmacy.java.view.saleItem;

import com.pharmacy.java.view.Request;
import com.pharmacy.java.view.item.ItemRequest;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SaleItemRequest implements Request {

    private Long id;

    private double quantity;

    private Long saleId;

    private ItemRequest itemRequest;

    private double saleItemPrice;
}
