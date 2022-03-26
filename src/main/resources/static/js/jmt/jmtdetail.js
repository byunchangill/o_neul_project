
{
    const ijmtElem = document.querySelector('#ijmt');
    let ijmt = ijmtElem.dataset.ijmt;
    //이미지 swifer
    new Swiper('.swiper-container', {
        slidesPerView : 4, // 동시에 보여줄 슬라이드 갯수
        spaceBetween : 0, // 슬라이드간 간격
        autoplay: {
            delay:3500,
            disableOnInteraction : false
        },
        loop : true, // 무한 반복

        observer: true,
        observeParents: true,
    });

    //map 가게위치
    (function(){
        'use strict'

        let jmtArr = [];
        const jmtMapElem = document.querySelector('#jmtmap'); //지도를 표시할 div
        const dataxElem = document.querySelector('#datax');
        const datayElem = document.querySelector('#datay');
        var options = {
                center: new kakao.maps.LatLng(parseFloat( datayElem.dataset.y),parseFloat( dataxElem.dataset.x)), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
        var ps = new kakao.maps.services.Places();
        ps.keywordSearch('맛집', placesSearchCB, {
            location: options.center,
            radius: 500,
            size: 5,
            category_group_code: 'FD6'
        });
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(data);
                data.forEach(item=>{
                    let JmtEntity = {
                        ijmt : item.id,
                        j_placenm : item.place_name,
                        j_phone : item.phone,
                        j_oldaddr : item.address_name,
                        j_newaddr : item.road_address_name,
                        j_x : item.x,
                        j_y : item.y
                    }
                    if(JmtEntity.ijmt!=ijmt){
                        jmtArr.push(JmtEntity);

                    }
                });
                fetch('/jmt/ajax', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jmtArr)
                }).then(res=>res.json())
                    .then(data=>{
                        jmtArr = data;
                        let listCount = 0;
                        jmtArr.forEach(item=> {
                            if (listCount < 4) {
                            const jmtListBox = document.querySelector('#jmt_dflist');
                            let divElem = document.createElement('div');
                            let spanElem = document.createElement('span');
                            let imgElem = document.createElement('img');
                            let divImgElem = document.createElement('div');
                            let divpnElem = document.createElement('div');

                            divElem.classList.add('jmt-list-item');

                            divImgElem.classList.add('g10');


                            divElem.addEventListener('click', ev => {
                                location.href = `/jmt/${item.ijmt}`;
                            });
                            console.log(item);
                            imgElem.src = `/img/imgerr.jpg`;
                            if(item.jpList.length>0){
                                for(let i = 0;i<item.jpList.length;i++){
                                    if(!item.jpList[i].orgurl.includes('naver')){
                                        imgElem.src = item.jpList[i].orgurl;
                                        break;
                                    }
                                }
                            }
                            imgElem.addEventListener("error", e=>{
                                imgElem.src = `/img/imgerr.jpg`;
                            })
                            divImgElem.append(imgElem);

                            divpnElem.innerHTML = `
                                <div class="f-s-15">[${item.j_catenm}] ${item.j_placenm}</div>
                            `;
                            let starCount = Math.round(item.jstars);
                            const starDiv = document.createElement('div');
                            starDiv.classList.add('jmt-item-star');
                            if (starCount > 0) {
                                for (let i = 0; i < starCount; i++) {
                                    starDiv.innerHTML += `<i class="fa-solid fa-star"></i>`;
                                }
                            } else {
                                starDiv.innerHTML = `<i class="fa-regular fa-star"></i>`;
                            }
                            starDiv.innerHTML += `(${item.jstars})`;

                            spanElem.append(divImgElem);
                            spanElem.append(divpnElem);
                            spanElem.append(starDiv);
                            divElem.append(spanElem);
                            jmtListBox.append(divElem);
                            listCount++
                        }
                        })
                    });
            }
        }


// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(jmtMapElem, options);
        //현재위치 마커
        var marker = new kakao.maps.Marker({
            position: options.center
        });
        marker.setMap(map);


    })();

    //리뷰
    (function () {
        'use strict'

        const jmtDetailReviewElem = document.querySelector('#jmt-detail-review');

        //댓글 리스트
        const getReviewList = () => {
            fetch(`/review/ajax?ijmt=${ijmt}`, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => res.json())
                .then((list) => {
                    console.log(list);
                    //별 찍어주기

                    const starCount = document.querySelector('#jmt_star_count');
                    let totalStar=0;
                    list.forEach(item =>{
                        totalStar+=item.j_star;
                    })
                    let countingStar = totalStar/list.length;
                    if(totalStar){
                        if(Math.round(countingStar)>0){
                            for(let i=0;i<Math.round(countingStar);i++){
                                starCount.innerHTML += `<i class="fa-solid fa-star"></i>`;
                            }
                        }else {
                            starCount.innerHTML = `<i class="fa-regular fa-star"></i>`;
                        }

                        starCount.innerHTML += `(${countingStar})`;
                    }else {
                        starCount.innerHTML = `<i class="fa-regular fa-star"></i>(0)`;
                    }

                    //리뷰 갯수 알려주기
                    const reviewCount = document.querySelector('#review_count');
                    reviewCount.innerHTML = `<i class="fa-regular fa-comments"></i> 총 ${list.length}개의 리뷰`;
                    makeReviewRecordList(list);
                }).catch(e => {
                console.log(e);
            }, ijmt);
        }
        getReviewList();

        //댓글 리스트 생성
        const makeReviewRecordList = list => {
            const reviewList = document.querySelector('#jmt_review_list');
            list.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('review-item');
                const subDiv = document.createElement('div');
                subDiv.classList.add('review-item-sub');
                const subBoxDiv = document.createElement('div');
                subBoxDiv.classList.add('flex-c-r');
                subBoxDiv.classList.add('g30');




                const profileDiv = document.createElement('div');
                const starDiv = document.createElement('div');
                const timeDiv = document.createElement('div');
                const ctntDiv = document.createElement('div');

                let writerProfileImg = '/img/defaultProfile.png';

                if(item.u_profileimg){
                    if(item.u_profileimg.includes('http')){
                        writerProfileImg = item.u_profileimg;
                    }else {
                        writerProfileImg = `/pic/user/${item.iuser}/${item.u_profileimg}`;
                    }
                }

                profileDiv.classList.add('f-s-20');
                profileDiv.innerHTML = `<img class="pfi-40" src="${writerProfileImg}">${item.username}`;
                if(item.j_star>0){
                    for(let i = 0; i<item.j_star;i++){
                        starDiv.innerHTML+=`<i class="fa-solid fa-star"></i>`;
                    }
                }else {
                    starDiv.innerHTML = `<i class="fa-regular fa-star"></i>`;
                }

                timeDiv.innerHTML = timepassed(item.j_rdt);

                ctntDiv.innerHTML =`${item.j_ctnt}`;

                itemDiv.append(subDiv);
                subBoxDiv.append(profileDiv);
                subBoxDiv.append(starDiv);
                subBoxDiv.append(timeDiv);
                subDiv.append(subBoxDiv);

                if(item.iuser==iuser){
                    const utilDiv = document.createElement('div');
                    utilDiv.classList.add('flex-c-r');
                    utilDiv.classList.add('g30');
                    const updDiv = document.createElement('div');
                    updDiv.classList.add('jmt-review-util');
                    updDiv.innerHTML = '<i class="fa-solid fa-wrench"></i>수정';
                    const delDiv = document.createElement('div');
                    delDiv.classList.add('jmt-review-util');
                    delDiv.innerHTML = '<i class="fa-regular fa-trash-can"></i>삭제';
                    updDiv.addEventListener('click',e=>{
                        location.href=`/jmt/review/${ijmt}?iuser=${iuser}`;
                    });
                    delDiv.addEventListener('click',e=>{
                        if(confirm('정말 삭제하시겠습니까?')){
                            fetch(`/review/ajax?icmt=${item.icmt}&iuser=${iuser}&ijmt=${ijmt}`,{ method:"DELETE"})
                                .then(res=>res.json())
                                .then(data=>{
                                    console.log(data);
                                    alert('삭제완료!');
                                    itemDiv.remove();
                                });
                        }

                    })

                    utilDiv.append(updDiv);
                    utilDiv.append(delDiv);

                    subDiv.append(utilDiv);
                }
                //내용
                itemDiv.append(ctntDiv);
                //이미지
                if(item.j_img.length>0){
                    itemDiv.append(document.createElement('hr'));
                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('review-item-img');
                    item.j_img.forEach(imgString=>{
                        let imgElem = document.createElement('img');
                        imgElem.src = `/pic/jmt/${ijmt}/${item.icmt}/${imgString}`;
                        imgElem.addEventListener('click',e=>{
                            window.open(imgElem.src,'popup','width=500,height=500');
                        })
                        imgDiv.append(imgElem);
                    });
                    itemDiv.append(imgDiv);

                }
                reviewList.appendChild(itemDiv);
            });
        }



    })();

    //리뷰 작성 이동
    const reviewWriteElem = document.querySelector('#review_write');
    if(reviewWriteElem){
        reviewWriteElem.addEventListener('click',e=>{
            fetch(`/review/ajax/is?iuser=${iuser}&ijmt=${ijmt}`)
                .then(res=>res.json())
                .then(data=>{
                    if(data==0){
                        location.href=`/jmt/review/${ijmt}`;
                    }
                    else {
                        alert('이미 리뷰를 작성하셨습니다');
                    }
                })
        });
    }
    if(iuser){

        const jmtZzimBtn = document.querySelector('#jmt-zzim-btn');
        let addZzim = document.createElement('div');
        addZzim.classList.add('flex-c-r');
        addZzim.classList.add('g10');
        addZzim.classList.add('addZzim');
        addZzim.innerHTML=`
                    <div>찜 추가</div>
                    <img src="/img/rp3.png">
                `;
        addZzim.addEventListener('click',e=>{
            removeChild(jmtZzimBtn);
            jmtZzimBtn.append(delZzim);
            insZzimJMT({iuser,ijmt},data=>{

            })
        });
        let delZzim = document.createElement('div');
        delZzim.classList.add('flex-c-r');
        delZzim.classList.add('g10');
        delZzim.innerHTML=`
                    <div>찜 제거</div>
                    <img src="/img/rp4.png">
                `;
        delZzim.addEventListener('click',e=>{
            removeChild(jmtZzimBtn);
            jmtZzimBtn.append(addZzim);
            delZzimJMT({iuser,ijmt},data=>{

            })
        });
        isZzimJMT({iuser,ijmt},(data)=>{
            if(data==0){
                jmtZzimBtn.append(addZzim);
            }else {
                jmtZzimBtn.append(delZzim);
            }
        });
    }
}