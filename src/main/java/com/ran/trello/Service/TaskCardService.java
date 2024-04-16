package com.ran.trello.Service;

import com.ran.trello.Model.Entity.TaskCard;
import com.ran.trello.Model.Repository.TaskCardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskCardService {
    private TaskCardRepository taskCardRepository;

    public TaskCardService(TaskCardRepository taskCardRepository) {
        this.taskCardRepository = taskCardRepository;
    }

    public TaskCard createTaskCard(TaskCard taskCard) {
        return taskCardRepository.save(taskCard);
    }

    public List<TaskCard> findAllTasks() {
        return taskCardRepository.findAll();
    }

    public Optional<TaskCard> findTaskById(Integer id) {
        return taskCardRepository.findById(id);
    }

    public TaskCard updateTaskCard(Integer id, TaskCard body) {
        TaskCard taskCard = taskCardRepository.findById(id).get();
        taskCard.setTitle(body.getTitle());
        taskCard.setDescription(body.getDescription());
        taskCard.setPosition(body.getPosition());
        taskCard.setStatus(body.getStatus());
        return taskCardRepository.save(taskCard);
    }

    public void deleteTaskCard(Integer id) {
        taskCardRepository.deleteById(id);
    }
}
