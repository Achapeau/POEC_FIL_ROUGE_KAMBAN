package com.ran.trello.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String icon;
    private List<Integer> projectsIds;
    private String role;
    private String icon;
}
