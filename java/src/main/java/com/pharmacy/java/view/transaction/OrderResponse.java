package com.pharmacy.java.view.transaction;

import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderResponse implements Response {
    public Boolean status;

    public OrderResponse(boolean status){
        this.status = status;
    }
}
