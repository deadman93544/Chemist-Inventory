package com.pharmacy.java.entity;

import com.pharmacy.java.enums.ItemType;
import com.pharmacy.java.view.item.ItemRequest;
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
public class Item{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private Long itemDivisions;

    private Long quantity;

    private Long subQuantity;

    private double itemPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Item(ItemRequest itemRequest){
//        this.id = itemRequest.getId();
        this.name = itemRequest.getName();
        this.itemPrice = itemRequest.getItemPrice();
        this.quantity = itemRequest.getQuantity();
        this.subQuantity = itemRequest.getSubQuantity();
        this.itemDivisions = itemRequest.getItemDivisions();
    }

    @Transient
    public void update(ItemRequest itemRequest){
        this.name = itemRequest.getName();
        this.itemPrice = itemRequest.getItemPrice();
        this.quantity = itemRequest.getQuantity();
        this.subQuantity = itemRequest.getSubQuantity();
        this.itemDivisions = itemRequest.getItemDivisions();
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
