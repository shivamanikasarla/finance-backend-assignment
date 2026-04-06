package com.finance.backend.controller;

import com.finance.backend.model.Transaction;
import com.finance.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> filterTransactions(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type) {
        return transactionRepository.filter(startDate, endDate, category, type);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYST')")
    public Transaction createTransaction(@RequestBody @org.springframework.lang.NonNull Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYST')")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable @org.springframework.lang.NonNull Long id, @RequestBody @org.springframework.lang.NonNull Transaction details) {
        return transactionRepository.findById(id).map(t -> {
            t.setDate(details.getDate());
            t.setAmount(details.getAmount());
            t.setCategory(details.getCategory());
            t.setType(details.getType());
            t.setDescription(details.getDescription());
            return ResponseEntity.ok(transactionRepository.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteTransaction(@PathVariable @org.springframework.lang.NonNull Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
