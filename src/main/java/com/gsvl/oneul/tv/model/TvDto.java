package com.gsvl.oneul.tv.model;

import lombok.Data;

@Data
public class TvDto { // 페이징 처리에 필요한 정보
    private int curpage;
    private int rowcnt;
    private int recordcount;
    private int t_pro;
}
