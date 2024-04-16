package com.ran.trello.Controller;

import com.ran.trello.Model.DTO.ProjectDTO;
import com.ran.trello.Service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin("*")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDTO> findAll() {
        return projectService.findAllProjects();
    }

    @GetMapping("/{id}")
    public ProjectDTO findById(@PathVariable Integer id) {
        return projectService.findById(id);
    }

    @GetMapping("/{title}")
    public List<ProjectDTO> findByTitle(@PathVariable String title) {
        return projectService.findByTitle(title);
    }

    @PostMapping
    public ProjectDTO save(@RequestBody ProjectDTO project) {
        return projectService.saveProject(project);
    }
    @PutMapping("/{id}")
    public ProjectDTO update(@PathVariable Integer id, @RequestBody ProjectDTO project) {
        return projectService.update(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        projectService.deleteById(id);
    }
}
