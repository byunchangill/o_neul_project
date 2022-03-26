{
    const dataElem = document.querySelector('#globalConst');
    const iuser = dataElem.dataset.iuser;
    const uid = dataElem.dataset.u_id;
    const nickname = dataElem.dataset.u_nickname;
    const email = dataElem.dataset.u_email;
    const nm = dataElem.dataset.u_nm;
    const rdt = dataElem.dataset.u_rdt;
    const profileImg = dataElem.dataset.u_profileimg

    console.log(iuser);
    console.log(uid);
    console.log(nickname);
    console.log(email);
    console.log(nm);
    console.log(rdt);
    console.log(profileImg);



    const profileFileElem = document.querySelector('#profile-file');
    if (profileFileElem) {
        profileFileElem.addEventListener('change', function () {
            const img = profileFileElem.files[0];
            if (img != null) {
                uploadProfileImg(img);
            }
        })
    }



    const profileViewElem = document.querySelector('#profile-view');
    if (profileViewElem) {

        const divElem = document.createElement('div');
        profileViewElem.appendChild(divElem);

        if(profileImg){
            if(profileImg.includes('http')){
                divElem.innerHTML = `<img src="${profileImg}" >`;
            }else {
                divElem.innerHTML = `<img src="/pic/user/${iuser}/${profileImg}" >`;
            }
        }else {
            divElem.innerHTML = `<img src="/img/defaultProfile.png" >`;
        }

        profileViewElem.addEventListener('click', function () {
            if (profileFileElem) {
                profileFileElem.click();
            }
        })
    }

    //이미지 업로드

    const uploadProfileImg = (img) => {
        const fData = new FormData();
        fData.append('u_profileimg', img);

        fetch('/user/mypage', {
            'method': 'post',
            'body': fData
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setProfileImg(data);
            }).catch((e) => {
            console.log(e);
        });
    }
    const setProfileImg = (data) => {
        if(!data.result) { return; }
        const src = `/pic/user/${iuser}/${data.result}`;

        const profileImgElem = profileViewElem.querySelector('img');
        profileImgElem.src = src;


        //헤더 이미지
        const headerProfileImgElem = document.querySelector('#header-profileimg');
        headerProfileImgElem.src = src;
    }





    const myProfileElem = document.querySelector('#myProfile');
    const myNicknameElem = document.querySelector('#myNickname');

    if(myProfileElem) {
        const divElem = document.createElement('div')
        myProfileElem.appendChild(divElem);
        divElem.classList.add('mypage-info');
        divElem.innerHTML = `
                        <div class="f-s-15 flex-c-r"><i class="fa-regular fa-id-badge"></i>&nbsp;ID</div><div style="font-family: 나눔고딕; color: #4d4d4d;">${uid}</div>
                        <div class="f-s-15 flex-c-r"><i class="fa-solid fa-person"></i>&nbsp;이름</div><div style="font-family: 나눔고딕; color: #4d4d4d;">${nm}</div>
                        <div class="f-s-15 flex-c-r"><i class="fa-regular fa-envelope"></i>&nbsp;이메일</div><div style="font-family: 나눔고딕; color: #4d4d4d;">${email}</div>
                        <div class="f-s-15 flex-c-r"><i class="fa-regular fa-calendar-plus"></i>&nbsp;가입일</div><div style="font-family: 나눔고딕; color: #4d4d4d;">${rdt.split(' ')[0]}</div>
                        `;

        if(myNicknameElem){

            if(nickname == null){
                myNicknameElem.innerHTML += `<div class="flex-c-c w100 mt20">닉네임을 설정해보세요!</div>`;
            }else {
                divElem.innerHTML += `<div class="f-s-15 flex-c-r"><i class="fa-regular fa-face-smile"></i>&nbsp;닉네임</div><div>${nickname}</div>`;
            }

        }
    }



    let foodSwiper = new Swiper('.zzim-food-list', {
        slidesPerView : 5, // 동시에 보여줄 슬라이드 갯수
        spaceBetween : 30, // 슬라이드간 간격
        initialSlide: 1,
        observer: true,
        observeParents: true,
        pagination:{
            el:'.swiper-pagination',
            clickable : true,
            type:'bullets',
        },
    });
    let jmtSwiper = new Swiper('.zzim-jmt-list', {
        slidesPerView : 5, // 동시에 보여줄 슬라이드 갯수
        spaceBetween : 30, // 슬라이드간 간격
        initialSlide: 1,
        observer: true,
        observeParents: true,
    });


    const zzimfood = (data) => {
        const zzimFoodElem = document.querySelector('#zzim_food');
        const swiperWrapperElem = zzimFoodElem.querySelector('.swiper-wrapper');
        const foodCountElem = document.querySelector('#food_count');
        let foods = data.length;

        foodCountElem.innerHTML = `${foods}개의 음식이 있습니다.`;
        data.forEach((item) => {
            const divElem = document.createElement('div')
            const spanElem = document.createElement('span');
            const imgElem = document.createElement('img');

            const fnmDiv = document.createElement('div');
            const delDiv = document.createElement('div');

            divElem.classList.add('flex-c-c');
            divElem.classList.add('swiper-slide');


            imgElem.src = item.f_img;
            imgElem.addEventListener('error',e=>{
                imgElem.src = `/img/logo_png`;
            });

            fnmDiv.innerHTML = item.f_nm;
            delDiv.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;

            delDiv.addEventListener('click', e => {
                if (confirm('정말로 찜목록에서 삭제하시겠습니까?')) {
                    delZzimFood({iuser, ifood: item.ifood}, data => {
                        divElem.remove();
                        foods--;
                        foodCountElem.innerHTML = `${foods}개의 음식이 있습니다.`;
                    });
                }
            })

            divElem.append(imgElem);
            divElem.append(spanElem);

            spanElem.append(fnmDiv);
            spanElem.append(delDiv);

            swiperWrapperElem.prepend(divElem);

        })
        foodSwiper.slideTo(0);
    }
        const zzimJmt = (data) => {
            const zzimJmtElem = document.querySelector('#zzim_jmt');
            const swiperWrapperElem = zzimJmtElem.querySelector('.swiper-wrapper');
            const jmtCountElem = document.querySelector('#jmt_count');
            jmtCountElem.innerHTML = `${data.length}개의 맛집이 있습니다.`;
            data.forEach((item) => {
                const divElem = document.createElement('div')
                const spanElem = document.createElement('span');
                const imgElem = document.createElement('img');

                const fnmDiv = document.createElement('div');
                const delDiv = document.createElement('div');

                divElem.classList.add('flex-c-c');
                divElem.classList.add('swiper-slide');

                imgElem.addEventListener('click',e=>{
                    location.href=`/jmt/${item.ijmt}`;
                });

                if(item.j_src.length>0){
                    for(let i = 0;i<item.j_src.length;i++){
                        if(!item.j_src[i].includes('naver')){
                            imgElem.src = item.j_src[i];
                            break;
                        }
                    }
                }else {
                    imgElem.src = `/img/logo_png`;
                }
                imgElem.addEventListener('error',e=>{
                    imgElem.src = `/img/logo_png`;
                });

                fnmDiv.innerHTML = item.j_placenm;
                delDiv.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;

                delDiv.addEventListener('click',e=>{
                    if(confirm('정말로 찜목록에서 삭제하시겠습니까?')){
                        delZzimJMT({iuser,ijmt:item.ijmt},data=>{
                            divElem.remove();
                        });
                    }
                })

                divElem.append(imgElem);
                divElem.append(spanElem);

                spanElem.append(fnmDiv);
                spanElem.append(delDiv);

                swiperWrapperElem.prepend(divElem);

            })

    }
    const zzimList = (data) => {
        fetch(`/user/zzim/${iuser}`)
            .then(res => res.json())
            .then((data) => {
                zzimfood(data.food);
                zzimJmt(data.jmt);
            }).catch((e) => {
            console.log(e);
        });
    }
    zzimList();


    if (dataElem.dataset.u_pfnum == 1) {
        const mypageBtn = document.querySelector('#mypage_btn');
        mypageBtn.innerHTML += `<a class="flex-c-c" href=/user/password>비밀번호 변경</a>`;
    }


}
//닉네임 이벤트
const nickBtnElem = document.querySelector('#nickNmBtn');
nickBtnElem.addEventListener('click',e=>{
    console.log('asdsad');
    window.open('/user/nickname','popup','width=500,height=500');
});

