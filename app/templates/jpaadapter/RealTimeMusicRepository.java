package <%=group%>.infra;

import <%=group%>.domain.model.MusicDto;
import <%=group%>.domain.port.MusicRepository;
import <%=group%>.infra.dao.MusicDao;
import <%=group%>.infra.entity.Music;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class RealTimeMusicRepository implements MusicRepository {

    private MusicDao musicDao;

    public RealTimeMusicRepository(MusicDao musicDao) {
        this.musicDao = musicDao;
    }

    @Override
    public List<MusicDto> getListOfMusic() {
        List<Music> musics = musicDao.findAll();
        return musics.stream().map(this::convertToMusicDto).collect(Collectors.toList());
    }

    private MusicDto convertToMusicDto(Music music) {
        MusicDto musicDto = new MusicDto();
        BeanUtils.copyProperties(music, musicDto);
        return musicDto;
    }
}

