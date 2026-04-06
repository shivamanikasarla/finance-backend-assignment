package com.finance.backend.controller;

import com.finance.backend.model.Transaction;
import com.finance.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        List<Transaction> all = transactionRepository.findAll();
        
        double totalIncome = all.stream().filter(t -> "INCOME".equalsIgnoreCase(t.getType())).mapToDouble(Transaction::getAmount).sum();
        double totalExpense = all.stream().filter(t -> "EXPENSE".equalsIgnoreCase(t.getType())).mapToDouble(Transaction::getAmount).sum();
        
        Map<String, Double> categoryTotals = all.stream()
                .collect(Collectors.groupingBy(Transaction::getCategory, Collectors.summingDouble(Transaction::getAmount)));

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalIncome", totalIncome);
        summary.put("totalExpense", totalExpense);
        summary.put("balance", totalIncome - totalExpense);
        summary.put("categoryWise", categoryTotals);
        summary.put("recordCount", all.size());
        
        return summary;
    }
}
