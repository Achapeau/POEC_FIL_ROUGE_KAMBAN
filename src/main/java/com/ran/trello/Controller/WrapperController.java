package com.ran.trello.Controller;

import com.ran.trello.Model.DTO.WrapperDTO;
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
    public ResponseEntity<WrapperDTO> getWrapperById(@PathVariable Integer id) {
        WrapperDTO wrapper = wrapperService.getWrapperById(id);
        return ResponseEntity.ok(wrapper);
    }

    @GetMapping
    public List<WrapperDTO> getAllWrappers() {
        return wrapperService.getAllWrappers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<WrapperDTO> updateWrapper(@PathVariable Integer id, @RequestBody WrapperDTO wrapperDTO) {
        WrapperDTO updatedWrapper = wrapperService.updateWrapper(id, wrapperDTO);
        return ResponseEntity.ok(updatedWrapper);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWrapper(@PathVariable Integer id) {
        wrapperService.deleteWrapper(id);
        return ResponseEntity.ok().build();
    }
}
