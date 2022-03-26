//iuser값 받아오기. 매번 확인하고 쓰자
let globalConst = document.querySelector('#globalConst');
let iuser;
let pfnum;
let profileImg;
if(globalConst){
    iuser =globalConst.dataset.iuser;
    pfnum = globalConst.dataset.u_pfnum;
    profileImg = globalConst.dataset.u_profileimg;
}

//img패치
const getImg = (item,myFun,imgNum,codeNum) =>{
    fetch(`/common/ajax/img/${item.f_nm}?imgNum=${imgNum}`)
        .then(res=> res.json())
        .then((data) =>{
            myFun(item,data,codeNum);
        }).catch(err=>{
            console.log(err);
    });
};
//날씨 호출
const getWeather = (myFun)=>{
    window.navigator.geolocation.getCurrentPosition((pos)=>{
        var latitude = pos.coords.latitude
        var longitude = pos.coords.longitude

        let apiKey = "f359860a151ee1a83132eab18cdcac7e"
        let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude
            + "&lon=" + longitude
            + "&appid=" + apiKey;
        fetch(weatherUrl).then(function (res){
            return res.json();
        }).then(function (data){
            console.log(data)
            myFun(data);
        }).catch((error) => {
            console.log(error)
        })
    });
}
//날씨 폰트어썸 이미지
let weatherIcon = {
    '01' : 'fas fa-sun',
    '02' : 'fas fa-cloud-sun',
    '03' : 'fas fa-cloud',
    '04' : 'fas fa-cloud-meatball',
    '09' : 'fas fa-cloud-sun-rain',
    '10' : 'fas fa-cloud-showers-heavy',
    '11' : 'fas fa-poo-storm',
    '13' : 'far fa-snowflake',
    '50' : 'fas fa-smog'
};


//오늘날짜 가져오기 함수
const getTodayKor = () =>{
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
    let dayKor;
    switch (day){
        case 0:
            dayKor='월요일'
            break;
        case 1:
            dayKor='화요일'
            break;
        case 2:
            dayKor='수요일'
            break;
        case 3:
            dayKor='목요일'
            break;
        case 4:
            dayKor='금요일'
            break;
        case 5:
            dayKor='토요일'
            break;
        case 6:
            dayKor='일요일'
            break;
    }

    let todayKor = year+'년 '+month+'월 '+date+'일 '+dayKor;
    console.log(todayKor);
    return todayKor;
}
//달 받고 계절리턴
const getSeason = (month) =>{
    console.log(typeof 1);
    let season ='';
    switch(month){
        case 1: case 2: case 12:
            season = "겨울";
            break;
        case 3: case 4: case 5:
            season = "봄";
            break;
        case 6: case 7: case 8:
            season = "여름";
            break;
        case 9: case 10: case 11:
            season = "가을";
            break;
    }
    return season;
}
//음식 조건검색
const getFoodList = (myFt,param)=>{
    fetch(`/food`,{
        'method': 'post',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(param)
    }).then(res=>res.json()).then(data=>{
        myFt(data);
    })
}


//자식 엘레먼트 삭제
const removeChild= (elem)=>{
    while (elem.hasChildNodes()){
        elem.firstChild.remove();
    }
}

//음식 찜 확인
const isZzimFood = (zzim,myft) =>{
    fetch(`/user/ajax/zzim/food?iuser=${zzim.iuser}&ifood=${zzim.ifood}`)
        .then(res=>res.json()).then(data=>{
            myft(data);
    });
}
//음식 찜 추가
const insZzimFood = (zzim,myft)=>{
    fetch(`/user/ajax/zzim/food/ins?iuser=${zzim.iuser}&ifood=${zzim.ifood}`)
        .then(res=>res.json()).then(data=>{
        myft(data);
    });
}
//음식 찜 삭제
const delZzimFood = (zzim,myft)=>{
    fetch(`/user/ajax/zzim/food/del?iuser=${zzim.iuser}&ifood=${zzim.ifood}`)
        .then(res=>res.json()).then(data=>{
        myft(data);
    });
}

//JMT 찜 확인
const isZzimJMT = (zzim,myft) =>{
    fetch(`/user/ajax/zzim/jmt?iuser=${zzim.iuser}&ijmt=${zzim.ijmt}`)
        .then(res=>res.json()).then(data=>{
        myft(data);
    });
}


// 공지사항으로 이동
    const noticeListMainElem = document.querySelector('.notice_list_main');
    if(noticeListMainElem){
        noticeListMainElem.addEventListener('click', e => {
            location.href='/notice';
        });
    }


//jmt 찜 추가
const insZzimJMT  = (zzim,myft)=>{
    fetch(`/user/ajax/zzim/jmt/ins?iuser=${zzim.iuser}&ijmt=${zzim.ijmt}`)
        .then(res=>res.json()).then(data=>{
        myft(data);
    });
}
//jmt 찜 삭제
const delZzimJMT  = (zzim,myft)=>{
    fetch(`/user/ajax/zzim/jmt/del?iuser=${zzim.iuser}&ijmt=${zzim.ijmt}`)
        .then(res=>res.json()).then(data=>{
        myft(data);
    });
}
//header 검색 작업
const searchBtn = document.querySelector('#search_btn');

searchBtn.addEventListener('submit',evt => {
    evt.preventDefault();

    let keyword = searchBtn.jmt.value;
    if(keyword==''){
        alert('검색어를 입력하세요!');
        return false;
    }

    location.href = `/searchlist?keyword=${keyword}`;


});


//현재 시간 구하기
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let data = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
function timepassed(rdt){
    let timearr = rdt.split(' ');
    let timeymd = timearr[0].split('-');
    let timehms = timearr[1].split(':');
    var rdtDate = new Date(timeymd[0],parseInt(timeymd[1])-1,timeymd[2],timehms[0],timehms[1]);
    var curDate = new Date(year,month,data,hours,minutes);
    var elapsedSec = (curDate.getTime()-rdtDate.getTime())/60000;
    if(elapsedSec<60){
        return elapsedSec+'분 전';
    }else if(elapsedSec>=60 && elapsedSec<=1440){
        return Math.round(elapsedSec/60) + '시간 전';
    }else if(elapsedSec>1440 && elapsedSec<= 7200){
        return Math.round(elapsedSec/1440) + '일 전';
    }else {
        return timeymd.join('-');
    }
}



//jmt 별점 가져오기
const getJmtStars = (ijmt,myft)=>{
    fetch(`/review/ajax/star?ijmt=${ijmt}`)
        .then(res=>res.json())
        .then(data=>{
            myft(data.result);
        })
}

//로딩
function LoadingStart() {

    var maskHeight = window.innerHeight;
    var maskWidth  = window.innerWidth;



    let maskElem = document.querySelector('#mask');
    let loadingImgElem = document.querySelector('#loading_box');

    maskElem.style.width = `${maskWidth}px`;
    maskElem.style.height = `${maskHeight}px`;
    maskElem.style.opacity = '0.3';


    //마스크 표시
    maskElem.style.display='block';
    loadingImgElem.style.display='block';
    document.body.style.overflow='hidden';
}
//로딩 끝
function LoadingCancel(){
    let maskElem = document.querySelector('#mask');
    let loadingImgElem = document.querySelector('#loading_box');
    maskElem.style.display='none';
    loadingImgElem.style.display='none';
    document.body.style.overflow='visible';
}

