package com.ran.trello.Model.Repository;

import com.ran.trello.Model.Entity.TaskCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskCardRepository extends JpaRepository<TaskCard, Integer> {
}
