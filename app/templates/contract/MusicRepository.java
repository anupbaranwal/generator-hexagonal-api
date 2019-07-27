package <%=group%>.domain.port;

import <%=group%>.domain.model.MusicDto;
import java.util.List;

public interface MusicRepository {
  List<MusicDto> getListOfMusic();
}
