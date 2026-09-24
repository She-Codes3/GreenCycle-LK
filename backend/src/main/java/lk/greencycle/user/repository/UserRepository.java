package lk.greencycle.user.repository;

import lk.greencycle.common.enums.RoleName;
import lk.greencycle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNic(String nic);
    boolean existsByEmail(String email);
    boolean existsByNic(String nic);
    List<User> findByRoleName(RoleName roleName);
}
