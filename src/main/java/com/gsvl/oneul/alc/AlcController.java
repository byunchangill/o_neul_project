package com.gsvl.oneul.alc;

import com.gsvl.oneul.common.model.SubKeyEntity;
import com.gsvl.oneul.common.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/alc")
public class AlcController {
    @Autowired
    private ApplicationContext appCon;

    @GetMapping()
    public String goAlcPage(Model model){
        List<SubKeyEntity> list = (List<SubKeyEntity>) appCon.getBean(Const.ALKNM);
        model.addAttribute(Const.ALKNM,list);
        System.out.println("list " + list);
        return "/alc/alclist";
    }
}
