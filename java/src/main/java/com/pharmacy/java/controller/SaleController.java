package com.pharmacy.java.controller;

import com.pharmacy.java.service.SaleService;
import com.pharmacy.java.view.sale.SaleRequest;
import com.pharmacy.java.view.sale.SaleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sale")
public class SaleController {

    @Autowired
    private SaleService saleService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public SaleResponse createSale(@RequestBody SaleRequest saleRequest){
        return saleService.createSale(saleRequest);
    }

    @GetMapping
    public SaleResponse getSale(@RequestParam Long saleId){
        return saleService.getSaleById(saleId);
    }

    @GetMapping("/list")
    public List<SaleResponse> getAllSales(){
        return saleService.getAllSales();
    }

    @PutMapping
    public void updateSale(@RequestBody SaleRequest saleRequest){
        saleService.updateSale(saleRequest);
    }

    @DeleteMapping
    public void deleteSale(@RequestParam Long saleId){
        saleService.deleteSale(saleId);
    }
}

