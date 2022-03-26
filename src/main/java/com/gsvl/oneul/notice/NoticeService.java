package com.gsvl.oneul.notice;

import com.gsvl.oneul.common.security.AuthenticationFacade;
import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import com.gsvl.oneul.notice.model.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoticeService {
    @Autowired private NoticeMapper mapper;
    @Autowired private AuthenticationFacade auth;

    // 공지사항 글쓰기
    public int insNotice(NoticeEntity entity) {
        System.out.println(entity);
        entity.setIuser(auth.getLoginUserPk());
        return mapper.insNotice(entity);
    }

    // 공지사항 리스트
    public List<NoticeEntity> selNoticeList(NoticeDto dto) {
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if(startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);
        return mapper.selNoticeList(dto);
    }

    // 공지사항 디테일
    public NoticeEntity selNoticeDetail(NoticeDto dto) {
        NoticeEntity detail = mapper.selNoticeDetail(dto);
        int hit = mapper.addHits(dto);
        if(hit == 1) {
            detail.setN_hits(detail.getN_hits() + 1);
        }
        return detail;
    }

    // 공지사항 페이지
    public ResultVo selMaxPage(NoticeDto dto) {
        return mapper.selMaxPage(dto);
    }

    // 공지사항 수정
    public int upNotice(NoticeEntity entity) {
        System.out.println("-----------------");
        System.out.println(entity);
        return mapper.upNotice(entity);
    }

    // 공지사항 삭제
    public int delNotice(NoticeEntity entity) {
        entity.setN_isdel(1);
        return mapper.upNotice(entity);
    }

}
