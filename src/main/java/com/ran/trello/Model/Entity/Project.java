package com.ran.trello.Model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String background;
    @OneToMany
    @JoinTable(name = "wrapper_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "wrapper_id"))
    private List<Wrapper> wrappers = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "project_users",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "userP_id"))
    private List<UserP> users;

    public Project(String title, String description, String background, List<Wrapper> wrappers, List<UserP> users) {
        this.title = title;
        this.description = description;
        this.background = background;
        this.wrappers = wrappers;
        this.users = users;
    }

    public void addWrapper(Wrapper wrapper) {
        this.wrappers.add(wrapper);
    }

    public void addUser(UserP user) {
        this.users.add(user);
    }
}
