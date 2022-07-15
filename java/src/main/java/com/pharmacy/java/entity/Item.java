package com.pharmacy.java.entity;

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

//    private long quantity;

    private double itemPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Item(ItemRequest itemRequest){
//        this.id = itemRequest.getId();
        this.name = itemRequest.getName();
        this.itemPrice = itemRequest.getItemPrice();
    }

    @Transient
    public void update(ItemRequest itemRequest){
        this.name = itemRequest.getName();
        this.itemPrice = itemRequest.getItemPrice();
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
