package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review/ajax")
public class JmtReviewRestController {
    @Autowired private JmtReviewService service;

    //리뷰 작성
    @PostMapping()
    public int JmtReview(@RequestBody JmtReviewEntity entity){
        return service.insReview(entity);
    }

    //리뷰 리스트 가져오기
    @GetMapping()
    public List<JmtReviewVo> selReviewList(JmtReviewEntity entity){
        return service.selReviewList(entity);
    }

    //리뷰 썻는지 안썻는지 확인
    @GetMapping("/is")
    public int selReview(JmtReviewEntity entity){
        if(service.selReview(entity)==null){
            return 0;
        }else {
            return 1;
        }}

    //리뷰삭제
    @DeleteMapping()
    public int delReview(JmtReviewEntity entity){return service.delReview(entity); }

    //리뷰 수정
    @PutMapping()
    public int updReview(@RequestBody JmtReviewEntity entity){
        return service.updReview(entity);
    }

    //리뷰 이미지
    @GetMapping("/img")
    public List<String> getImg(JmtReviewEntity entity){
        return service.selReviewImg(entity);
    }


    //insert
    @PostMapping("/img")
    public int insImg(MultipartFile[] jmtRvImgArr,JmtReviewEntity entity){
        service.uploadReviewImg(jmtRvImgArr,entity);
        return 1;
    }

    @GetMapping("/star")
    public Map<String,Float> selJmtStars(JmtReviewEntity entity){
        Map<String,Float> map = new HashMap<>();
        map.put(Const.RESULT, service.selJmtStars(entity));
        return map;
    }
}
