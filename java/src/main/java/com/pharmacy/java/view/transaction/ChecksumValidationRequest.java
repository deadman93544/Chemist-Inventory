package com.pharmacy.java.view.transaction;


import com.pharmacy.java.view.Request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChecksumValidationRequest implements Request {
    String checksum;

    String reqBody;
}
