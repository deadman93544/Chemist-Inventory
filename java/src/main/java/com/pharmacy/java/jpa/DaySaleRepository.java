package com.pharmacy.java.jpa;

import com.pharmacy.java.entity.DaySale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DaySaleRepository extends JpaRepository<DaySale, Long> {

    DaySale findTopByOrderByCreatedDateDesc();
}
