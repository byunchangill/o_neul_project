package com.gsvl.oneul.user;

import com.gsvl.oneul.food.model.FoodResultVO;
import com.gsvl.oneul.user.model.*;
import com.nimbusds.oauth2.sdk.http.HTTPRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/idfind")
    public void idFind(){}

    @PostMapping("/idfind")
    @ResponseBody
    public String findid(@RequestBody UserEntity entity){
        UserEntity result = service.idFindresult(entity);
        service.idmailSend(result);
        return "redirect:/user/login";
    }

    @PostMapping("/idfindchk")
    @ResponseBody
    public Map<String, Integer> idFindProc(@RequestBody UserEntity entity) {
        Map<String, Integer> res = new HashMap();
        res.put("idFind", service.idFind(entity));
        return res;
    }

    @GetMapping("/pwfind")
    public void pwFind(){}

    @PostMapping("/pwfind")
    @ResponseBody
    public String findpw(@RequestBody UserEntity entity){
        service.pwmailSend(entity);
        service.pwFindUser(entity);
        return "redirect:/user/login";
    }

    @PostMapping("/pwfindchk")
    @ResponseBody
    public Map<String, Integer> pwFindProc(@RequestBody UserEntity entity) {
        Map<String, Integer> res = new HashMap();
        res.put("pwFind", service.pwFind(entity));
        return res;
    }



    @GetMapping("/mail")
    public void emailproc(){}

    @PostMapping("/mail")
    @ResponseBody
    public void execMail(@RequestBody MailDto mailDto) {
        service.mailSend(mailDto);
    }


    @GetMapping("/login")
    public void goLoginPage() {
    }


    @PostMapping("/login")
    public String loginPost(HttpServletRequest rq,RedirectAttributes ra){
        ra.addFlashAttribute("error",rq.getAttribute("error"));
        return "redirect:/user/login";
    }


    @GetMapping("/join")
    public void goJoinPage() {
    }

    @PostMapping("/join")
    public String join(UserEntity entity) {
        service.join(entity);
        return "redirect:/user/login";

    }


    // 아이디 중복 확인(회원가입)
    @GetMapping("/idChk/{u_id}")
    @ResponseBody
    public Map<String, Integer> idChk(@PathVariable String u_id) {
        Map<String, Integer> res = new HashMap();
        res.put("result", service.idChk(u_id));
        return res;
    }

    // 이메일 중복 확인(회원가입)
    @PostMapping("/emailChk")
    @ResponseBody
    public Map<String, Integer> emailChkProc(@RequestBody UserEntity entity) {
        Map<String, Integer> res = new HashMap();
        res.put("email", service.emailChk(entity));
        return res;
    }

    // 마이페이지
    @GetMapping("/mypage")
    public void myPage(zzimEntity entity, Model model) {
        //찜 목록 뿌리기
//        List<zzimEntity> list = service.zzimList(entity);
//        model.addAttribute("list", list);
    }

    @ResponseBody
    @PostMapping("/mypage")
    public Map<String, String> mypageProfileProc(MultipartFile u_profileimg) {
        String fileNm = service.uploadProfileImg(u_profileimg);
        Map<String, String> result = new HashMap<>();
        result.put("result", fileNm);
        return result;
    }

    @ResponseBody
    @GetMapping("/zzim/{iuser}")
    public Map<String ,List<zzimEntity>> zzimProc(@PathVariable int iuser, zzimEntity entity, Model model) {
        entity.setIuser(iuser);
        Map<String ,List<zzimEntity>> map = new HashMap<>();
        map.put("food",service.zzimFoodList(entity));
        map.put("jmt",service.zzimJmtList(entity));

        return map;
    }

    //닉네임 변경(마이페이지)
    @GetMapping("/nickname")
    public void nickname() {
    }

    @PostMapping("/nickname")
    @ResponseBody
    public int nicknameProc(@RequestBody UserEntity entity) {
        int result = service.changeNickname(entity);
        return result;
    }

    // 닉네임 중복 체크(닉네임 변경)
    @GetMapping("/nicknameChk/{u_nickname}")
    @ResponseBody
    public Map<String, Integer> nicknameChk(@PathVariable String u_nickname) {
        Map<String, Integer> res = new HashMap();
        res.put("nickname", service.nicknameChk(u_nickname));
        return res;
    }

    // 비밀번호 변경(마이페이지)
    @GetMapping("/password")
    public void password() {
    }

    @PostMapping("/password")
    public String passwordProc(UserVo vo, HttpSession hs, RedirectAttributes rAttr) {
        int result = service.changePassword(vo);
        if (result != 1) {
            switch (result) {
                case 0:
                    rAttr.addFlashAttribute("msg", "비밀번호 변경에 실패하였습니다.");
                    break;
                case 2:
                    rAttr.addFlashAttribute("msg", "현재 비밀번호를 확인해 주세요.");
                    break;
            }
            return "redirect:/user/password";
        }
        hs.invalidate();
        return "redirect:/user/mypage";
    }

    // 현재 비밀번호 체크
    @PostMapping("/upwChk")
    @ResponseBody
    public Map<String, Integer> emailChkProc(@RequestBody UserVo vo) {
        Map<String, Integer> res = new HashMap();
        res.put("upw", service.upwChk(vo));
        return res;

    }
    //AJAX
    //zzimFood 확인
    @GetMapping("/ajax/zzim/food")
    @ResponseBody
    public int isZzimFood (UserDTO dto){
        return service.isZzimFood(dto);
    }

    //zzimfood insert
    @GetMapping("/ajax/zzim/food/ins")
    @ResponseBody
    public int insZzimFood (UserDTO dto){
        return service.insZzimFood(dto);
    }

    //zzimfood delete
    @GetMapping("/ajax/zzim/food/del")
    @ResponseBody
    public int delZzimFood (UserDTO dto){
        return service.delZzimFood(dto);
    }


    //zzimJmt 확인
    @GetMapping("/ajax/zzim/jmt")
    @ResponseBody
    public int isZzimJmt (UserDTO dto){
        return service.isZzimJmt(dto);

    }
    //zzimJmt insert
    @GetMapping("/ajax/zzim/jmt/ins")
    @ResponseBody
    public int insZzimJmt(UserDTO dto){
        return service.insZzimJmt(dto);
    }
    //zzimJmt delete
    @GetMapping("/ajax/zzim/jmt/del")
    @ResponseBody
    public int delZzimJmt(UserDTO dto){
        return service.delZzimJmt(dto);

    }
}