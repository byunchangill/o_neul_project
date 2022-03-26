package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import com.gsvl.oneul.notice.model.ResultVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    // 공지사항 글쓰기
    int insNotice(NoticeEntity entity);

    // 공지사항 리스트
    List<NoticeEntity> selNoticeList(NoticeDto dto);

    // 공지사항 디테일
    NoticeEntity selNoticeDetail(NoticeEntity entity);

    // 공지사항 페이지
    ResultVo selMaxPage(NoticeDto dto);

    // 공지사항 조회수
    int addHits(NoticeDto dto);

    // 공지사항 수정, 삭제(isdel)
    int upNotice(NoticeEntity entity);
}
