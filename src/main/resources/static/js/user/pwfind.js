{
    let emailChkState = 2;
    const idRegex = /^([a-zA-Z0-9]{4,15})$/; //대소문자+숫자 조합으로 4~15글자
    const nmRegex = /^([가-힣]{2,5})$/;
    const emailRegex = /^([a-zA-Z0-9]{3,20})$/;

    const joinFrmElem = document.querySelector('#join-frm');
    var mailElem = 0;


    // 이메일 선택 스크립트
    function checkemailaddy() {
        if (joinFrmElem.selEmail.value == '1') {
            joinFrmElem.addres.readOnly = false;
            joinFrmElem.addres.value = '';
            joinFrmElem.addres.focus();
        } else {
            joinFrmElem.addres.readOnly = true;
            joinFrmElem.addres.value = joinFrmElem.selEmail.value;
        }
    }

    // Random Code 생성
    function createCode(objArr, iLength) {
        var arr = objArr;
        var randomStr = "";

        for (var j = 0; j < iLength; j++) {
            randomStr += arr[Math.floor(Math.random() * arr.length)];
        }

        return randomStr
    }


    // 숫자 + 문자 + 특수문자
    function getRandomCode(iLength) {
        var arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");

        var rnd = createCode(arr, iLength);
        return rnd;
    }


    var emailCheck = 0;
    // 이메일 중복 확인 메시지
    const setEmailChkMsg = (data) => {
        emailChkState = data.pwFind; //0 or 1
        switch (data.pwFind) {
            case 0:
                alert('등록되지 않은 정보입니다.');
                break;
            case 1:
                alert('인증번호가 메일로 발송되었습니다.');
                const randomPassword = getRandomCode(10);
                const mailval = joinFrmElem.u_email.value + '@' + joinFrmElem.addres.value;
                fetch(`/user/mail`, {
                    'method': 'post',
                    'headers': {'Content-Type': 'application/json'},
                    'body': JSON.stringify({
                        address: mailval,
                        title: "[오늘] 비밀번호 찾기 인증번호",
                        message: "인증번호 : " + randomPassword
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                    }).catch((e) => {
                    console.log(e);
                });
                const mailpassword = document.querySelector('#mailpassword');
                const divElem = document.createElement('div');
                if(mailElem === 0) {

                    mailpassword.appendChild(divElem);
                    divElem.innerHTML = `<div><label>인증번호 입력</label></div>
                                   <div><input type="text" id="inEmail">
                                   <input type="button" value="인증" id="inEmailBtn" class="email-chk-btn ipbtn"></div>`;
                    mailElem = 1;
                }
                const inEmailElem = document.querySelector('#inEmail');
                const inEmailBtn = document.querySelector('#inEmailBtn');
                if (inEmailBtn) {
                    inEmailBtn.addEventListener('click', function () {
                        if (randomPassword === inEmailElem.value) {
                            alert('이메일 인증이 완료되었습니다.');
                            emailCheck = 1;
                        }
                        else {
                            alert('인증번호가 맞지 않습니다.');
                        }
                    })
                }

                break;
        }
    };
    const resultBtn = document.querySelector('#resultBtn');

    //서브밋 버튼 이벤트
    if (resultBtn) {
        resultBtn.addEventListener('click', (e) => {

            const nm = joinFrmElem.u_nm.value;
            const email = joinFrmElem.u_email.value;
            const uid = joinFrmElem.u_id.value;
            if (!idRegex.test(uid)) {
                alert('아이디는 대소문자, 숫자로 4~15글자가 되어야 합니다.');
                e.preventDefault();
            }
            else if (!nmRegex.test(nm)) {
                alert('이름은 한글로 2~5글자가 되어야 합니다.');
                e.preventDefault();
            } else if (!emailRegex.test(email)) {
                alert('이메일은 대소문자, 숫자로 3~20글자가 되어야 합니다.');
                e.preventDefault();
            } else if (emailCheck !== 1) {
                alert('이메일 인증을 확인해주세요.');
                e.preventDefault();
            }else {

                const emailVal = joinFrmElem.u_email.value + '@' + joinFrmElem.addres.value;
                const nmVal = joinFrmElem.u_nm.value;
                const uidVal = joinFrmElem.u_id.value;
                const randomPassword = getRandomCode(10);

                fetch(`/user/pwfind`, {
                    'method': 'post',
                    'headers': {'Content-Type': 'application/json'},
                    'body': JSON.stringify({
                        u_email: emailVal,
                        u_nm: nmVal,
                        u_id: uidVal,
                        u_pw: randomPassword
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console(data);
                    }).catch((e) => {
                    console.log(e);
                });
                alert('임시 비밀번호가 메일로 전송되었습니다.');
                location.href='/user/login';
            }


        });

        joinFrmElem.u_id.addEventListener('keyup', function () {
            const idVal = joinFrmElem.u_id.value;
            const idChkMsgElem = joinFrmElem.querySelector('#id-chk-msg');

            if (idVal.length < 4) {
                idChkMsgElem.innerHTML = '아이디는 4자 이상 작성해 주세요.';
                return;
            } else if (!idRegex.test(idVal)) {
                idChkMsgElem.innerHTML = '아이디는 대소문자, 숫자로 4~15글자가 되어야 합니다.';
                return;
            } else {
                idChkMsgElem.innerHTML = '';
                return;
            }

        })


        joinFrmElem.u_nm.addEventListener('keyup', function () {
            const nmVal = joinFrmElem.u_nm.value;
            const nmChkMsgElem = joinFrmElem.querySelector('#nm-chk-msg');

            if (!nmRegex.test(nmVal)) {
                nmChkMsgElem.innerHTML = '이름은 한글로 2~5글자가 되어야 합니다.';
                return;
            } else {
                nmChkMsgElem.innerHTML = '';
                return;
            }
        })


        const emailBtnChkElem = joinFrmElem.querySelector('#email-btn-chk');
        emailBtnChkElem.addEventListener('click', () => {
            const val = joinFrmElem.u_email.value + '@' + joinFrmElem.addres.value;
            const nmVal = joinFrmElem.u_nm.value;
            const uidVal = joinFrmElem.u_id.value;

            const emailVal = val;
            if (joinFrmElem.u_email.length < 3) {
                alert('이메일은 3자 이상 작성해 주세요.');
                return;
            } else if (!emailRegex.test(joinFrmElem.u_email.value)) {
                alert('이메일은 대소문자, 숫자로 3~20글자가 되어야 합니다.');
                return;
            } else if (joinFrmElem.addres.value === '') {
                alert('주소를 입력해 주세요.')
                return;
            }
            fetch(`/user/pwfindchk`, {
                'method': 'post',
                'headers': {'Content-Type': 'application/json'},
                'body': JSON.stringify({
                    u_email: emailVal,
                    u_id: uidVal,
                    u_nm: nmVal
                })
            })
                .then(res => res.json())
                .then((data) => {
                    setEmailChkMsg(data);
                }).catch((e) => {
                console.log(e);
            });
        });


    }

}