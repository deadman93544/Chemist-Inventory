package com.pharmacy.java.controller;

import com.pharmacy.java.service.DaySaleService;
import com.pharmacy.java.view.daySale.DaySaleRequest;
import com.pharmacy.java.view.daySale.DaySaleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daySale")
public class DaySaleController {

    @Autowired
    private DaySaleService daySaleService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public void createDaySale(@RequestBody DaySaleRequest daySaleRequest){
        daySaleService.createDaySale(daySaleRequest);
    }

    @GetMapping
    public DaySaleResponse getDaySale(@RequestBody Long daySaleId){
        return daySaleService.getDaySaleById(daySaleId);
    }

    @GetMapping("/list")
    public List<DaySaleResponse> getAllDaySale(){
        return daySaleService.getAllDaySales();
    }

    @PutMapping
    public void updateDaySale(@RequestBody DaySaleRequest daySaleRequest){
        daySaleService.updateDaySale(daySaleRequest);
    }

    @DeleteMapping
    public void deleteDaySale(@RequestParam Long daySaleId){
        daySaleService.deleteDaySale(daySaleId);
    }

}
