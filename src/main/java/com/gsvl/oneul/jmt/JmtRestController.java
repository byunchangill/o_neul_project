package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.JmtEntity;
import com.gsvl.oneul.jmt.model.JmtVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jmt/ajax")
public class JmtRestController {
    @Autowired
    private JmtService jmtService;


    @PostMapping()
    @ResponseBody
    public List<JmtVO> insJmt (@RequestBody List<JmtEntity> jmtArr) {
        List<JmtVO> list = new ArrayList<>();
        for(JmtEntity entity:jmtArr){
            list.add(jmtService.insJmt(entity));
        }

        return list;
    }
}