package <%=group%>.domain;

import <%=group%>.domain.port.MusicRepository;
import <%=group%>.domain.port.MusicReader;
import <%=group%>.domain.model.MusicDto;

import java.util.List;

public class MusicReaderService implements MusicReader {

  private MusicRepository musicRepository;

  public MusicReaderService(MusicRepository musicRepository) {
    this.musicRepository = musicRepository;
  }

  @Override
  public List<MusicDto> readMusic() {
    return musicRepository.getListOfMusic();
  }
}
