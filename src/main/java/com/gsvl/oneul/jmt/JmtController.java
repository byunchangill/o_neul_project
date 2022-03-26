package com.gsvl.oneul.jmt;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.jmt.model.JmtEntity;
import com.gsvl.oneul.jmt.review.JmtReviewService;
import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/jmt")
public class JmtController {
    @Autowired private JmtService service;
    @Autowired private JmtReviewService rvservice;
    // /jmt/list로 화면이동
    @GetMapping()
    public String goJmtList(){
        return "/jmt/jmtlist";
    }

    // /jmt/detail로 화면이동
    @GetMapping("/{ijmt}")
    public String goJmtDetail(@PathVariable int ijmt, Model model){
        JmtEntity entity = new JmtEntity();
        entity.setIjmt(ijmt);
        model.addAttribute(Const.JMTDETAIL, service.selJmt(entity));
        return "/jmt/jmtdetail";
    }

    // jmt리뷰로 화면이동
    @GetMapping("/review/{ijmt}")
    public String goJmtReview(@PathVariable int ijmt, JmtReviewEntity prentity, Model model){
        JmtEntity entity = new JmtEntity();
        entity.setIjmt(ijmt);
        model.addAttribute(Const.JMTDETAIL, service.selJmt(entity));
        if(prentity.getIuser()>0){
            System.out.println("수정");
            model.addAttribute(Const.JMTREVIEW,rvservice.selReview(prentity));
        }
        return "/jmt/jmtreview";
    }


}
