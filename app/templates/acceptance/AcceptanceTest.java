package <%=group%>;

import <%=group%>.domain.MusicReaderService;
import <%=group%>.domain.model.MusicDto;
import <%=group%>.domain.port.MusicReader;
import <%=group%>.domain.port.MusicRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class AcceptanceTest {

  @Mock
  private MusicRepository musicRepository;

  private MusicReader musicReader;

  @Before
  public void setUp() {
    musicReader = new MusicReaderService(musicRepository);
  }

  @Test
  public void shouldReturnAListOfMusicWhenRequested() {
    List<MusicDto> expectedListOfMusic = Arrays.asList(new MusicDto("I'll stop wearing black when they make a darker color", "wilson", 4.5),
            new MusicDto("Cardi B, straight stuntin', can't tell me nothin', Bossed up and I changed the game", "Bruno Mars", 4.2),
            new MusicDto("Whenever you feel like letting go and you’ve got your back against the wall. Hold on, just hold on, cause you’re gonna take a few low blows", "Skepta", 4.2),
            new MusicDto("You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime you better", "Eminem", 4.5));

    //Given
    Mockito.when(musicRepository.getListOfMusic()).thenReturn(expectedListOfMusic);

    //When
    List<MusicDto> musics = musicReader.readMusic();

    //Then
    Assertions.assertThat(musics).isEqualTo(expectedListOfMusic);
  }
}
