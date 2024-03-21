package com.ran.trello.Service;

import com.ran.trello.Model.DTO.LogDTO;
import com.ran.trello.Model.DTO.UserDTO;
import com.ran.trello.Model.Entity.UserP;
import com.ran.trello.Model.Repository.UserPRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPService {
    private UserPRepository userPRepository;

    public UserPService(UserPRepository userPRepository) {
        this.userPRepository = userPRepository;
    }
    public List<UserDTO> findAllUsers() {
        return userPRepository.findAll().stream().map(userP -> convertToUserDTO(userP)).toList();
    }

    public UserDTO loginUser(LogDTO body) throws Exception {
        return userPRepository.findAll().stream().map(userP -> {
            if (userP.getEmail().equals(body.getEmail()) && userP.getPassword().equals(body.getPassword())) {
                return convertToUserDTO(userP);
            }
            return null;
        }).findFirst().orElse(null);
    }
    public UserDTO convertToUserDTO(UserP userP) {
        return new UserDTO(userP.getId(), userP.getEmail(), userP.getFirstname(), userP.getLastname(), userP.getProjects().stream().map(project -> project.getId()).toList() );
    }
    public UserP convertToUserP(UserDTO userDTO) {
        UserP userP = new UserP();
        userP.setId(userDTO.getId());
        userP.setEmail(userDTO.getEmail());
        userP.setFirstname(userDTO.getFirstname());
        userP.setLastname(userDTO.getLastname());
        return userP;
    }

    public UserDTO findUserById(Integer id) {
        return convertToUserDTO(userPRepository.findById(id).get());
    }

    public UserDTO addUser(UserDTO body) {
        return convertToUserDTO(userPRepository.save(convertToUserP(body)));
    }

    public UserDTO updateUser(Integer id, UserDTO body) {
        UserP userP = userPRepository.findById(id).get();
        userP.setEmail(body.getEmail());
        userP.setFirstname(body.getFirstname());
        userP.setLastname(body.getLastname());
        return convertToUserDTO(userPRepository.save(userP));
    }

    public void deleteUser(Integer id) {
        userPRepository.deleteById(id);
    }
}
