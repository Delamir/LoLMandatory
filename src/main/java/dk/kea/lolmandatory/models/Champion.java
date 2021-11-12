package dk.kea.lolmandatory.models;

import lombok.Data;
import javax.persistence.*;

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
}
