package com.ran.trello.Model.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class LogDTO {
    private String email;
    private String password;
    private Integer id;

    @Override
    public String toString() {
        return "LogDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", id=" + id +
                '}';
    }
}
