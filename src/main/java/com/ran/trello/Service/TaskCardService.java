package com.ran.trello.Service;

import com.ran.trello.Model.Entity.TaskCard;
import com.ran.trello.Model.Entity.Wrapper;
import com.ran.trello.Model.Repository.TaskCardRepository;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskCardService {
    private TaskCardRepository taskCardRepository;
    private WrapperRepository wrapperRepository;

    public TaskCardService(TaskCardRepository taskCardRepository, WrapperRepository wrapperRepository) {
        this.taskCardRepository = taskCardRepository;
        this.wrapperRepository = wrapperRepository;
    }

    public TaskCard createTaskCard(TaskCard taskCard) {
        try {
            Wrapper wrapper = this.wrapperRepository.findById(taskCard.getWrapperId()).get();
            TaskCard newTaskCard = new TaskCard();
            newTaskCard.setTitle(taskCard.getTitle());
            newTaskCard.setDescription(taskCard.getDescription());
            newTaskCard.setPosition(taskCard.getPosition());
            newTaskCard.setWrapperId(taskCard.getWrapperId());
            newTaskCard.setStatus(taskCard.getStatus());
            newTaskCard.setAssignedTo(taskCard.getAssignedTo());
            newTaskCard.setCreatedDate(new Date(System.currentTimeMillis()));
            newTaskCard.setDueDate(taskCard.getDueDate());
            newTaskCard = taskCardRepository.save(newTaskCard);
            wrapper.addCard(newTaskCard);
            wrapperRepository.save(wrapper);
            return newTaskCard;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
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
        taskCard.setAssignedTo(body.getAssignedTo());
        taskCard.setCreatedDate(body.getCreatedDate());
        taskCard.setDueDate(body.getDueDate());
        return taskCardRepository.save(taskCard);
    }

    public void deleteTaskCard(Integer id) {
        if (taskCardRepository.findById(id).isPresent()) {
            TaskCard taskCard = taskCardRepository.findById(id).get();
            if (wrapperRepository.findById(taskCard.getWrapperId()).isPresent()) {
                Wrapper wrapper = wrapperRepository.findById(taskCard.getWrapperId()).get();
                wrapper.removeCard(taskCard);
                wrapperRepository.save(wrapper);
                taskCardRepository.delete(taskCard);
            } else {
                System.out.println("Wrapper not found");
                throw new RuntimeException("Wrapper not found");
            }
        } else {
            System.out.println("Task card not found");
            throw new RuntimeException("Task card not found");
        }

    }
}
