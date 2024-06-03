package com.ran.trello.Model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class TaskCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private Integer position;
    private Integer wrapperId;
    private String status;
    private Integer assignedTo;
    private Date createdDate;
    private Date dueDate;

    public TaskCard(String title, String description, int position, int wrapperId, String status, Date createdDate) {
        this.title = title;
        this.description = description;
        this.position = position;
        this.wrapperId = wrapperId;
        this.status = status;
        this.createdDate = createdDate;
    }
}
