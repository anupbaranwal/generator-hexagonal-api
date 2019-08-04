package <%=group%>.rest;

import <%=group%>.domain.model.MusicDto;
import <%=group%>.domain.port.MusicReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/musics")
public class MusicResource {

    @Autowired
    private MusicReader musicReader;

    @GetMapping
    public List<MusicDto> getMusics() {
        return musicReader.readMusic();
    }
}
