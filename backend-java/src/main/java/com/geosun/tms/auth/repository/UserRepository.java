package com.geosun.tms.auth.repository;

import com.geosun.tms.auth.domain.user.Role;
import com.geosun.tms.auth.domain.user.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository
    extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {

  Optional<User> findByEmailAndDeletedFalse(String email);

  /**
   * Для login: спочатку активний запис з email, інакше видалений (щоб повернути 403 USER_DELETED).
   */
  Optional<User> findTopByEmailOrderByDeletedAsc(String email);

  boolean existsByEmailAndDeletedFalse(String email);

  @Query(
      """
      select distinct u from User u join u.availableRoles r
      where r = :role and u.active = true and u.deleted = false
      """)
  List<User> findActiveWithAvailableRole(@Param("role") Role role);

  /** @deprecated використовуйте {@link #findActiveWithAvailableRole(Role)} */
  @Deprecated
  default List<User> findByRoleAndActiveTrueAndDeletedFalse(Role role) {
    return findActiveWithAvailableRole(role);
  }

  @Query(
      """
      select count(distinct u) from User u join u.availableRoles r
      where r = :role and u.active = true and u.deleted = false
      """)
  long countActiveWithAvailableRole(@Param("role") Role role);

  /** @deprecated використовуйте {@link #countActiveWithAvailableRole(Role)} */
  @Deprecated
  default long countActiveByRole(Role role) {
    return countActiveWithAvailableRole(role);
  }
}
