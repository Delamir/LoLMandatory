package dk.kea.lolmandatory.repositories;

import dk.kea.lolmandatory.models.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummonerRepository extends JpaRepository<Summoner, Long> {
}
