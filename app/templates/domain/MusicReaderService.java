package <%=group%>.domain;

import <%=group%>.domain.port.HardcodedAdapter;
import <%=group%>.domain.port.MusicReader;
import java.util.List;

public class MusicReaderService implements MusicReader {

  private HardcodedAdapter hardcodedAdapter;

  public MusicReaderService(HardcodedAdapter hardcodedAdapter) {
    this.hardcodedAdapter = hardcodedAdapter;
  }

  @Override
  public List<String> readMusic() {
    return hardcodedAdapter.getListOfMusic();
  }
}
