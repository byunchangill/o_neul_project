package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.common.security.AuthenticationFacade;
import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.common.utils.MyFileUtils;
import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class JmtReviewService {
    @Autowired private JmtReviewMapper mapper;
    @Autowired private MyFileUtils fileUtils;
    @Autowired private AuthenticationFacade auth;

    //작성
    public int insReview(JmtReviewEntity entity){
        mapper.insReview(entity);
        //icmt(pk)값을 다시 리턴해주는것으로 했으나, mapper에 들어간 entity에 담겨서 나옴
        return entity.getIcmt();
    }
    //리뷰리스트
    public List<JmtReviewVo> selReviewList(JmtReviewEntity entity){
        return mapper.selReviewList(entity);
    }
    //리뷰하나
    public JmtReviewVo selReview(JmtReviewEntity entity){ return mapper.selReview(entity);}
    //삭제
    public int delReview(JmtReviewEntity entity){
        delImg(entity);
        return mapper.delReview(entity);}
    public void delImg(JmtReviewEntity entity){
        List<String> list  = mapper.selReviewImg(entity);
        if(list!=null){
            mapper.delReviewImg(entity);
            String path = Const.UPLOAD_IMG_PATH+"/jmt/"+entity.getIjmt()+"/"+entity.getIcmt();
            for(String img : list){

                fileUtils.delFile(path+"/"+img);

            }
        }
    }
    //수정
    public int updReview(JmtReviewEntity entity){
        return mapper.updReview(entity);}

    //리뷰 사진
    public int uploadReviewImg(MultipartFile[] mf,JmtReviewEntity entity){
        if(mf == null){return 0;}
        delImg(entity);
        //리뷰사진 저장경로
        final String PATH = Const.UPLOAD_IMG_PATH+"/jmt/"+entity.getIjmt()+"/"+entity.getIcmt();
        List<String> list = new ArrayList<>();

        //파일 사진 저장,이름바꾸기
        for(MultipartFile file:mf){
            String filenm = fileUtils.saveFile(PATH,file);
            list.add(filenm);
        }
        entity.setJ_img(list);

        return mapper.insReviewImg(entity);
    }

    public float selJmtStars(JmtReviewEntity entity){
        return mapper.selJmtStars(entity);
    }

    //이미지 가져오기
    public List<String>selReviewImg(JmtReviewEntity entity){
        return mapper.selReviewImg(entity);
    }
}
