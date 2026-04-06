package com.finance.backend;

import com.finance.backend.model.Transaction;
import com.finance.backend.model.User;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Create Users
            User admin = new User(null, "admin", passwordEncoder.encode("admin123"), User.Role.ADMIN, "ACTIVE");
            User analyst = new User(null, "analyst", passwordEncoder.encode("analyst123"), User.Role.ANALYST, "ACTIVE");
            User viewer = new User(null, "viewer", passwordEncoder.encode("viewer123"), User.Role.VIEWER, "ACTIVE");
            
            userRepository.saveAll(java.util.List.of(admin, analyst, viewer));

            // Create Sample Transactions
            Transaction t1 = new Transaction(null, LocalDate.now().minusDays(2), 5000.0, "Salary", "INCOME", "Monthly salary check", admin);
            Transaction t2 = new Transaction(null, LocalDate.now().minusDays(1), 120.50, "Food", "EXPENSE", "Lunch with team", analyst);
            Transaction t3 = new Transaction(null, LocalDate.now(), 45.00, "Transport", "EXPENSE", "Uber to office", analyst);
            
            transactionRepository.saveAll(java.util.List.of(t1, t2, t3));
            
            System.out.println("✅ Test data initialized successfully!");
        }
    }
}
