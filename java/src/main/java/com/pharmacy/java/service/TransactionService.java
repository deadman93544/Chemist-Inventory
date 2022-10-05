package com.pharmacy.java.service;

import com.pharmacy.java.view.transaction.CheckSumGenerationRequest;
import com.pharmacy.java.view.transaction.ChecksumGenerationResponse;
import com.pharmacy.java.view.transaction.ChecksumValidationRequest;
import com.pharmacy.java.view.transaction.OrderResponse;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.paytm.pg.merchant.PaytmChecksum;

import java.util.UUID;

@Service
public class TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    @Value("${paytm.mid}")
    private String paytmMID;

    @Value("${paytm.key}")
    private String paytmKey;

    @Value("${paytm.channelId}")
    private String paytmChannelId;

    @Value("${paytm.website}")
    private String paytmWebsite;

    @Value("${paytm.industryTypeId}")
    private String paytmIndustryTypeId;

    @Value("${paytm.customerId}")
    private String paytmCustomerId;

    public ChecksumGenerationResponse generateChecksum(CheckSumGenerationRequest checkSumGenerationRequest){
		UUID orderId = UUID.randomUUID();
		String req = checkSumGenerationRequest.getHash()
				.replace("GENERATED_ORDER_ID", orderId.toString());
//				.replace("MERCHANT_ID", paytmMID);
		logger.info(req);
		try {
			return new ChecksumGenerationResponse(PaytmChecksum.generateSignature(req, paytmKey), orderId.toString());
		}catch(Exception ex) {
			throw new RuntimeException();
		}
    }

    public OrderResponse validateChecksum(ChecksumValidationRequest checksumValidationRequest){
        logger.info("Validating the Checksum");
        logger.info(checksumValidationRequest.getChecksum());
        logger.info(checksumValidationRequest.getReqBody());
        String body = checksumValidationRequest.getReqBody().replace("MERCHANT_ID", paytmMID);
        boolean status = true;
        try {
            status = PaytmChecksum.verifySignature(body, paytmKey, checksumValidationRequest.getChecksum());
        }catch (Exception e){
            e.printStackTrace();
        }
        return new OrderResponse(status);
    }

}
