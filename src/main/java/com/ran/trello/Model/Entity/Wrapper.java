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
public class Wrapper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private Integer position;
    @ManyToMany
    @JoinTable(name = "wrapper_cards",
            joinColumns = @JoinColumn(name = "wrapper_id"),
            inverseJoinColumns = @JoinColumn(name = "card_id"))
    private List<TaskCard> cards = new ArrayList<>();
    private Integer projectId;

    public Wrapper(String title, Integer position, List<TaskCard> cards, Integer projectId) {
        this.title = title;
        this.position = position;
        this.cards = cards;
        this.projectId = projectId;
    }

    public void addCard(TaskCard taskCard) {
        this.cards.add(taskCard);
    }

    public void removeCard(TaskCard taskCard) {
        this.cards.remove(taskCard);
    }
}
