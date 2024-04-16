package com.ran.trello.Controller;

import com.ran.trello.Model.DTO.LogDTO;
import com.ran.trello.Model.DTO.UserDTO;
import com.ran.trello.Service.UserPService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserPController {
    private UserPService userPService;

    public UserPController(UserPService userPService) {
        this.userPService = userPService;
    }
    @GetMapping
    public List<UserDTO> getAllUsers()
    {
        return userPService.findAllUsers();
    }
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Integer id)
    {
        return userPService.findUserById(id);
    }
    @PostMapping("/register")
    public UserDTO register(@RequestBody UserDTO body)
    {
        return userPService.addUser(body);
    }
    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Integer id, @RequestBody UserDTO body)
    {
        return userPService.updateUser(id, body);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userPService.deleteUser(id);
    }
    @PostMapping("/login")
    public UserDTO loginUser(@RequestBody LogDTO body) {
        return userPService.loginUser(body);
    }
}
