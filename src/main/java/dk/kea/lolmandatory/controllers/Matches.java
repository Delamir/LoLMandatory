package dk.kea.lolmandatory.controllers;


import dk.kea.lolmandatory.models.Match;
import dk.kea.lolmandatory.repositories.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Matches {

    @Autowired
    MatchRepository matches;

    @GetMapping("/matches")
    public Iterable<Match> getChampions() {
        return matches.findAll();
    }

    @GetMapping("/matches/{id}")
    public Match getChampion(@PathVariable Long id) {
        return matches.findById(id).get();
    }

    @PostMapping("/matches")
    public Match createChampion(@RequestBody Match match) {
        match.setMatch_id(null);
        return matches.save(match);
    }

    @PutMapping("/matches/{id}")
    public void putChampion(@PathVariable Long id, @RequestBody Match match) {
        try {
            match.setMatch_id(id);
            matches.save(match);
        } catch (Exception e) {
            System.out.println("Match does not exist");
        }
    }

    @PatchMapping("/matches/{id}")
    public void patchChampion(@PathVariable Long id, @RequestBody Match match) {
        try {
            matches.findById(id).map(existingMatch -> {
                if (match.getMatch_length() != 0) existingMatch.setMatch_length(existingMatch.getMatch_length());
                if (match.getWinner() != null) existingMatch.setWinner(existingMatch.getWinner());
                if (match.getTowers_destroyed() != 0) existingMatch.setTowers_destroyed(existingMatch.getTowers_destroyed());
                if (match.getTeam_blue_kills() != 0) existingMatch.setTeam_blue_kills(existingMatch.getTeam_blue_kills());
                if (match.getTeam_red_kills() != 0) existingMatch.setTeam_red_kills(existingMatch.getTeam_red_kills());
                if (match.getTeam_blue_gold() != 0) existingMatch.setTeam_blue_gold(existingMatch.getTeam_blue_gold());
                if (match.getTeam_red_gold() != 0) existingMatch.setTeam_red_gold(existingMatch.getTeam_red_gold());

                matches.save(existingMatch);
                return "Match updated";
            });
        } catch (Exception e) {
            System.out.println("No match found");
        }
    }

    @DeleteMapping("/matches/{id}")
    public void deleteChampion(@PathVariable Long id) {
        matches.deleteById(id);
    }
}
