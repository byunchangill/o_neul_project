{
    let nicknameChkState = 2;
    const joinFrmElem = document.querySelector('#join-frm');

    const nicknameRegex = /^([a-zA-Z0-9가-힣]{2,6})$/;


    const setnicknameChkMsg = (data) => {
        nicknameChkState = data.nickname; //0 or 1

        const nicknameChkMsgElem = joinFrmElem.querySelector('#nickname-chk-msg');
        switch (data.nickname) {
            case 0:
                nicknameChkMsgElem.innerText = '이미 사용중인 닉네임 입니다.';
                break;
            case 1:
                nicknameChkMsgElem.innerText = '사용할 수 있는 닉네임 입니다.';
                break;
        }
    };

    if (joinFrmElem) {
        joinFrmElem.addEventListener('submit', (e) => {
            e.preventDefault();
            const nickname = joinFrmElem.u_nickname.value;
            if(!nicknameRegex.test(nickname)){
                alert('닉네임은 대소문자, 숫자, 한글 조합으로 2~6글자가 되어야 합니다.');
            }
            else if (nicknameChkState !== 1) {
                switch (nicknameChkState) {
                    case 0:
                        alert('다른 닉네임을 사용해 주세요!');
                        break;
                    case 2:
                        alert('닉네임 중복 체크를 해주세요!');
                        break;
                }
            }else {
                fetch(`/user/nickname`,{
                    method : 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({u_nickname: nickname})
                }).then(res=>res.json())
                    .then(data=>{
                        if(data==1){
                            opener.location.reload();
                            window.close();
                        }else {
                            alert('알수없는 오류');
                        }
                    })
            }

        });


        joinFrmElem.u_nickname.addEventListener('keyup', () => {
            const nicknameVal = joinFrmElem.u_nickname.value;
            const nicknameChkMsgElem = joinFrmElem.querySelector('#nickname-chk-msg');

            if(nicknameVal.length < 2) {
                nicknameChkMsgElem.innerHTML = '닉네임은 2자 이상 작성해 주세요.';
                return;
            }else if(nicknameVal.length > 6){
                nicknameChkMsgElem.innerHTML = '닉네임은 6자 이하로 작성해 주세요.';
                return;
            }
            else if(!nicknameRegex.test(nicknameVal)) {
                nicknameChkMsgElem.innerHTML = '대소문자, 숫자, 한글로 작성해 주세요.';
                return;
            }
            fetch(`/user/nicknameChk/${nicknameVal}`)
                .then(res => res.json())
                .then((data) => {
                    setnicknameChkMsg(data);
                }).catch((e)=> {
                console.log(e);
            });
        });
    }
}
