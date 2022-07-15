package com.pharmacy.java.service;

import com.pharmacy.java.entity.Item;
import com.pharmacy.java.jpa.ItemRepository;
import com.pharmacy.java.view.item.ItemRequest;
import com.pharmacy.java.view.item.ItemResponse;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private static final Logger logger = LoggerFactory.getLogger(ItemService.class);

    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(ItemRequest itemRequest){
        logger.info("Creating a new Item with name: {}", itemRequest.getName());
        return itemRepository.saveAndFlush(new Item(itemRequest));
    }

    public List<ItemResponse> getAllItems(){
        logger.info("Returning a list of all Items");
        return itemRepository.findAll()
                .stream().map(ItemResponse::new)
                .collect(Collectors.toList());
    }

    public ItemResponse getItemById(Long ItemId) {
        logger.info("Finding an Item with Id: {}", ItemId);
        return itemRepository.findById(ItemId)
                .map(ItemResponse::new)
                .orElseThrow(RuntimeException::new);
    }

    public void updateItem(ItemRequest itemRequest){
        Item item = itemRepository.findById(itemRequest.getId()).orElseThrow(RuntimeException::new);
        logger.info("Updating an Item with Id: {}", itemRequest.getId());
        item.update(itemRequest);
        itemRepository.saveAndFlush(item);
    }

    public void deleteItem(Long ItemId){
        Item item = itemRepository.findById(ItemId).orElseThrow(RuntimeException::new);
        logger.info("Deleting an Item with Id: {}", ItemId);
        itemRepository.delete(item);
    }
}
