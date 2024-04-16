package com.ran.trello.Service;

import com.ran.trello.Model.DTO.WrapperDTO;
import com.ran.trello.Model.Entity.Wrapper;
import com.ran.trello.Model.Repository.WrapperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WrapperService {

    private final WrapperRepository wrapperRepository;

    @Autowired
    public WrapperService(WrapperRepository wrapperRepository) {
        this.wrapperRepository = wrapperRepository;
    }

    public WrapperDTO createWrapper(WrapperDTO wrapperDTO) {
        Wrapper wrapper = new Wrapper();
        wrapper.setTitle(wrapperDTO.getTitle());
        wrapper.setProjectId(wrapperDTO.getProjectId());
        Wrapper savedWrapper = wrapperRepository.save(wrapper);
        return convertToDTO(savedWrapper);
    }

    public Wrapper getWrapperById(Integer id) {
        return wrapperRepository.findById(id).orElseThrow(() -> new RuntimeException("Wrapper not found"));
    }

    public List<WrapperDTO> getAllWrappers() {
        List<Wrapper> wrappers = wrapperRepository.findAll();
        return wrappers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public WrapperDTO updateWrapper(Integer id, Wrapper wrapper) {
        Wrapper existingWrapper = wrapperRepository.findById(id).orElseThrow(() -> new RuntimeException("Wrapper not found"));
        existingWrapper.setTitle(wrapper.getTitle());
        existingWrapper.setPosition(wrapper.getPosition());
        existingWrapper.setCards(wrapper.getCards());
        Wrapper updatedWrapper = wrapperRepository.save(existingWrapper);
        return convertToDTO(updatedWrapper);
    }

    public void deleteWrapper(Integer id) {
        wrapperRepository.deleteById(id);
    }

    private WrapperDTO convertToDTO(Wrapper wrapper) {
        WrapperDTO dto = new WrapperDTO();
        dto.setId(wrapper.getId());
        dto.setTitle(wrapper.getTitle());
        dto.setProjectId(wrapper.getProjectId());
        dto.setCardsIds(wrapper.getCards().stream().map(card -> card.getId()).collect(Collectors.toList()));
        return dto;
    }

    private List<Wrapper> getWrappersByProjectId(Integer id) {
        return wrapperRepository.findAll().stream().filter(wrapper -> wrapper.getProjectId().equals(id)).toList();
    }
}
