package dk.kea.lolmandatory.models;

import lombok.Data;
import org.springframework.lang.Nullable;
import javax.persistence.*;
import java.util.List;

@Data
@Table(name="summoners")
@Entity
public class Summoner {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long summoner_id;

    @Column
    private String summoner_name;

    @Column
    private int wins;

    @Column
    private int losses;

    @Column
    private SummonerType summoner_type;

    @OneToOne
    @JoinColumn(name = "champion_id")
    @Nullable
    private Champion favourite_champion;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(name = "summoners_matches",
            joinColumns = {
            @JoinColumn(name = "summoner_id", referencedColumnName = "summoner_id")
    },
            inverseJoinColumns = {
            @JoinColumn(name = "match_id", referencedColumnName = "match_id")
            }
    )
    private List<Match> matches;

    @Column(length = 500)
    private String note;
}
