package com.gsvl.oneul.jmt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.gsvl.oneul.common.utils.MyKakaoJson;
import com.gsvl.oneul.jmt.model.JmtEntity;
import com.gsvl.oneul.jmt.model.JmtVO;
import com.gsvl.oneul.jmt.model.JsonMenuList;
import com.gsvl.oneul.jmt.model.JsonPhotoList;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


@Service
public class JmtService {
    @Autowired
    private JmtMapper jmtMapper;
    @Autowired
    private MyKakaoJson myKakaoJson;

    public JmtVO insJmt(JmtEntity entity){

        JmtVO dbVo = selJmt(entity);

        if (dbVo == null){
            String kakaoJson = myKakaoJson.connectKaKaoJson(entity.getIjmt());

            ObjectMapper om = new JsonMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            JsonNode jsonNode = null;

            String j_catenm = null;
            JsonPhotoList[] photoList= null;

            JsonMenuList[] menuList= null;

            try {
                jsonNode = om.readTree(kakaoJson);
                //경로를 다 찾아서 String.class를 넣어주면 그 경로에 String 값을 뽑아서 보내줌줌

                //카테고리
                try {
                    j_catenm = om.treeToValue(jsonNode.get("basicInfo").get("catename"), String.class);
                    entity.setJ_catenm(j_catenm);
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

                //포토리스트
                try {
                    photoList = om.treeToValue(jsonNode.get("photo").get("photoList").get(0).get("list"), JsonPhotoList[].class);
                    //insert할때 ijmt이 필요
                    for(JsonPhotoList list : photoList){
                        list.setIjmt(entity.getIjmt());
                    }
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

                //메뉴리스트
                try {
                    menuList = om.treeToValue(jsonNode.get("menuInfo").get("menuList"), JsonMenuList[].class);
                    //insert할때 ijmt이 필요
                    for(JsonMenuList list : menuList){
                        list.setIjmt(entity.getIjmt());
                    }
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }


            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }finally {
                jmtMapper.insJmt(entity);
                if (photoList!=null){
                    jmtMapper.insImg(photoList);
                }
                if(menuList!=null){
                    jmtMapper.insMenus(menuList);
                }
                dbVo = jmtMapper.selJmtDetail(entity);
                return dbVo;
            }

        }
        //todo select한 vo를 보내주는식으로 바꿔줘야함
        return dbVo;
    }
    public JmtVO selJmt(JmtEntity entity){
        return jmtMapper.selJmtDetail(entity);
    }
}
