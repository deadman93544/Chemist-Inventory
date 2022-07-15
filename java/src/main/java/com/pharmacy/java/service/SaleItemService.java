package com.pharmacy.java.service;

import com.pharmacy.java.entity.Item;
import com.pharmacy.java.entity.Sale;
import com.pharmacy.java.entity.SaleItem;
import com.pharmacy.java.jpa.ItemRepository;
import com.pharmacy.java.jpa.SaleItemRepository;
import com.pharmacy.java.jpa.SaleRepository;
import com.pharmacy.java.view.saleItem.SaleItemRequest;
import com.pharmacy.java.view.saleItem.SaleItemResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleItemService {

    public static final Logger logger = LoggerFactory.getLogger(SaleItemService.class);

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private SaleRepository saleRepository;

    public SaleItem createSaleItem(SaleItemRequest saleItemRequest){
        Item item = itemRepository.findById(saleItemRequest.getItemRequest().getId())
                .orElse(itemService.createItem(saleItemRequest.getItemRequest()));
        logger.info("Item found with Id: {} and name: {}", item.getId(), item.getName());

        Sale sale = saleRepository.findById(saleItemRequest.getSaleId()).orElseThrow(RuntimeException::new);
        double saleItemPrice = item.getItemPrice() * saleItemRequest.getQuantity();
        logger.info("Creating SaleItem with SaleId: {}", sale.getId());
        return saleItemRepository.saveAndFlush(new SaleItem(saleItemRequest, sale, item, saleItemPrice));
    }

    public double saveAllSaleItems(List<SaleItemRequest> saleItemRequests){
        logger.info("Saving all SaleItems");
        List<SaleItem> saleItems = saleItemRequests.stream()
                .map(this::createSaleItem).toList();
        return saleItems.parallelStream()
                .reduce(0.0, (saleItem1, saleItem2) -> saleItem1 + saleItem2.getSaleItemPrice(), Double::sum);
    }

    public List<SaleItemResponse> getAllSaleItems(){
        logger.info("Returning a list of All Sale Items");
        return saleItemRepository.findAll()
                .stream().map(SaleItemResponse::new)
                .collect(Collectors.toList());
    }

    public SaleItemResponse getSaleItemById(Long saleItemId){
        logger.info("Finding a Sale Item with Id: {}", saleItemId);
        return saleItemRepository.findById(saleItemId)
                .map(SaleItemResponse::new)
                .orElseThrow(RuntimeException::new);
    }

    public double updateSaleItem(SaleItemRequest saleItemRequest){
        SaleItem saleItem = saleItemRepository.findById(saleItemRequest.getId()).orElseThrow(RuntimeException::new);
        Item item = itemRepository.findById(saleItemRequest.getItemRequest().getId())
                .orElse(itemRepository.saveAndFlush(new Item(saleItemRequest.getItemRequest())));
        Sale sale = saleRepository.findById(saleItemRequest.getSaleId()).orElseThrow(RuntimeException::new);
        double saleItemPrice = item.getItemPrice() * saleItemRequest.getQuantity();
        sale.updateSalePrice(sale.getSalePrice() == 0 ? + saleItemPrice : - saleItem.getSaleItemPrice() + saleItemPrice);
        saleRepository.saveAndFlush(sale);
        saleItem.update(saleItemRequest, sale, item, saleItemPrice);
        return saleItemRepository.saveAndFlush(saleItem).getSaleItemPrice();
    }

    public void deleteSaleItem(Long saleItemId){
        SaleItem saleItem = saleItemRepository.findById(saleItemId).orElseThrow(RuntimeException::new);
        Sale sale = saleRepository.findById(saleItem.getSale().getId()).orElseThrow(RuntimeException::new);
        sale.updateSalePrice(sale.getSalePrice() - saleItem.getSaleItemPrice());
        saleItemRepository.delete(saleItem);
        saleRepository.saveAndFlush(sale);
    }
}
