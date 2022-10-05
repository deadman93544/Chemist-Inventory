package com.pharmacy.java.view.transaction;

import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TransactionResponse implements Response {

    private String checksum;

    public TransactionResponse(String checksum) {
        this.checksum = checksum;
    }

}
