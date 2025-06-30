package com.availit.backend.repository;

import com.availit.backend.model.HospitalAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HospitalAvailabilityRepository extends JpaRepository<HospitalAvailability, Long> {
    @Query("SELECT h FROM HospitalAvailability h JOIN h.locations l WHERE LOWER(l.city) = LOWER(:city)")
    List<HospitalAvailability> findByLocationCityIgnoreCase(@Param("city") String city);

    @Query("SELECT DISTINCT l.city FROM HospitalAvailability h JOIN h.locations l WHERE l.city IS NOT NULL")
    List<String> findDistinctCities();
}
