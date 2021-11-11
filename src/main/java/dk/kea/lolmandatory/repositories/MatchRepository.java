package dk.kea.lolmandatory.repositories;

import dk.kea.lolmandatory.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
