package <%=group%>;

import <%=group%>.domain.MusicReaderService;
import <%=group%>.domain.port.HardcodedAdapter;
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
  private HardcodedAdapter hardcodedAdapter;

  private MusicReader musicReader;

  @Before
  public void setUp() {
    musicReader = new MusicReaderService(hardcodedAdapter);
  }

  @Test
  public void shouldReturnAListOfMusicWhenRequested() {
    List<String> expectedListOfMusic = Arrays.asList("Don’t give up Cause you have friends",
        "What doesn’t kill you makes you stronger",
        "et up, stand up, stand up for your rights / Get up, stand up, don’t give up the fight!");

    //Given
    Mockito.when(hardcodedAdapter.getListOfMusic()).thenReturn(expectedListOfMusic);

    //When
    List<String> musics = musicReader.readMusic();

    //Then
    Assertions.assertThat(musics).isEqualTo(expectedListOfMusic);
  }
}
