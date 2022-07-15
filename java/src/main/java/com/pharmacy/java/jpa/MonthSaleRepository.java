package com.pharmacy.java.jpa;

import com.pharmacy.java.entity.MonthSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthSaleRepository extends JpaRepository<MonthSale, Long> {
    MonthSale findTopByOrderByCreatedDateDesc();
}
