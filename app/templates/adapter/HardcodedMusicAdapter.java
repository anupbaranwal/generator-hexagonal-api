package <%=group%>.infra;

import <%=group%>.domain.port.HardcodedAdapter;
import java.util.Arrays;
import java.util.List;

public class HardcodedMusicAdapter implements HardcodedAdapter {

  public List<String> getListOfMusic() {
    return Arrays.asList("I'll stop wearing black when they make a darker color",
        "Cardi B, straight stuntin', can't tell me nothin', Bossed up and I changed the game",
        "Whenever you feel like letting go and you’ve got your back against the wall. Hold on, just hold on, cause you’re gonna take a few low blows",
        "You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime you better",
        "If at first you don’t succeed (first you don’t succeed) / Dust yourself off, and try again");
  }

}
