package com.ran.trello.Controller;

import com.ran.trello.Model.Entity.TaskCard;
import com.ran.trello.Service.TaskCardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskCardController {
    private TaskCardService taskCardService;

    public TaskCardController(TaskCardService taskCardService) {
        this.taskCardService = taskCardService;
    }
    @GetMapping
    public List<TaskCard> getItems()
    {
        return taskCardService.findAllTasks();
    }
    @GetMapping("/{id}")
    public Optional<TaskCard> getItemById(@PathVariable Integer id)
    {
        return taskCardService.findTaskById(id);
    }
    @PostMapping
    public TaskCard newItem(@RequestBody TaskCard body)
    {
        return taskCardService.createTaskCard(body);
    }
    @PutMapping("/{id}")
    public TaskCard updateItem(@PathVariable Integer id, @RequestBody TaskCard body)
    {
        return taskCardService.updateTaskCard(id, body);
    }
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Integer id)
    {
        taskCardService.deleteTaskCard(id);
    }
}
