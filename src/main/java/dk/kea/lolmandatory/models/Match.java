package dk.kea.lolmandatory.models;


import lombok.Data;
import org.springframework.lang.Nullable;
import javax.persistence.*;


@Data
@Table(name = "matches")
@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column
    private int match_length;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Team winner;

    @Column
    private int towers_destroyed;

    @Column
    private int kills;

    @Column
    private int gold;

    @ManyToOne
    @JoinColumn(name = "summoner_id")
    @Nullable
    private Summoner summoner;
}
