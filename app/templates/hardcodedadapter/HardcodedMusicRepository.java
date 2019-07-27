package <%=group%>.infra;

import <%=group%>.domain.port.MusicRepository;
import <%=group%>.domain.model.MusicDto;
import <%=group%>.domain.port.MusicRepository;

import java.util.Arrays;
import java.util.List;

public class HardcodedMusicRepository implements MusicRepository {
  public List<MusicDto> getListOfMusic() {
    return Arrays.asList(new MusicDto("I'll stop wearing black when they make a darker color", "wilson", 4.5),
            new MusicDto("Cardi B, straight stuntin', can't tell me nothin', Bossed up and I changed the game", "Bruno Mars", 4.2),
            new MusicDto("Whenever you feel like letting go and you’ve got your back against the wall. Hold on, just hold on, cause you’re gonna take a few low blows", "Skepta", 4.2),
            new MusicDto("You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime you better", "Eminem", 4.5),
            new MusicDto("If at first you don’t succeed (first you don’t succeed) / Dust yourself off, and try again", "Aaliyah", 4.5));
  }
}
