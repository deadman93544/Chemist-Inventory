package com.pharmacy.java.enums;

public enum PaymentStatus {
    BALANCE, // for the customers who pay later
    PAID, // for the sale whose payment is completed
    LENT // for the customer who has some money left.
}
