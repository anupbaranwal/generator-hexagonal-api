package <%=group%>;

import <%=group%>.domain.MusicReaderService;
import <%=group%>.domain.port.MusicRepository;
import <%=group%>.domain.port.MusicReader;
import java.util.Arrays;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

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
    List<String> expectedListOfMusic = Arrays.asList("Don’t give up Cause you have friends",
        "What doesn’t kill you makes you stronger",
        "et up, stand up, stand up for your rights / Get up, stand up, don’t give up the fight!");

    //Given
    Mockito.when(musicRepository.getListOfMusic()).thenReturn(expectedListOfMusic);

    //When
    List<String> musics = musicReader.readMusic();

    //Then
    Assertions.assertThat(musics).isEqualTo(expectedListOfMusic);
  }
}
