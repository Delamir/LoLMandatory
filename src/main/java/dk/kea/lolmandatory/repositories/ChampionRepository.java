package dk.kea.lolmandatory.repositories;

import dk.kea.lolmandatory.models.Champion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChampionRepository extends JpaRepository<Champion, Long> {
}
