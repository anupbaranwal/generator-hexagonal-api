package <%=group%>.infra.entity;

import lombok.Data;

import javax.persistence.*;

@Table(name = "T_MUSIC")
@Entity
@Data
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "LYRICS")
    private String lyrics;

    @Column(name = "ARTIST_NAME")
    private String artist;

    @Column(name = "RATING")
    private int rating;

}

