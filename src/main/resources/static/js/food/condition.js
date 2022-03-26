let foodCheckFrmElem = document.querySelector('#foodCheckFrm');
let foodImgElem = document.querySelector('#foodImg');
let foodInfoElem = document.querySelector('#foodNmInfo');
let checkInputElems = document.querySelectorAll('input[type=checkbox]');
let mapElem = document.querySelector('#map');
let mapInfoElem = document.querySelector('#restaurant_box');





//조건 버튼 이벤트
{
    //리셋버튼 돌아가기
    const btnReElem = document.querySelector('#btn_reset');
    let imgElem = btnReElem.querySelector('img');
    btnReElem.addEventListener('mouseover',evt => {
        imgElem.classList.add('btn_rolling');
    });
    btnReElem.addEventListener('mouseout',evt => {
        imgElem.classList.remove('btn_rolling');
    });
    //리셋클릭
    btnReElem.addEventListener('click',e=>{
        //디스플레이 none
        setDisplayItems(0);
        //불 켜고 끄기
        document.querySelector('#food_light').classList.remove('fas');
        document.querySelector('#food_light').classList.add('far');
        //음식명 리셋
        foodInfoElem.innerHTML=null;


        //맵 삭제
        mapElem.innerHTML=null;
        let mapInfoElem = document.querySelector('#restaurant_box');
        mapInfoElem.innerHTML=null;
        while (mapInfoElem.hasChildNodes()){
            mapInfoElem.removeChild(mapInfoElem.firstChild);
        }
        console.log(document.querySelectorAll('input[type=checkbox]:checked'));
        document.querySelectorAll('input[type=checkbox]').forEach((item)=>{
            if(item.checked){
                item.checked=false;
                item.parentElement.classList.remove('chk-x');
            }
        });
    });
}

//조건 클릭때마다 x표시해주기
checkInputElems.forEach(item=>{
    item.addEventListener('click',(e)=>{
        if(item.checked){
            item.parentElement.classList.add('chk-x');
        }else {
            item.parentElement.classList.remove('chk-x');
        }
    });
});
//alone만 따로
const aloneElems = document.querySelectorAll('input[type=radio]');
aloneElems.forEach(item=>{
    item.addEventListener('click',e=>{
        let cko = document.querySelector('.chk-o');
        cko.classList.remove('chk-o');
        if(item.checked) {
            item.parentElement.classList.add('chk-o');
        }
    });
});


//배열node를 받아 배열값을 뽑아줌
const getCheckValue = (checkElem) =>{
    let returnArr=new Array();
    checkElem.forEach((item)=>{
        returnArr.push(item.value);
    });
    return returnArr;
}
//배열을 받고 foodCheckFrm과 비교해 체크값 넣어주기
const setCheckValue = (checkArr,name) =>{
    document.querySelectorAll(`input[name=${name}]`).forEach(function (item){
        checkArr.forEach((mainItem)=>{
            if(mainItem==item.value){
                item.checked = true;
            }
        });
    });
}

{
    //메인에서 가져온 조건 (사용x)
    /*
    let mainCookery = getCheckValue(document.querySelectorAll('.mainCookery'));
    let mainWorld = getCheckValue(document.querySelectorAll('.mainWorld'));
    let mainIgd = getCheckValue(document.querySelectorAll('.mainIgd'));
    let mainAlone = document.querySelector('.mainAlone').value;

    setCheckValue(mainCookery,'f_cookery');
    setCheckValue(mainWorld,'f_worlddiv');
    setCheckValue(mainIgd,'igd');
    if(mainAlone==1){
        document.querySelector('input[name="alone"]').checked = true;
    }

     */
}

