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
    public ResponseEntity<WrapperDTO> createWrapper(@RequestBody WrapperDTO wrapperDTO) {
        WrapperDTO newWrapper = wrapperService.createWrapper(wrapperDTO);
        return ResponseEntity.ok(newWrapper);
    }

    @GetMapping("/{id}")
    public Wrapper getWrapperById(@PathVariable Integer id) {
        return wrapperService.getWrapperById(id);
    }

//    @GetMapping("/project/{id}")
//    public List<Wrapper> getWrapperByProjectId(@PathVariable Integer id) {
//        return wrapperService.getWrappersByProjectId(id);
//    }

    @GetMapping
    public ResponseEntity<List<WrapperDTO>> getAllWrappers() {
        List<WrapperDTO> wrappers = wrapperService.getAllWrappers();
        return ResponseEntity.ok(wrappers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WrapperDTO> updateWrapper(@PathVariable Integer id, @RequestBody Wrapper wrapper) {
        WrapperDTO updatedWrapper = wrapperService.updateWrapper(id, wrapper);
        return ResponseEntity.ok(updatedWrapper);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWrapper(@PathVariable Integer id) {
        wrapperService.deleteWrapper(id);
        return ResponseEntity.ok().build();
    }
}
