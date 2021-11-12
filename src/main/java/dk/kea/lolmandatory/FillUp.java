package dk.kea.lolmandatory;

import dk.kea.lolmandatory.repositories.ChampionRepository;
import dk.kea.lolmandatory.repositories.SummonerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class FillUp {

    @Autowired
    SummonerRepository summoners;

    @Autowired
    ChampionRepository champions;


}
