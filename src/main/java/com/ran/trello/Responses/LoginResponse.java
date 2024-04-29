package com.ran.trello.Responses;

public class LoginResponse {
    private String token;

    private long expiresIn;

    private String getToken() {
        return token;
    }

    private LoginResponse setToken(String token) {
        this.token = token;
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
                ", expiresIn=" + expiresIn +
                '}';
    }
}
