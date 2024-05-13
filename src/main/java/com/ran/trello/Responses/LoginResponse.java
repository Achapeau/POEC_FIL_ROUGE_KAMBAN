package com.ran.trello.Responses;

import com.ran.trello.Model.DTO.UserDTO;

public class LoginResponse {
    private String token;
    private UserDTO customer;
    private long expiresIn;

    private String getToken() {
        return token;
    }

    private LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    private UserDTO getUser() {
        return customer;
    }



    private LoginResponse setUser(UserDTO user) {
        this.customer = user;
        return this;
    }

    private long getExpiresIn() {
        return expiresIn;
    }

    private LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", user=" + customer +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
