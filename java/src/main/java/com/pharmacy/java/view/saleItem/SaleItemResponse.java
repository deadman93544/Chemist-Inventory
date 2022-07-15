package com.pharmacy.java.view.saleItem;

import com.pharmacy.java.entity.Item;
import com.pharmacy.java.entity.Sale;
import com.pharmacy.java.entity.SaleItem;
import com.pharmacy.java.view.Response;
import com.pharmacy.java.view.item.ItemResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaleItemResponse implements Response {

    private Long id;
    private Long saleId;
    private ItemResponse itemResponse;
    private double quantity;
    private double saleItemPrice;

    public SaleItemResponse(SaleItem saleItem){
        this.id = saleItem.getId();
        this.saleId = saleItem.getSale().getId();
        this.itemResponse =new ItemResponse(saleItem.getItem());
        this.quantity = saleItem.getQuantity();
        this.saleItemPrice = saleItem.getSaleItemPrice();
    }

}