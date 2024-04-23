package com.ran.trello.Service;

import com.ran.trello.Model.DTO.LogDTO;
import com.ran.trello.Model.DTO.RegisterUserDTO;
import com.ran.trello.Model.Entity.UserP;
import com.ran.trello.Model.Repository.UserPRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserPRepository userPRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserPRepository userPRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userPRepository = userPRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

   public UserP signup(RegisterUserDTO input) {
       UserP userP = new UserP();
               userP.setFirstname(input.getFirstname());
               userP.setEmail(input.getEmail());
               userP.setPassword(passwordEncoder.encode(input.getPassword()));

               return userPRepository.save(userP);
   }

   public UserP authenticate(LogDTO input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );
        return userPRepository.findByEmail(input.getEmail()).orElseThrow();
   }
}
