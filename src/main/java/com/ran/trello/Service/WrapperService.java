package com.ran.trello.Service;

import com.ran.trello.Model.DTO.WrapperDTO;
import com.ran.trello.Model.Entity.Project;
import com.ran.trello.Model.Entity.Wrapper;
import com.ran.trello.Model.Repository.ProjectRepository;
import com.ran.trello.Model.Repository.TaskCardRepository;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WrapperService {

    private final TaskCardRepository taskCardRepository;
    private final TaskCardService taskCardService;
    private final WrapperRepository wrapperRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public WrapperService(WrapperRepository wrapperRepository, ProjectRepository projectRepository, TaskCardRepository taskCardRepository, TaskCardService taskCardService) {
        this.taskCardRepository = taskCardRepository;
        this.taskCardService = taskCardService;
        this.wrapperRepository = wrapperRepository;
        this.projectRepository = projectRepository;
    }

    public WrapperDTO createWrapper(WrapperDTO wrapperDTO) {
        Wrapper wrapper = new Wrapper();
        wrapper.setTitle(wrapperDTO.getTitle());
        wrapper.setProjectId(wrapperDTO.getProjectId());
        wrapper.setPosition(wrapperDTO.getPosition());
        Wrapper savedWrapper = wrapperRepository.save(wrapper);
        Project project = projectRepository.findById(wrapperDTO.getProjectId()).get();
        project.addWrapper(wrapper);
        projectRepository.save(project);
        return convertToDTO(savedWrapper);
    }

    public WrapperDTO getWrapperById(Integer id) {
        return convertToDTO(wrapperRepository.findById(id).get());
    }

    public List<WrapperDTO> getAllWrappers() {
        List<Wrapper> wrappers = wrapperRepository.findAll();
        return wrappers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public WrapperDTO updateWrapper(Integer id, WrapperDTO wrapperDTO) {
        Wrapper existingWrapper = wrapperRepository.findById(id).get();
        existingWrapper.setTitle(wrapperDTO.getTitle());
        existingWrapper.setPosition(wrapperDTO.getPosition());
        existingWrapper.setCards(wrapperDTO.getCardsIds()
                .stream()
                .map(cardId -> taskCardRepository.findById(cardId).get())
                .collect(Collectors.toList()));
        existingWrapper.getCards().forEach(card -> {
            card.setWrapperId(existingWrapper.getId());
            taskCardRepository.save(card);
        });
        return convertToDTO(wrapperRepository.save(existingWrapper));
    }

    public void deleteWrapper(Integer id) {
        Wrapper wrapper = wrapperRepository.findById(id).get();
        Project project = projectRepository.findById(wrapper.getProjectId()).get();
        wrapper.getCards().forEach(card -> {
            taskCardService.deleteTaskCard(card.getId());
        });
        project.removeWrapper(wrapper);
        projectRepository.save(project);
        wrapperRepository.delete(wrapper);
    }

    private WrapperDTO convertToDTO(Wrapper wrapper) {
        WrapperDTO dto = new WrapperDTO();
        dto.setId(wrapper.getId());
        dto.setTitle(wrapper.getTitle());
        dto.setProjectId(wrapper.getProjectId());
        dto.setPosition(wrapper.getPosition());
        dto.setCardsIds(wrapper.getCards().stream().map(card -> card.getId()).collect(Collectors.toList()));
        return dto;
    }

    private List<Wrapper> getWrappersByProjectId(Integer id) {
        return wrapperRepository.findAll().stream().filter(wrapper -> wrapper.getProjectId().equals(id)).toList();
    }
}
