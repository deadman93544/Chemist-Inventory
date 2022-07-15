package com.pharmacy.java.controller;

import com.pharmacy.java.entity.SaleItem;
import com.pharmacy.java.service.SaleItemService;
import com.pharmacy.java.view.saleItem.SaleItemRequest;
import com.pharmacy.java.view.saleItem.SaleItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saleItem")
public class SaleItemController {

    @Autowired
    private SaleItemService saleItemService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public void createSaleItem(@RequestBody SaleItemRequest saleItemRequest){
        saleItemService.createSaleItem(saleItemRequest);
    }

    @GetMapping
    public SaleItemResponse getSaleItem(@RequestParam Long saleItemId){
        return saleItemService.getSaleItemById(saleItemId);
    }

    @GetMapping("/list")
    public List<SaleItemResponse> getAllSaleItem(){
        return saleItemService.getAllSaleItems();
    }

    @PutMapping
    public void updateSaleItem(@RequestBody SaleItemRequest saleItemRequest){
        saleItemService.updateSaleItem(saleItemRequest);
    }

    @DeleteMapping
    public void deleteSaleItem(@RequestParam Long aaleItemId){
        saleItemService.deleteSaleItem(aaleItemId);
    }
}
