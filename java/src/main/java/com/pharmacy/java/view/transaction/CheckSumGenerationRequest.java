package com.pharmacy.java.view.transaction;

import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckSumGenerationRequest implements Request {
    private String hash;
}
