package com.pharmacy.java.controller;

import com.pharmacy.java.service.TransactionService;
import com.pharmacy.java.view.transaction.CheckSumGenerationRequest;
import com.pharmacy.java.view.transaction.ChecksumGenerationResponse;
import com.pharmacy.java.view.transaction.ChecksumValidationRequest;
import com.pharmacy.java.view.transaction.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/subs/tx")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/generatechecksum")
    public ChecksumGenerationResponse createChecksum(@RequestBody CheckSumGenerationRequest checkSumGenerationRequest){
        return transactionService.generateChecksum(checkSumGenerationRequest);
    }

    @PostMapping("/validatechecksum")
    public OrderResponse createOrder(@RequestBody ChecksumValidationRequest checksumValidationRequest){
        return transactionService.validateChecksum(checksumValidationRequest);
    }
}
