package com.ran.trello.Controller;

import com.ran.trello.Model.DTO.LogDTO;
import com.ran.trello.Model.DTO.RegisterUserDTO;
import com.ran.trello.Model.DTO.UserDTO;
import com.ran.trello.Model.Entity.UserP;
import com.ran.trello.Model.LoginResponse;
import com.ran.trello.Service.AuthenticationService;
import com.ran.trello.Service.JwtService;
import com.ran.trello.Service.UserPService;
import jakarta.servlet.http.HttpServlet;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserPController extends HttpServlet {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserPService userPService;

    public UserPController(UserPService userPService, JwtService jwtService,
            AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userPService = userPService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers(@RequestHeader HttpHeaders headers) {
        headers.forEach((key, value) -> System.out.println(key + " : " + value));
        return userPService.findAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Integer id) {
        return userPService.findUserById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterUserDTO registerUserDTO) {
        UserP registeredUser = authenticationService.signup(registerUserDTO);
        UserDTO userP = userPService.findByEmail(registerUserDTO.getEmail());
        String jwtToken = jwtService.generateToken(registeredUser);
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setCustomer(userP)
                .setExpiresIn(jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Integer id, @RequestBody UserDTO body) {
        System.out.println();
        return userPService.updateUser(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userPService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LogDTO logDTO) {
        UserP authenticatedUser = authenticationService.authenticate(logDTO);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        UserDTO userP = userPService.findByEmail(logDTO.getEmail());

        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setCustomer(userP)
                .setExpiresIn(jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/email/{email}")
    public UserDTO findByEmail(@PathVariable String email) {
        return userPService.findByEmail(email);
    }

    @GetMapping("/me")
    public ResponseEntity<UserP> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserP currentUser = (UserP) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }
}
