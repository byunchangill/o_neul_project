package com.gsvl.oneul.tv;

import com.gsvl.oneul.tv.model.TvDto;
import com.gsvl.oneul.tv.model.TvEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ajax/tv")
public class TvRestController {

    @Autowired private TvService service;

    @GetMapping("/{tvcode}")
    public List<TvEntity> getPageList(@PathVariable int tvcode, TvDto dto){
        List<TvEntity> list = service.selTvList(tvcode,dto);
        return list;
    }
    @GetMapping("/img/{itv}")
    public Map<String,String> getTvImg(@PathVariable int itv, @RequestParam int id){
        String result = service.getTvImg(id,itv);

        Map<String,String> map = new HashMap<>();
        map.put("result",result);

        return map;
    }
}