//조건버튼이벤트2 검색
const conditionResult = ()=>{
    let alone = document.querySelector('input[name="alone"]:checked').value;
    let f_cookery = getCheckValue(document.querySelectorAll('input[name="f_cookery"]:checked'));
    let f_worlddiv = getCheckValue(document.querySelectorAll('input[name="f_worlddiv"]:checked'));
    let igd = getCheckValue(document.querySelectorAll('input[name="igd"]:checked'));
    if (alone==null){
        alert('인원수를 체크해주세요');
        return;
    }
    console.log('검색값 확인')
    console.log(f_cookery);
    console.log(f_worlddiv);
    console.log(igd);
    console.log(alone);
    fetch('/food',{
        'method': 'post',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({f_cookery,f_worlddiv,igd,alone,fdnum:1})
    }).then(res=>res.json())
        .then((data) => {
            //찜 나타내기
            if(iuser){
                const foodZzibBtn = document.querySelector('#food_zzim_btn');
                let addZzim = document.createElement('div');
                addZzim.classList.add('flex-c-r');
                addZzim.classList.add('g10');
                addZzim.classList.add('addZzim');
                addZzim.innerHTML=`
                    <div>찜 추가</div>
                    <img src="/img/rp3.png">
                `;
                addZzim.addEventListener('click',e=>{
                    removeChild(foodZzibBtn);
                    foodZzibBtn.append(delZzim);
                    insZzimFood({iuser,ifood:data[0].ifood},data=>{

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
                    removeChild(foodZzibBtn);
                    foodZzibBtn.append(addZzim);
                    delZzimFood({iuser,ifood:data[0].ifood},data=>{

                    })
                });
                const foodZzimBtnElem = document.querySelector('#food_zzim_btn');
                removeChild(foodZzimBtnElem);
                console.log(data[0].ifood);
                isZzimFood({iuser,ifood:data[0].ifood},data=>{
                    if(data==0){
                        foodZzibBtn.append(addZzim);
                    }else {
                        foodZzibBtn.append(delZzim);
                    }
                })
            }

            //디스플레이 block
            setDisplayItems(1);
            //전구 켜기
            document.querySelector('#food_light').classList.remove('far');
            document.querySelector('#food_light').classList.add('fas');
            //음식하나 받아옴
            let oneFood = data[0];
            //음식 이미지
            getImg(oneFood,makeFoodImg,10);
            //음식이름,스크롤 이동
            document.querySelector('#food_light').scrollIntoView();
            foodInfoElem.innerHTML = `
                    ${oneFood.f_nm}
                `;
            //맵
            let mapInfoElem = document.querySelector('#restaurant_box');
            //맵 이미지삭제
            removeChild(mapInfoElem);
            //맵 불러오기
            getMapCurAddrKeyWord(oneFood.f_nm);
            //맵타이틀
            let maptitleElem = document.querySelector('#map_title');
            maptitleElem.innerHTML = `내 주변(5km) ${oneFood.f_nm} 식당`;

        })
        .catch((data)=>{
            console.log(data);
            alert('검색조건에 맞는 음식이 없습니다');
        });

}

if(foodCheckFrmElem){
    const btnSeElem = document.querySelector('#btn_search');
    const btnAgElem = document.querySelector('#food_ag_btn');
    let imgElem = btnSeElem.querySelector('img');
    btnSeElem.addEventListener('mouseover',e=>{
        imgElem.src='/img/con_go.png';
    });
    btnSeElem.addEventListener('mouseout',e=>{
        imgElem.src='/img/con_go_b.png';
    });
    //버튼클릭
    btnSeElem.addEventListener('click',(e)=>{
        e.preventDefault();
        conditionResult();
    });
    //다른음식 가져오기
    let iconElem = btnAgElem.querySelector('img');
    btnAgElem.addEventListener('click',(e)=>{
        conditionResult();
    })
    btnAgElem.addEventListener('mouseover',evt => {
        iconElem.style.transform = 'scale(1.1)  translateY(-5px)';
    });
    btnAgElem.addEventListener('mouseout',e=>{
        iconElem.style.transform = 'scale(1.0) translateY(0px)';
    });

}
//음식 이미지 만들어주기
//음식 이미지 슬라이드 배너용 변수
let foodBn;
function makeFoodImg(item,data){
    // if(foodImgElem.querySelector('div')){
    //     foodImgElem.querySelector('div').remove();
    // }
    // console.log('makingImg함수호출')
    // console.log(data);
    // let divElem = document.createElement('div');
    // data.result.forEach(item=>{
    //     let imgElem = document.createElement('img');
    //     imgElem.addEventListener('error',e=>{
    //         imgElem.src='/img/imgerr.jpg';
    //     });
    //     imgElem.src = item!=null||item.link!=null?item.link:'/img/imgerr.jpg';
    //     divElem.append(imgElem);
    // });
    // divElem.classList.add('rdfood-list');
    // foodImgElem.append(divElem);
    if(foodBn){
        foodBn.destroy();
        foodBn = undefined;
    }

    let swiperFoodBn = document.querySelector('#swiper_fdbn');
    removeChild(swiperFoodBn);
    data.result.forEach(item=>{
        let divSwElem = document.createElement('div');
        let imgElem = document.createElement('img');
        imgElem.addEventListener('error',e=>{
            imgElem.src='/img/imgerr.jpg';
        });
        imgElem.src = item!=null||item.link!=null?item.link:'/img/imgerr.jpg';
        divSwElem.append(imgElem);
        divSwElem.classList.add('swiper-slide');
        swiperFoodBn.append(divSwElem);
    });
    foodBn = new Swiper('.food-bn-container', {
        slidesPerView : 4, // 동시에 보여줄 슬라이드 갯수
        spaceBetween : 30, // 슬라이드간 간격
        autoplay: {
            delay:2500,
            disableOnInteraction : false
        },
        loop : true, // 무한 반복
    });

}

//이미지,맵 diplay변경
const setDisplayItems = (num)=>{
    const secFoodImgElem = document.querySelector('#s_food_img');
    const secMapElem = document.querySelector('#s_food_map');

    if(num==1){
        secFoodImgElem.style.display = 'block';
        secMapElem.style.display = 'block';
    }else {
        secFoodImgElem.style.display = 'none';
        secMapElem.style.display = 'none';
    }
}


