package com.gsvl.oneul.tv;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.common.model.SubKeyEntity;
import com.gsvl.oneul.tv.model.TvDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/tv")
public class TvController {
    @Autowired private TvService service;
    @Autowired private ApplicationContext appCon;


    @GetMapping("/{tvcode}")
    public String goBroadPage(@PathVariable int tvcode, TvDto dto, Model model){
        // tv 프로 이름 리스트(subkey).
        List<SubKeyEntity> list = (List<SubKeyEntity>) appCon.getBean(Const.TVLIST);
        model.addAttribute(Const.TVLIST,list);
        SubKeyEntity subKeyEntity = new SubKeyEntity();
        for(SubKeyEntity entity : list){
            if(entity.getKeyValue()==tvcode){
                subKeyEntity = entity;
            }
        }
        // 현재 페이지의 tv 프로그램
        model.addAttribute(Const.SUBKEYENTITY,subKeyEntity);
        // tv 방송 식당 목록.
        model.addAttribute(Const.TVCASTLIST, service.selTvList(tvcode, dto));

        // tv 방송별 페이징
        model.addAttribute(Const.MAXPAGE, service.selMaxPage(tvcode));
        return "/tv/tvdetail";
    }
}