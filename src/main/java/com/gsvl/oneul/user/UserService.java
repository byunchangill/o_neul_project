package com.gsvl.oneul.user;

import com.gsvl.oneul.common.security.AuthenticationFacade;
import com.gsvl.oneul.common.security.SecurityUserService;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.common.utils.MyFileUtils;

import com.gsvl.oneul.user.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private SecurityUserService securityUserService;

    
    @Autowired private MyFileUtils myFileUtils;


    @Autowired private AuthenticationFacade auth;

    @Autowired
    private JavaMailSender javaMailSender;

    //    private static final String FROM_ADDRESS = "ju39001@naver.com";
    public void mailSend(MailDto mailDto){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        javaMailSender.send(message);
    }

    public void idmailSend(UserEntity entity){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(entity.getU_email());
        message.setSubject("[오늘]회원 아이디 정보");
        message.setText("아이디 : " + entity.getU_id());
        javaMailSender.send(message);
    }

    public void pwmailSend(UserEntity entity){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(entity.getU_email());
        message.setSubject("[오늘]회원 비밀번호 정보");
        message.setText("비밀번호가 전송된 임시 비밀번호로 변경되었습니다 로그인 후 비밀번호를 변경해 주세요.\n임시 비밀번호 : " + entity.getU_pw());
        javaMailSender.send(message);
    }



    public int join(UserEntity entity){
        //패스워드 암호화
        entity.setU_pw(passwordEncoder.encode(entity.getU_pw()));
        entity.setU_pfnum(1);
        int result = securityUserService.join(entity);
        return result;
    }


    // 아이디 중복 체크(회원가입)
    public int idChk(String u_id) {
        UserEntity entity = new UserEntity();
        entity.setU_id(u_id);

        UserEntity result = mapper.idChk(entity);
        return result == null ? 1 : 0;
    }

    // 이메일 중복 체크(회원가입)
    public int emailChk(UserEntity entity) {
        UserEntity result = mapper.emailChk(entity);
        return result == null ? 1 : 0;
    }

    public int idFind(UserEntity entity) {
        UserEntity result = mapper.idFind(entity);
        return result == null ? 0 : 1;
    }
    public int pwFind(UserEntity entity) {
        UserEntity result = mapper.pwFind(entity);
        return result == null ? 0 : 1;
    }

    public UserEntity idFindresult(UserEntity entity){
         return mapper.idFind(entity);
    }



    //찜목록 food,jmt 나오게하기
    public List<zzimEntity> zzimFoodList(zzimEntity entity) {

        List<zzimEntity> result = mapper.zzimFoodList(entity);
        return result;
    }
    public List<zzimEntity> zzimJmtList(zzimEntity entity) {

        List<zzimEntity> result = mapper.zzimJmtList(entity);
        return result;
    }

    //프로필 사진 업로드(마이페이지)
    public String uploadProfileImg(MultipartFile mf) {
        if (mf == null) {
            return null;
        }

        UserEntity loginUser = auth.getLoginUser();

        final String PATH = Const.UPLOAD_IMG_PATH + "/user/" + loginUser.getIuser();
        String fileNm = myFileUtils.saveFile(PATH, mf);
        if (fileNm == null) {
            return null;
        }

        UserEntity entity = new UserEntity();
        entity.setIuser(loginUser.getIuser());

        //기존 파일명 담기
        String oldFilePath = PATH + "/" + loginUser.getU_profileimg();
        myFileUtils.delFile(oldFilePath);

        //파일명 DB에 업데이트
        entity.setU_profileimg(fileNm);
        mapper.updUser(entity);

        //세션 프로필 파일명 수정
        loginUser.setU_profileimg(fileNm);

        return fileNm;
    }

    // 닉네임 변경(마이페이지)
    public int changeNickname(UserEntity entity) {
        entity.setIuser(auth.getLoginUserPk());

        auth.getLoginUser().setU_nickname(entity.getU_nickname());

        int result = mapper.updNickname(entity);
        return result;
    }

    // 닉네임 중복 체크(닉네임 변경)
    public int nicknameChk(String u_nickname) {
        UserEntity entity = new UserEntity();
        entity.setU_nickname(u_nickname);

        UserEntity result = mapper.nicknameChk(entity);
        return result == null ? 1 : 0;
    }

    // 비밀번호 변경(마이페이지)
    public int changePassword(UserVo vo) {
        vo.setIuser(auth.getLoginUserPk());
        UserEntity entity = mapper.changeUser(vo);
        if (!BCrypt.checkpw(vo.getCurrentupw(), entity.getU_pw())) {
            return 2; //현재 비밀번호 다름
        }
        String hashedPw = BCrypt.hashpw(vo.getU_pw(), BCrypt.gensalt());
        vo.setU_pw(hashedPw);
        return mapper.updUser(vo);
    }
    public UserEntity pwFindUser(UserEntity entity) {
        String hashedPw = BCrypt.hashpw(entity.getU_pw(), BCrypt.gensalt());
        entity.setU_pw(hashedPw);
        return mapper.pwFindUser(entity);
    }

    // 비밀번호 변경시 현재 비밀번호 체크
    public int upwChk(UserVo vo) {
        vo.setIuser(auth.getLoginUserPk());
        UserEntity entity = mapper.changeUser(vo);
        if (!BCrypt.checkpw(vo.getCurrentupw(), entity.getU_pw())) {
            return 0; //현재 비밀번호 다름
        }
        return 1;
    }

    //찜목록
    //음식찜
    public int isZzimFood(UserDTO dto){
        return mapper.isZzimFood(dto);
    }
    public int insZzimFood(UserDTO dto){
        return mapper.insZzimFood(dto);
    }
    public int delZzimFood(UserDTO dto){
        return mapper.delZzimFood(dto);
    }




    public int isZzimJmt(UserDTO dto){
        return mapper.isZzimJmt(dto);
    }
    public int insZzimJmt(UserDTO dto){
        return mapper.insZzimJmt(dto);
    }
    public int delZzimJmt(UserDTO dto){
        return mapper.delZzimJmt(dto);
    }



}
