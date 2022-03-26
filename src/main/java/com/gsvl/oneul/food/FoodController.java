package com.gsvl.oneul.food;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.common.model.SubKeyEntity;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private ApplicationContext appCon;

    @GetMapping()
    public String goFood(Model model){
        model.addAttribute(Const.F_COOKERY,(List<SubKeyEntity>) appCon.getBean(Const.F_COOKERY));
        model.addAttribute(Const.F_WORLDDIV,(List<SubKeyEntity>) appCon.getBean(Const.F_WORLDDIV));
        model.addAttribute(Const.IGD,(List<SubKeyEntity>) appCon.getBean(Const.IGD));
        return "/food/condition";
    }

    //ajax 조건 리스트
    @ResponseBody
    @PostMapping()
    public List<FoodResultVO> getConditions(@RequestBody FoodConditionEntity entity){
        List<FoodResultVO> list = foodService.getFoodList(entity);
        return list;
    }

    //ajax maxPage
    @ResponseBody
    @PostMapping("/maxpage")
    public int getMaxPage(@RequestBody FoodConditionEntity entity){
        return foodService.selMaxPage(entity);
    }

}
