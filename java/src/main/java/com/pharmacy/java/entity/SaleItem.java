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

    private double quantity;

    private double saleItemPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public SaleItem(SaleItemRequest saleItemRequest, Sale sale, Item item, double saleItemPrice){
//        this.id = saleItemRequest.getId();
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
        this.saleItemPrice = saleItemPrice;
    }

    public SaleItem(SaleItemRequest saleItemRequest, Sale sale, Item item){
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
        this.saleItemPrice = saleItemRequest.getSaleItemPrice();
        this.itemName = item.getName();
    }

    public void update(SaleItemRequest saleItemRequest, Sale sale, Item item, double saleItemPrice){
        this.sale = sale;
        this.item = item;
        this.quantity = saleItemRequest.getQuantity();
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
