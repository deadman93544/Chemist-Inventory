package com.pharmacy.java.entity;

import com.pharmacy.java.InventoryApplication;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity extends LazyAuditable<String, Long> {

    @PrePersist
    private void preCreate() {
        this.setCreatedDate(LocalDateTime.now());
        this.setCreatedBy("Admin");
    }

    @PreUpdate
    private void preUpdate() {
        this.setLastModifiedDate(LocalDateTime.now());
        this.setLastModifiedBy("Admin");
    }


    public void setId(Long Id) {
        super.setId(Id);
    }
}
