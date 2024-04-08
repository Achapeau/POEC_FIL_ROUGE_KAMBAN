package com.ran.trello.Service;

import com.ran.trello.Model.Entity.TaskCard;
import com.ran.trello.Model.Entity.Wrapper;
import com.ran.trello.Model.Repository.TaskCardRepository;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.stereotype.Service;

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
            System.out.println("wrapper = " + wrapper);
            TaskCard newTaskCard = new TaskCard();
            System.out.println("title = " + taskCard.getTitle());
            newTaskCard.setTitle(taskCard.getTitle());
            System.out.println("description = " + taskCard.getDescription());
            newTaskCard.setDescription(taskCard.getDescription());
            System.out.println("position = " + taskCard.getPosition());
            newTaskCard.setPosition(taskCard.getPosition());
            System.out.println("status = " + taskCard.getStatus());
            newTaskCard.setWrapperId(taskCard.getWrapperId());
            System.out.println("wrapperId = " + taskCard.getWrapperId());
            newTaskCard.setStatus(taskCard.getStatus());
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
        return taskCardRepository.save(taskCard);
    }

    public void deleteTaskCard(Integer id) {
        taskCardRepository.deleteById(id);
    }
}
