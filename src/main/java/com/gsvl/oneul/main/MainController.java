package com.gsvl.oneul.main;

import com.gsvl.oneul.common.utils.Const;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @GetMapping("/")
    public String defualt(){
        return "main";
    }
    @GetMapping("/main")
    public void main(){
    }
    @GetMapping("/searchlist")
    public void searchlist(@RequestParam String keyword, Model model){
        model.addAttribute(Const.KEYWORD,keyword);
    }
}
