package com.gsvl.oneul.tv;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.gsvl.oneul.common.utils.MyKakaoJson;
import com.gsvl.oneul.tv.model.TvDto;
import com.gsvl.oneul.tv.model.TvEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TvService {
    @Autowired
    private TvMapper mapper;
    @Autowired
    private MyKakaoJson myKakaoJson;

    // tv 식당 list return
    public List<TvEntity> selTvList(int tvcode, TvDto dto) {
        dto.setT_pro(tvcode);
        // http://localhost:8090/tv/1 는 파라미터가 없음
        if(dto.getCurpage() == 0) {
            dto.setCurpage(1);
        }

        // 한 페이지당 식당리스트 갯수
        dto.setRecordcount(10);
        // DB 를 위한 페이지셋팅
        dto.setRowcnt((dto.getCurpage() - 1) * dto.getRecordcount());
        return mapper.selTvList(dto);
    }

    // maxpage return
    public int selMaxPage(int tvcode) {
        TvDto dto = new TvDto();
        dto.setT_pro(tvcode);
        dto.setRecordcount(10);
        return mapper.selMaxPage(dto);
    }

    //TV프로 이미지
    public String getTvImg(int kakaoId,int itv ){

        String result = myKakaoJson.connectKaKaoJson(kakaoId);
        //Json형태의 String에서 값 가져오기
        ObjectMapper om = new JsonMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        JsonNode jsonNode = null;

        String kakaoImg= "noPhoto";
        try {
            jsonNode = om.readTree(result);
            //경로를 다 찾아서 String.class를 넣어주면 그 경로에 String 값을 뽑아서 보내줌줌
            kakaoImg =om.treeToValue(jsonNode.get("photo").get("photoList").get(0).get("list").get(0).get("orgurl"),String.class);

        } catch (JsonProcessingException e) {
            kakaoImg = "noPhoto";
            e.printStackTrace();
        } finally {
            TvEntity entity = new TvEntity();
            entity.setItv(itv);
            entity.setT_img(kakaoImg);

            mapper.uptImg(entity);

            return kakaoImg;
        }

    }

}
