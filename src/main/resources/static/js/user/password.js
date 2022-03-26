{
    const data = document.querySelector('#globalConst');

    if (data.dataset.u_pfnum != 1) {
        alert('오늘 회원으로 로그인 해주세요.');
        location.href = '/main';
    }

    var changeElem = document.querySelector('#change');

    let upwChkState = 2; //0: 아이디 사용 불가능, 1:아이디 사용가능, 2: 체크 안함

    const currentChkMsg = (data) => {
        upwChkState = data.upw; //0 or 1

        const currentChkMsgElem = changeElem.querySelector('#current-chk-msg');
        switch (data.upw) {
            case 0:
                currentChkMsgElem.innerText = '현재 비밀번호를 확인해 주세요.';
                break;
            case 1:
                currentChkMsgElem.innerText = '';
                break;
        }
    };


    const pwRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;
    if (changeElem) {
        changeElem.addEventListener('submit', function (e) {
            const currentupwVal = changeElem.currentupw.value;
            const upwVal = changeElem.u_pw.value;
            const chkupwVal = changeElem.chkupw.value;

            if (currentupwVal.length === 0) {
                alert('현재 비밀번호를 작성해 주세요.');
                e.preventDefault();
            } else if (upwVal.length === 0) {
                alert('변경 비밀번호를 작성해 주세요.');
                e.preventDefault();
            } else if (upwVal !== chkupwVal) {
                alert('변경 비밀번호를 확인해 주세요.');
                e.preventDefault();
            } else if (currentupwVal === upwVal) {
                alert('비밀번호는 전과 같을 수 없습니다.');
                e.preventDefault()
            } else if (!pwRegex.test(upwVal)) {
                alert('비밀번호는 대소문자, 숫자, 특수문자 포함 8글자 이상이어야 합니다.');
                e.preventDefault();
            } else if (upwChkState !== 1) {
                switch (upwChkState) {
                    case 0:
                        alert('현재 비밀번호를 확인해 주세요.');
                        break;
                    case 2:
                        alert('현재 비밀번호를 입력해 주세요.');
                        break;
                }
                e.preventDefault();
            }
        })

        changeElem.currentupw.addEventListener('keyup', () => {
            const currentval = changeElem.currentupw.value;

            fetch(`/user/upwChk`, {
                'method': 'post',
                'headers': {'Content-Type': 'application/json'},
                'body': JSON.stringify({currentupw: currentval})
            })
                .then(res => res.json())
                .then((data) => {
                    currentChkMsg(data);
                }).catch((e) => {
                console.log(e);
            });
        });

        const allpwElem = document.querySelector('#allpw');
        if (allpwElem) {
            allpwElem.addEventListener('keyup', function () {
                const pwVal = changeElem.u_pw.value;
                const pwChkMsgElem = changeElem.querySelector('#upw-chk-msg');


                if (!pwRegex.test(pwVal)) {
                    pwChkMsgElem.innerHTML = '영문자, 숫자, 특수문자로 8글자 이상 작성해 주세요.';
                } else if (pwVal === changeElem.currentupw.value) {
                    pwChkMsgElem.innerHTML = '비밀번호는 이전과 같을 수 없습니다.';
                } else {
                    pwChkMsgElem.innerHTML = '사용 가능한 비밀번호 입니다.';
                }
            })
            changeElem.chkupw.addEventListener('keyup', function (){
                const upwchkVal = changeElem.chkupw.value;
                const upwchkChkMsgElem = changeElem.querySelector('#upwchk-chk-msg');
                if (upwchkVal !== changeElem.u_pw.value) {
                    upwchkChkMsgElem.innerHTML = '비밀번호를 확인해 주세요.';
                    return;
                } else if(upwchkVal === changeElem.u_pw.value) {
                    upwchkChkMsgElem.innerHTML = '';
                    return;
                }
            })
        }
    }


}