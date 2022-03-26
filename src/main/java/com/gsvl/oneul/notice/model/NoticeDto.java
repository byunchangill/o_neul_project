package com.gsvl.oneul.notice.model;

import lombok.Data;

@Data
public class NoticeDto extends NoticeEntity{
    private int recordCount;
    private int currentPage;
    private int startIdx;
}
