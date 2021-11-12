package dk.kea.lolmandatory.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Data
@Table(name="champions")
@Entity
public class Champion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(length = 20)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "favourite_champion", fetch = FetchType.LAZY)
    private Set<Summoner> summoners;
}
