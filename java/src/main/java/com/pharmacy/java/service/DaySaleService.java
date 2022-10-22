package com.pharmacy.java.service;

import com.pharmacy.java.entity.DaySale;
import com.pharmacy.java.entity.MonthSale;
import com.pharmacy.java.enums.PaymentStatus;
import com.pharmacy.java.jpa.DaySaleRepository;
import com.pharmacy.java.jpa.MonthSaleRepository;
import com.pharmacy.java.view.daySale.DaySaleRequest;
import com.pharmacy.java.view.daySale.DaySaleResponse;
import com.pharmacy.java.view.monthSale.MonthSaleRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Month;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DaySaleService {

    public static final Logger logger = LoggerFactory.getLogger(DaySaleService.class);

    @Autowired
    private DaySaleRepository daySaleRepository;

    @Autowired
    private MonthSaleRepository monthSaleRepository;

    @Autowired
    private MonthSaleService monthSaleService;

    @PostConstruct
    public void createDaySale(){
        MonthSale monthSale = monthSaleService.createMonthSale();
        DaySale daySale = daySaleRepository.findTopByOrderByCreatedDateDesc();
        Calendar daySaleDate = Calendar.getInstance();
        Calendar calendar = Calendar.getInstance();
        daySaleDate.setTime(daySale.getDate());
        if (daySaleDate.get(Calendar.DATE) !=  calendar.get(Calendar.DATE)
                || daySaleDate.get(Calendar.MONTH) != calendar.get(Calendar.MONTH)
                || daySaleDate.get(Calendar.YEAR) != calendar.get(Calendar.YEAR)){
            DaySale newDaySale = new DaySale(new Date(), 0, 0, 0, 0, monthSale);
            logger.info("Creating a new daySale with date {}", newDaySale.getDate());
            daySaleRepository.saveAndFlush(newDaySale);
        }
//        logger.info("Year: {}, {}", daySaleDate.get(Calendar.YEAR), calendar.get(Calendar.YEAR));
//        logger.info("Month: {}, {}", daySaleDate.get(Calendar.MONTH), calendar.get(Calendar.MONTH));
//        logger.info("Date: {}, {}", daySaleDate.get(Calendar.DATE), calendar.get(Calendar.DATE));
        else {
            logger.info("DaySale with current date {} is already available", daySale.getDate());
        }
    }

    public DaySale createDaySale(DaySaleRequest daySaleRequest){
        logger.info("Finding MonthSale with Top Created Date");
        MonthSale monthSale = monthSaleRepository.findTopByOrderByCreatedDateDesc();
        if (monthSale == null
                || monthSale.getMonth() != daySaleRequest.getDate().getMonth()
                || monthSale.getYear() != daySaleRequest.getDate().getYear()){
            logger.info("MonthSale with Current month {} not found, Creating!", new Date().getMonth());
            MonthSaleRequest monthSaleRequest = new MonthSaleRequest();
            monthSaleRequest.update(null, (long)new Date().getMonth(), (long)new Date().getYear(), (double) 0, 0L, 0);
            monthSale = monthSaleService.createMonthSale(monthSaleRequest);
        };
        logger.info("Creating new DaySale");
        return daySaleRepository.saveAndFlush(new DaySale(daySaleRequest, monthSale));
    }

    public List<DaySaleResponse> getAllDaySales(){
        logger.info("Returning a list of all the DaySales");
        return daySaleRepository.findAll()
                .stream().map(DaySaleResponse::new)
                .collect(Collectors.toList());
    }

    public DaySaleResponse getDaySaleById(Long daySaleId){
        logger.info("Finding a DaySale with Id: {}", daySaleId);
        return daySaleRepository.findById(daySaleId)
                .map(DaySaleResponse::new)
                .orElseThrow(RuntimeException::new);
    }

    public DaySale getTopDaySale(){
        return daySaleRepository.findTopByOrderByCreatedDateDesc();
    }

    public void updateDaySale(Long Id, long saleNumber, double saleAmount, long balanceSaleNumber, double balanceSaleAmount){
        DaySale daySale = daySaleRepository.findById(Id).orElseThrow(RuntimeException::new);
        daySale.setDaySaleAmount(daySale.getDaySaleAmount() + saleAmount);
        daySale.setNumberOfSales(daySale.getNumberOfSales() + saleNumber);
        daySale.setBalanceSalesNumber(daySale.getBalanceSalesNumber() + balanceSaleNumber);
        daySale.setBalanceAmount(daySale.getBalanceAmount() + balanceSaleAmount);
        daySaleRepository.saveAndFlush(daySale);
        logger.info("DaySale {} Updated", daySale.getDate());
        monthSaleService.updateMonthSale(daySale.getMonthSale().getId(), saleAmount, balanceSaleNumber, balanceSaleAmount);
    }

    public void updateDaySale(DaySaleRequest daySaleRequest){
        DaySale daySale = daySaleRepository.findById(daySaleRequest.getId()).orElseThrow(RuntimeException::new);
        logger.info("Updating DaySale with Id: {}", daySale.getId());
        daySale.update(daySaleRequest);
        daySaleRepository.saveAndFlush(daySale);
    }

    public void updateDaySaleFromSales(DaySale daySale, double salePrice, PaymentStatus paymentStatus) {
        daySale.update(daySale.getDaySaleAmount() + salePrice,
                daySale.getNumberOfSales() + 1,
                paymentStatus == PaymentStatus.BALANCE ? daySale.getBalanceSalesNumber() + 1 : daySale.getBalanceSalesNumber(),
                paymentStatus == PaymentStatus.BALANCE ? daySale.getBalanceAmount() + salePrice : daySale.getBalanceAmount());
        logger.info("Updating DaySale from Sale Creation with Id {} and PaymentStatus {}", daySale.getId(), paymentStatus);
        daySaleRepository.saveAndFlush(daySale);
        MonthSale monthSale = monthSaleRepository.findById(daySale.getMonthSale().getId())
                .orElseThrow(RuntimeException::new);
        logger.info("Found MonthSale with Id: {}", monthSale.getId());
        if (monthSale != null && monthSale.getMonth() == daySale.getCreatedDate().getMonth() && monthSale.getYear() == daySale.getCreatedDate().getYear()) {
            monthSaleService.updateMonthSaleFormDaySale(monthSale, salePrice, paymentStatus);
        }
    }

    public void updatePaymentStatus(DaySale daySale, double salePrice){
        daySale.setBalanceSalesNumber(daySale.getBalanceSalesNumber() - 1);
        daySale.setBalanceAmount(daySale.getBalanceAmount() - salePrice);
        logger.info("Updating DaySale from Sale Update with Id {} and paymentStatus {}", daySale.getId(), PaymentStatus.BALANCE);
        daySaleRepository.saveAndFlush(daySale);
        MonthSale monthSale = monthSaleRepository.findById(daySale.getMonthSale().getId())
                .orElseThrow(RuntimeException::new);
        logger.info("Found MonthSale with Id: {}", monthSale.getId());
        monthSaleService.updatePaymentStatus(monthSale, salePrice);
    }

    public void updateFromDeleteSale(DaySale daySale, double salePrice, PaymentStatus paymentStatus){
        daySale.update(daySale.getDaySaleAmount() - salePrice,
                daySale.getNumberOfSales() - 1,
                paymentStatus == PaymentStatus.BALANCE ? daySale.getBalanceSalesNumber() - 1 : daySale.getBalanceSalesNumber(),
                paymentStatus == PaymentStatus.BALANCE ? daySale.getDaySaleAmount() - salePrice : daySale.getBalanceAmount());
        logger.info("Updating DaySale from Sale Delete with Id {} and paymentStatus {}", daySale.getId(), paymentStatus);
        daySaleRepository.saveAndFlush(daySale);
        MonthSale monthSale = monthSaleRepository.findById(daySale.getMonthSale().getId())
                .orElseThrow(RuntimeException::new);
        logger.info("Found MonthSale with Id: {}", monthSale.getId());
        monthSaleService.updateFromDeleteSale(monthSale, salePrice, paymentStatus);
    }

    public void deleteDaySale(Long daySaleId){
        DaySale daySale = daySaleRepository.findById(daySaleId).orElseThrow(RuntimeException::new);
        logger.info("Deleting DaySale with Id: {}", daySale.getId());
        daySaleRepository.delete(daySale);
    }
}
