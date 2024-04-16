package com.ran.trello.Model.DTO;

import com.ran.trello.Model.Entity.TaskCard;
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
    private List<Integer> cardsIds = new ArrayList<>();
    private Integer projectId;
}
