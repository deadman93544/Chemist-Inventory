package com.pharmacy.java.service;

import com.pharmacy.java.entity.MonthSale;
import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.jpa.MonthSaleRepository;
import com.pharmacy.java.view.monthSale.MonthSaleRequest;
import com.pharmacy.java.view.monthSale.MonthSaleResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonthSaleService {

    public static final Logger logger = LoggerFactory.getLogger(MonthSaleService.class);

    @Autowired
    private MonthSaleRepository monthSaleRepository;

    public MonthSale createMonthSale(MonthSaleRequest monthSaleRequest){
        logger.info("Creating New MonthSale with current Month {} and Year{}", monthSaleRequest.getMonth(), monthSaleRequest.getYear());
        return monthSaleRepository.saveAndFlush(new MonthSale(monthSaleRequest));
    }

    public List<MonthSaleResponse> getAllMonthSales(){
        logger.info("Returning a list of all the MonthSales");
        return monthSaleRepository.findAll()
                .stream().map(MonthSaleResponse::new)
                .collect(Collectors.toList());
    }

    public MonthSaleResponse getMonthSaleById(Long monthSaleId){
        logger.info("Finding a MonthSale with Id: {}", monthSaleId);
        return monthSaleRepository.findById(monthSaleId)
                .map(MonthSaleResponse::new)
                .orElseThrow(RuntimeException::new);
    }

    public void updateMonthSale(MonthSaleRequest monthSaleRequest){
        MonthSale monthSale = monthSaleRepository.findById(monthSaleRequest.getId()).orElseThrow(RuntimeException::new);
        logger.info("Updating MonthSale with Id: {}", monthSale.getId());
        monthSale.update(monthSaleRequest);
        monthSaleRepository.saveAndFlush(monthSale);
    }

    public void updateMonthSaleFormDaySale(MonthSale monthSale, double salePrice, PaymentStatus paymentStatus){
        monthSale.update(monthSale.getMonthlySaleAmount() + salePrice,
                paymentStatus == PaymentStatus.BORROWED ? monthSale.getBalanceSalesNumber() + 1: monthSale.getBalanceSalesNumber(),
                paymentStatus == PaymentStatus.BORROWED ? monthSale.getBalanceSalePayment() + salePrice : monthSale.getBalanceSalePayment());
        logger.info("Updating MonthSale from Sale Create with Id {} and PaymentStatus {}", monthSale.getId(), paymentStatus);
        monthSaleRepository.saveAndFlush(monthSale);
    }

    public void updatePaymentStatus(MonthSale monthSale, double salePrice){
        monthSale.setBalanceSalesNumber(monthSale.getBalanceSalesNumber() - 1);
        monthSale.setBalanceSalePayment(monthSale.getBalanceSalePayment() - salePrice);
        logger.info("Updating MonthSale from Sale Update with Id {} and PaymentStatus {}", monthSale.getId(), PaymentStatus.BORROWED);
        monthSaleRepository.saveAndFlush(monthSale);
    }

    public void updateFromDeleteSale(MonthSale monthSale, double salePrice, PaymentStatus paymentStatus){
        monthSale.update(monthSale.getMonthlySaleAmount() - salePrice,
                paymentStatus == PaymentStatus.BORROWED ? monthSale.getBalanceSalesNumber() - 1 : monthSale.getBalanceSalesNumber(),
                paymentStatus == PaymentStatus.BORROWED ? monthSale.getBalanceSalePayment() - salePrice : monthSale.getBalanceSalePayment());
        logger.info("Updating MonthSale from Sale Delete with Id {} and PaymentStatus {}", monthSale.getId(), paymentStatus);
        monthSaleRepository.saveAndFlush(monthSale);
    }

    public void deleteMonthSale(Long monthSaleId){
        MonthSale monthSale = monthSaleRepository.findById(monthSaleId).orElseThrow(RuntimeException::new);
        logger.info("Deleting MonthSale with Id: {}", monthSale.getId());
        monthSaleRepository.delete(monthSale);
    }
}
