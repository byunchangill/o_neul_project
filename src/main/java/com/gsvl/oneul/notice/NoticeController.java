package com.gsvl.oneul.notice;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    private NoticeService service;

    // 공지사항 리스트 뷰
    @GetMapping()
    public String selNoticeList(Model model, NoticeDto dto) {
        model.addAttribute(Const.NOTICE, service.selNoticeList(dto));
        return "/notice/list";
    }


    // 공지사항 리스트
    @ResponseBody
    @GetMapping("/list")
    public List<NoticeEntity> selNoticeListView(NoticeDto dto) {
        return service.selNoticeList(dto);
    }

    // 공지사항 디테일 뷰
    @GetMapping("/detail")
    public String detailListView(NoticeDto dto, Model model) {
        model.addAttribute(Const.NOTICE_DETAIL, service.selNoticeDetail(dto));
        return "notice/detail";
    }

    // 공지사항 페이지
    @ResponseBody
    @GetMapping("/maxpage")
    public int selMaxPage(NoticeDto dto) {
        return service.selMaxPage(dto).getResult();
    }

    // 공지사항 글쓰기
    @GetMapping("/write")
    public void write(@ModelAttribute("entity") NoticeEntity entity) {
        System.out.println(entity);
    }

    @PostMapping("/write")
    public String writeProc(NoticeEntity entity) {
        service.insNotice(entity);
        return "redirect:/notice";
    }

    // 공지사항 수정
    @GetMapping("/update")
    public void mod(NoticeDto dto,Model model) {
        model.addAttribute(Const.DATA, service.selNoticeDetail(dto));
    }

    @PostMapping("/update")
    public String modProc( NoticeEntity entity) {
        service.upNotice(entity);
        return "redirect:/notice?inotice=" + entity.getInotice();
    }

    // 공지사항 삭제
    @GetMapping("/del")
    public String  delProc(NoticeEntity entity) {
        service.delNotice(entity);
        return "redirect:/notice";
    }
}
