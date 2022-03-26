package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.JmtEntity;
import com.gsvl.oneul.jmt.model.JmtVO;
import com.gsvl.oneul.jmt.model.JsonMenuList;
import com.gsvl.oneul.jmt.model.JsonPhotoList;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JmtMapper {
    int insJmt(JmtEntity entity);
    JmtEntity selJmt(JmtEntity entity);
    //이미지,메뉴,entity insert
    int insImg(JsonPhotoList[] jpList);
    int insMenus(JsonMenuList[] jmList);

    //전체다 가져오는것
    JmtVO selJmtDetail(JmtEntity entity);
}

