package com.finance.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String type; // INCOME / EXPENSE

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;

    public Transaction() {}

    public Transaction(Long id, LocalDate date, Double amount, String category, String type, String description, User creator) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.description = description;
        this.creator = creator;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }
}
