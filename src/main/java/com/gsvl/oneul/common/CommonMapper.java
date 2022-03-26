package com.gsvl.oneul.common;

import com.gsvl.oneul.common.model.SubKeyEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommonMapper {
    //검색조건들 이름 가져오기
    List<SubKeyEntity> selSubKeyList(int masterNum);
}
