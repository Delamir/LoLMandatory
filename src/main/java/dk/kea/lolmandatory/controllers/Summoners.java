package dk.kea.lolmandatory.controllers;


import dk.kea.lolmandatory.models.Summoner;
import dk.kea.lolmandatory.repositories.ChampionRepository;
import dk.kea.lolmandatory.repositories.SummonerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Summoners {

    @Autowired
    SummonerRepository summoners;

    @Autowired
    ChampionRepository champions;

    @GetMapping("/summoners")
    public Iterable<Summoner> getChampions() {
        return summoners.findAll();
    }

    @GetMapping("/summoners/{id}")
    public Summoner getChampion(@PathVariable Long id) {
        return summoners.findById(id).get();
    }

    @PostMapping("/summoners")
    public Summoner createChampion(@RequestBody Summoner summoner) {
        summoner.setId(null);
        return summoners.save(summoner);
    }

    @PutMapping("/summoners/{id}")
    public void putChampion(@PathVariable Long id, @RequestBody Summoner summoner) {
        try {
            summoner.setId(id);
            summoners.save(summoner);
        } catch (Exception e) {
            System.out.println("Summoner does not exist");
        }
    }

    @PatchMapping("/summoners/{id}")
    public void patchChampion(@PathVariable Long id, @RequestBody Summoner summoner) {

        try {
            summoners.findById(id).map(existingSummoner -> {
                if (summoner.getName() != null) existingSummoner.setName(summoner.getName());
                if (summoner.getWins() != -1) existingSummoner.setWins(existingSummoner.getWins());
                if (summoner.getLosses() != -1) existingSummoner.setLosses(existingSummoner.getLosses());
                summoners.save(existingSummoner);
                return "Summoner updated";
            });
        } catch (Exception e){
            System.out.println("No summoner found");
        }
    }

    @DeleteMapping("/summoners/{id}")
    public void deleteChampion(@PathVariable Long id) {
        summoners.deleteById(id);
    }

}
