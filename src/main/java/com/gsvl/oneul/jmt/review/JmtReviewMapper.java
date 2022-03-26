package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JmtReviewMapper {
    //댓글등록
    int insReview(JmtReviewEntity entity);
    //댓글 리스트 가져오기
    List<JmtReviewVo> selReviewList(JmtReviewEntity entity);
    //댓글 하나 가져오기
    JmtReviewVo selReview(JmtReviewEntity entity);
    //리뷰 이미지 icmt로 가져오기
    List<String> selReviewImg(JmtReviewEntity entity);
    //댓글 삭제,이미지 삭제
    int delReview(JmtReviewEntity entity);
    int delReviewImg(JmtReviewEntity entity);
    //댓글 수정
    int updReview(JmtReviewEntity entity);
    //사진 등록
    int insReviewImg(JmtReviewEntity entity);

    float selJmtStars(JmtReviewEntity entity);
}
