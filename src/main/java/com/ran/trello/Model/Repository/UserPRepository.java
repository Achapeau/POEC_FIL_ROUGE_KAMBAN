package com.ran.trello.Model.Repository;

import com.ran.trello.Model.Entity.UserP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPRepository extends JpaRepository<UserP, Integer> {
    Optional<UserP> findByEmailAndPassword(String email, String password);

    UserP findByFirstname(String firstname);
}
