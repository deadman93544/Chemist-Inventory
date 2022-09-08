package com.pharmacy.java.view.item;

import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemRequest implements Request {

    private long id;

    private String name;

    private Double itemPrice;

    private Boolean available;
}
