package com.ran.trello.Service;

import com.ran.trello.Model.DTO.ProjectDTO;
import com.ran.trello.Model.Entity.Project;
import com.ran.trello.Model.Repository.ProjectRepository;
import com.ran.trello.Model.Repository.UserPRepository;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    private final UserPRepository userPRepository;

    private final WrapperRepository wrapperRepository;
    private final WrapperService wrapperService;

    public ProjectService(ProjectRepository projectRepository, UserPRepository userPRepository, WrapperRepository wrapperRepository, WrapperService wrapperService) {
        this.projectRepository = projectRepository;
        this.userPRepository = userPRepository;
        this.wrapperRepository = wrapperRepository;
        this.wrapperService = wrapperService;
    }



    public ProjectDTO convertToProjectDTO(Project project) {
        return new ProjectDTO(project.getId(), project.getTitle(), project.getDescription(), project.getBackground(), project.getWrappers().stream().map(elem -> elem.getId()).toList(), project.getUsers().stream().map(elem -> elem.getId()).toList());
    }

    public Project convertToProject(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setBackground(projectDTO.getBackground());
        project.setId(projectDTO.getId());
        project.setUsers(userPRepository.findAllById(projectDTO.getUserIds()));
        project.setWrappers(wrapperRepository.findAllById(projectDTO.getWrappersIds()));
        return project;
    }


    public List<ProjectDTO> findAllProjects() {
        return projectRepository.findAll().stream().map(project -> convertToProjectDTO(project)).toList();
    }


    public ProjectDTO findByProjectId(Integer id) {
        return convertToProjectDTO(projectRepository.findById(id).get());
    }

    public List<ProjectDTO> findByTitle(String title) {
        return projectRepository.findByTitle(title).stream().map(project -> convertToProjectDTO(project)).toList();
    }

    public ProjectDTO saveProject(ProjectDTO projectDTO) {
        return convertToProjectDTO(projectRepository.save(convertToProject(projectDTO)));
    }

    public ProjectDTO update(Integer id, ProjectDTO projectDTO) {
        return convertToProjectDTO(projectRepository.save(convertToProject(projectDTO)));
    }

    public void deleteById(Integer id) {
        Project project = projectRepository.findById(id).get();
        project.getWrappers().forEach(wrapper -> {
            wrapperService.deleteWrapper(wrapper.getId());
        });
        project.getUsers().forEach(user -> {
            user.removeProject(project);
            userPRepository.save(user);
        });
        projectRepository.deleteById(id);
    }
}
