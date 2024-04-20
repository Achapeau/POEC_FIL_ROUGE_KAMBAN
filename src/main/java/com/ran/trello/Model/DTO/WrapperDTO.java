package com.ran.trello.Model.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class WrapperDTO {
    private Integer id;
    private String title;
    private Integer position;
    private List<Integer> cardsIds = new ArrayList<>();
    private Integer projectId;
}
