package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.UserDTO;
import com.gsvl.oneul.user.model.UserEntity;
import com.gsvl.oneul.user.model.UserVo;
import com.gsvl.oneul.user.model.zzimEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    //회원가입
    int join(UserEntity entity);
    //조회
    UserEntity selUser(UserEntity entity);


    UserEntity idChk(UserEntity entity);        //아이디 중복 체크(회원가입)
    UserEntity emailChk(UserEntity entity);     //이메일 중복 체크(회원가입)
    UserEntity idFind(UserEntity entity);
    UserEntity pwFind(UserEntity entity);
    UserEntity pwFindUser(UserEntity entity);

    List<zzimEntity> zzimFoodList(zzimEntity entity); //찜 음식 목록
    List<zzimEntity> zzimJmtList(zzimEntity entity);

    int updNickname(UserEntity vo);     //닉네임 변경(마이페이지)
    UserEntity nicknameChk(UserEntity vo);  //닉네임 중복 체크(닉네임 변경)

    int updUser(UserEntity entity);         // 비밀번호 변경 && 프로필 이미지 변경
    UserEntity changeUser(UserEntity entity);   // 유저 정보 셀렉트

    //음식 찜 확인
    int isZzimFood(UserDTO dto);

    //음식 찜 insert
    int insZzimFood(UserDTO dto);

    //음식 찜 delete
    int delZzimFood(UserDTO dto);

    //맛집 찜 확인
    int isZzimJmt(UserDTO dto);

    //맛집 찜 insert
    int insZzimJmt(UserDTO dto);

    //맛집 찜 delete
    int delZzimJmt(UserDTO dto);
}
