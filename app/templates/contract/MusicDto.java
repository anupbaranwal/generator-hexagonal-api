package <%=group%>.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MusicDto {
    private String lyrics;
    private String artist;
    private double rating;
}
