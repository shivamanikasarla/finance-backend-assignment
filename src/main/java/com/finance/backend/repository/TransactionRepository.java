package com.finance.backend.repository;

import com.finance.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    @Query("SELECT t FROM Transaction t WHERE (:startDate IS NULL OR t.date >= :startDate) " +
           "AND (:endDate IS NULL OR t.date <= :endDate) " +
           "AND (:category IS NULL OR t.category = :category) " +
           "AND (:type IS NULL OR t.type = :type)")
    List<Transaction> filter(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("category") String category,
        @Param("type") String type
    );
}
