package dk.kea.lolmandatory.controllers;

import dk.kea.lolmandatory.models.Champion;
import dk.kea.lolmandatory.repositories.ChampionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Champions {

    @Autowired
    ChampionRepository champions;

    @GetMapping("/champions")
    public Iterable<Champion> getChampions() {
        return champions.findAll();
    }

    @GetMapping("/champions/{id}")
    public Champion getChampion(@PathVariable Long id) {
        return champions.findById(id).get();
    }

    @PostMapping("/champions")
    public Champion createChampion(@RequestBody Champion champion) {
        champion.setId(null);
        return champions.save(champion);
    }

    @PutMapping("/champions/{id}")
    public void putChampion(@PathVariable Long id, @RequestBody Champion champion) {
        try {
            champion.setId(id);
            champions.save(champion);
        } catch (Exception e) {
            System.out.println("Champion does not exist");
        }
    }

    @PatchMapping("/champions/{id}")
    public void patchChampion(@PathVariable Long id, @RequestBody Champion champion) {

        try {
            champions.findById(id).map(existingChampion -> {
                if (champion.getName() != null) {
                    existingChampion.setName(champion.getName());
                }
                champions.save(existingChampion);
                return "Champion updated";
            });
        } catch (Exception e){
            System.out.println("No champion found");
        }
    }

    @DeleteMapping("/champions/{id}")
    public void deleteChampion(@PathVariable Long id) {
        champions.deleteById(id);
    }
}
