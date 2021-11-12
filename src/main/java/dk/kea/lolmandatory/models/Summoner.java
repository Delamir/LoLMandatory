package dk.kea.lolmandatory.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;
import javax.persistence.*;
import java.util.Set;

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

    @JsonIgnore
    @OneToMany(mappedBy = "summoner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Match> matches;

    @Column(length = 500)
    private String note;
}
