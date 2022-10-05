package com.pharmacy.java.view.item;

import com.pharmacy.java.entity.Item;
import com.pharmacy.java.enums.ItemType;
import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ItemResponse implements Response {

    private Long id;

    private String name;

    private Double itemPrice;

    private Date lastModifiedDate;

    private Date createdDate;

    private Long quantity;

    private Long subQuantity;

    private Long itemDivisions;

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.itemPrice = item.getItemPrice();
        this.lastModifiedDate = item.getLastModifiedDate();
        this.createdDate = item.getCreatedDate();
        this.itemDivisions = item.getItemDivisions();
        this.quantity = item.getQuantity();
        this.subQuantity = item.getSubQuantity();
    }
}
