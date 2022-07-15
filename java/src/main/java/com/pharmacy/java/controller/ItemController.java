package com.pharmacy.java.controller;

import com.pharmacy.java.service.ItemService;
import com.pharmacy.java.view.item.ItemRequest;
import com.pharmacy.java.view.item.ItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

//    @GetMapping
//    public String getHome(){
//        return "Hello";
//    }

    @PostMapping
    public void createItem(@RequestBody ItemRequest itemRequest){
        itemService.createItem(itemRequest);
    }

    @GetMapping("/list")
    public List<ItemResponse> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping
    public ItemResponse getItem(@RequestParam Long ItemId){
        return itemService.getItemById(ItemId);
    }

    @PutMapping
    public void updateItem(@RequestBody ItemRequest itemRequest){
        itemService.updateItem(itemRequest);
    }

    @DeleteMapping
    public void deleteItem(@RequestParam Long ItemId){
        itemService.deleteItem(ItemId);
    }

}
