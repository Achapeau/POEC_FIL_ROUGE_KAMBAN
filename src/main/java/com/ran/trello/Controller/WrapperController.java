package com.ran.trello.Controller;

import com.ran.trello.Model.DTO.WrapperDTO;
import com.ran.trello.Model.Entity.Wrapper;
import com.ran.trello.Service.WrapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wrapper")
@CrossOrigin("*")
public class WrapperController {

    private final WrapperService wrapperService;

    @Autowired
    public WrapperController(WrapperService wrapperService) {
        this.wrapperService = wrapperService;
    }

    @PostMapping
    public WrapperDTO createWrapper(@RequestBody WrapperDTO wrapperDTO) {
        return wrapperService.createWrapper(wrapperDTO);
    }

    @GetMapping("/{id}")
    public WrapperDTO getWrapperById(@PathVariable Integer id) {
        return wrapperService.getWrapperById(id);
    }

//    @GetMapping("/project/{id}")
//    public List<Wrapper> getWrapperByProjectId(@PathVariable Integer id) {
//        return wrapperService.getWrappersByProjectId(id);
//    }

    @GetMapping
    public List<WrapperDTO> getAllWrappers() {
        return wrapperService.getAllWrappers();
    }

    @PutMapping("/{id}")
    public WrapperDTO updateWrapper(@PathVariable Integer id, @RequestBody WrapperDTO wrapperDTO) {
        return wrapperService.updateWrapper(id, wrapperDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteWrapper(@PathVariable Integer id) {
        wrapperService.deleteWrapper(id);
    }
}
