package dk.kea.lolmandatory.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Table(name="matches")
@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long match_id;

    @Column
    private int match_length;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Team winner;

    @Column
    private int towers_destroyed;

    @Column
    private int team_blue_kills;

    @Column
    private int team_red_kills;

    @Column
    private int team_blue_gold;

    @Column
    private int team_red_gold;

    @JsonIgnore
    @ManyToMany(mappedBy = "matches", fetch = FetchType.LAZY)
    private List<Summoner> summoners;
}
