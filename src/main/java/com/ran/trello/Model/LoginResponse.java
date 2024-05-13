package com.ran.trello.Model;

import com.ran.trello.Model.DTO.UserDTO;

public class LoginResponse {
    private String token;
    private UserDTO customer;
    private long expiresIn;

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public UserDTO getCustomer() {
        return customer;
    }

    public LoginResponse setCustomer(UserDTO user) {
        this.customer = user;
        this.customer.setPassword("*******");
        return this;
    }
}
