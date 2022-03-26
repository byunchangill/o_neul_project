package com.gsvl.oneul.season;

import com.gsvl.oneul.common.model.SubKeyEntity;
import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.food.FoodService;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/season")
public class SeasonController {
    @Autowired private ApplicationContext appCon;

    @GetMapping()
    public String goSeasonPage(Model model){
        List<SubKeyEntity> list = (List<SubKeyEntity>) appCon.getBean(Const.F_SEASON);
        model.addAttribute(Const.F_SEASON,list);
        return "/season/sslist";
    }


}

