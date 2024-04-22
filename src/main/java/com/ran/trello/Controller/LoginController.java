package com.ran.trello.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @GetMapping("user")
    public String user() {
        return "Welcome User";
    }

    @GetMapping("admin")
    public String admin() {
        return "Welcome Admin";
    }
}
