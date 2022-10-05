package com.pharmacy.java.controller;

import com.pharmacy.java.service.MonthSaleService;
import com.pharmacy.java.view.monthSale.MonthSaleRequest;
import com.pharmacy.java.view.monthSale.MonthSaleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monthSale")
public class MonthSaleController {

    @Autowired
    private MonthSaleService monthSaleService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public void createMonthSale(@RequestBody MonthSaleRequest monthSaleRequest){
        monthSaleService.createMonthSale(monthSaleRequest);
    }

    @GetMapping
    public MonthSaleResponse getMonthSale(@RequestParam Long monthSaleId){
        return monthSaleService.getMonthSaleById(monthSaleId);
    }

    @GetMapping("/current")
    public MonthSaleResponse getCurrentMonthSale(){
        return new MonthSaleResponse(monthSaleService.getTopMonthSale());
    }

    @GetMapping("/")
    public List<MonthSaleResponse> getAllMonthSales(){
        return monthSaleService.getAllMonthSales();
    }

    @PutMapping
    public void updateMonthSale(@RequestBody MonthSaleRequest monthSaleRequest){
        monthSaleService.updateMonthSale(monthSaleRequest);
    }

    @DeleteMapping
    public void deleteMonthSale(@RequestParam Long monthSaleId){
        monthSaleService.deleteMonthSale(monthSaleId);
    }
}
