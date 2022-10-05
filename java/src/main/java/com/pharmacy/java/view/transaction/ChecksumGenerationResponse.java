package com.pharmacy.java.view.transaction;

import com.pharmacy.java.view.Response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChecksumGenerationResponse implements Response {

    private String checksum;

    private String orderId;

    public ChecksumGenerationResponse(String checksum, String orderId) {
        this.checksum = checksum;
        this.orderId = orderId;
    }
}
