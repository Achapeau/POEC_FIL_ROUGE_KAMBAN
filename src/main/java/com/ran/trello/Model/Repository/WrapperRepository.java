package com.ran.trello.Model.Repository;

import com.ran.trello.Model.Entity.Wrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WrapperRepository extends JpaRepository<Wrapper, Integer> {
    Wrapper findByProjectId(Integer id);
}
