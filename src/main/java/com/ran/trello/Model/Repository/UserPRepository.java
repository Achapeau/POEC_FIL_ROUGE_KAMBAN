package com.ran.trello.Model.Repository;

import com.ran.trello.Model.DTO.UserDTO;
import com.ran.trello.Model.Entity.UserP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPRepository extends JpaRepository<UserP, Integer> {
    UserDTO loginUser(UserDTO body);
}
