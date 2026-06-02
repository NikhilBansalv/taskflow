package com.nikhil.taskmanager.repository;

import com.nikhil.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository; //eliminates the need to write manual sql queries.

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
