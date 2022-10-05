package com.pharmacy.java.entity;

import com.pharmacy.java.view.saleItem.SaleItemRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SaleItem{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private String itemName;

    private Long quantity;

    private Long subQuantity;

    private double saleItemPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    private Date expirationDate;

    private String batchNumber;

    public SaleItem(SaleItemRequest saleItemRequest, Sale sale, Item item, double saleItemPrice){
//        this.id = saleItemRequest.getId();
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
        this.subQuantity = saleItemRequest.getSubQuantity();
        this.saleItemPrice = saleItemPrice;
        this.batchNumber = saleItemRequest.getBatchNumber();
    }

    public SaleItem(SaleItemRequest saleItemRequest, Sale sale, Item item){
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
        this.subQuantity = saleItemRequest.getSubQuantity();
        this.saleItemPrice = saleItemRequest.getSaleItemPrice();
        this.itemName = item.getName();
        this.expirationDate = saleItemRequest.getExpirationDate();
        this.batchNumber = saleItemRequest.getBatchNumber();
    }

    public void update(SaleItemRequest saleItemRequest, Sale sale, Item item, double saleItemPrice){
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
        this.subQuantity = saleItemRequest.getSubQuantity();
        this.saleItemPrice = saleItemPrice;
    }

    @PreUpdate
    public void preUpdate(){
        this.setLastModifiedDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }

    @PrePersist
    public void preCreate(){
        this.setCreatedDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    }
}
