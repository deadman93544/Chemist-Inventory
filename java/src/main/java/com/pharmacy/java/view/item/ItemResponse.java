package com.pharmacy.java.view.item;

import com.pharmacy.java.entity.Item;
import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemResponse implements Response {

    private Long id;

    private String name;

    private Double itemPrice;

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.itemPrice = item.getItemPrice();
    }
}
