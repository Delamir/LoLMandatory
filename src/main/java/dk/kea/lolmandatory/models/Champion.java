package dk.kea.lolmandatory.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

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
    @OneToMany(mappedBy = "favouriteChampion", fetch = FetchType.LAZY)
    private List<Summoner> summoners;
}
