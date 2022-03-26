// 계절별 페이지 이동.
let seasonTitleElems = document.querySelectorAll('.season_title');
let seasonIconElem = document.querySelector('#season_icon');
//이미지 리스트
const ssListImgElem = document.querySelector('#season_list_img');

let curPageSeason;
//계절별 특징 텍스트
let seasonTextList =[
    '<div class="text-emph">제철음식</div>'+
    '<div>제철 음식은 각 계절에 스스로 적응하고 자라는 것들을 이용해 만들기 때문에,인위적으로 길러낸 것들보다 영양소가 풍부하다.'+'\n' +
    '각 계절에 부족할 수 있는 영양분과 성질을 더 잘 채워주기 때문이다.'+'\n' +
    '제철 음식은 그 식물의 영양분이 가장 무르익었을 때에 먹는다는 이점이 있다.</div>'+'\n' +
    '<div>또 제철 음식을 먹음으로써 우리의 몸이 사계절 변화의 순리를 따라가도록 도와주며, 그 계절을 가장 그 계절답게 보내도록 해준다고 할 수 있겠다.'+'\n' +
    '제철 식품이란 알맞은 계절에 나오는 식품을 말하며 과일이나 채소류는 재배되는 시기, 생선은 산란 시기 등에 의해 정해진다.'+'\n' +
    '이때의 식품은 영양분이 풍부하고 맛이 다른 때에 비해 훨씬 좋다.</div>\n'
    ,
    '<div class="text-emph">봄의 제철음식</div>'+'\n' +
    '<div>봄에는 따뜻한 기운을 받아 우리 몸의 신진대사가 왕성해진다.'+'\n' +
    '그만큼 신체활동이 활발해지고 에너지가 많이 필요하다.'+'\n'+
    '몸으로 발산되는 에너지가 많다 보니 두뇌활동에 필요한 에너지가 상대적으로 줄어들어 춘곤증이 생긴다.</div>'+'\n'+
    '<div>춘곤증에 효과적인 음식은 바로 봄나물이다.'+'\n'+
    '쑥· 냉이· 달래· 씀바귀 등 봄나물에는 비타민 B와 무기질이 풍부하다.'+'\n'+
    '비타민 B와 무기질은 우리 몸에서 에너지를 만들 때 꼭 필요한 영양소다.'+'\n'+
    '봄나물을 먹으면 에너지 생성을 활발하게 하는 데 도움이 된다.</div>\n'
    ,
    '<div class="text-emph">여름의 제철음식</div>'+'\n' +
    '<div>여름에는 높은 기온으로 조금만 움직여도 땀이 난다.'+'\n' +
    '더운 날씨 때문에 흘리는 땀을 통해 무기질이 빠져나간다.</div>'+'\n' +
    '<div>때문에 여름에는 무기질이 풍부한 음식을 많이 먹어야 한다.'+'\n' +
    '여름 제철인 오이·가지·수박·참외 등은 무기질과 수분이 풍부한 먹거리다.</div>\n'
    ,
    '<div class="text-emph">가을의 제철음식</div>'+'\n' +
    '<div>가을에는 날씨가 건조하고 추워지면서 몸이 쉽게 피로하게 된다.'+'\n' +
    '피로감을 줄이기 위해서는 몸속에 쌓인 노폐물을 빨리 없애야 한다.'+'\n' +
    '노폐물 제거에 효과적인 영양소는 바로 식이섬유다.</div>'+'\n' +
    '<div>식이섬유는 몸에 불필요한 노폐물이나 중금속과 함께 배설된다.'+'\n' +
    '다이어트에 중요한 영양소로 손꼽히는 이유다.'+'\n' +
    '가을이 제철인 버섯·토란·고구마 등에는 식이섬유가 많이 들어 있다.'+'\n' +
    '햇곡식과 햇과일에도 식이섬유가 풍부하다.</div>\n'
    ,
    '<div class="text-emph">겨울의 제철음식</div>'+'\n' +
    '<div>혈액순환이 잘되지 않아 협심증·심근경색증 등 심혈관계 질환이 많이 발생한다.'+'\n' +
    '심혈관계 질환의 가장 큰 원인은 저밀도 콜레스테롤이다.'+'\n' +
    '때문에 겨울철에는 동물성 식품의 섭취를 줄이고 콜레스테롤 수치를 낮추는 불포화지방이 풍부한 식품을 먹어야 한다.</div>\n'
    ]

let clickedSeason;
let timeCode;
const seasonText = (sscode)=>{
    const ssTextElem = document.querySelector('#ss_text');
    ssTextElem.innerHTML = seasonTextList[sscode];
}

//계절 이미지 셔플 랜덤
let imgArr=[];
let sfcount = 0;
let btnSwitch =0;
const itemShowElem = document.querySelector('#ss_item_show');

const makeImgShuffle=()=>{
    if(sfcount<imgArr.length){
        itemShowElem.innerHTML=`
                <img src="${imgArr[sfcount].img}">
                <div>${imgArr[sfcount].nm}</div>
            `;
        sfcount++;
    }else {
        sfcount=0;
    }
}
const shuffleImg = (data)=>{
    imgArr.splice(0);
    data.forEach(item=>{
        imgArr.push({img:item.f_img,nm:item.f_nm})
    });
}
//이미지 시작 스탑 버튼
const stopBtn = document.querySelector('#imgStop');
stopBtn.addEventListener('click',evt => {
    console.log('stop');
    console.log(btnSwitch);
    if(btnSwitch==1){
        if(timeCode){
            clearInterval(timeCode);
            btnSwitch=0;
        }
    }else {
        alert('이미 중지되었습니다.');
    }
});
const startBtn = document.querySelector('#imgStart');
startBtn.addEventListener('click',evt => {
    console.log('start');
    console.log(btnSwitch);
    if(btnSwitch==0){
        timeCode = setInterval(makeImgShuffle,50);
        btnSwitch=1;
    }else {
        alert('이미 시작되었습니다.');

    }
});

//page처리까지하는 getList
let curPage=1;
let maxPage=0;
let recordcount=15;
//스크롤에 이벤트
window.addEventListener('scroll', () => {
    let val = window.innerHeight + window.scrollY;
    if(val >= document.body.offsetHeight){
        console.log(curPage);
        let param = {
            f_season: curPageSeason,
            recordcount,
            rowcnt:(curPage-1)*recordcount
        }
        console.log(param.rowcnt);
        if(curPage<=maxPage){
            getFoodList((data) => {
                console.log(data);
                curPage++;
                data.forEach(item=>{
                    getImg(item,makeSSList,1);
                });
            }, {f_season: curPageSeason,recordcount,rowcnt:(curPage-1)*recordcount})
        }else {
            console.log('페이지 끝');
        }
    }
});

// 계절 클릭시 계절에 맞는 아이콘 띄우기
seasonTitleElems.forEach(item=>{
    let seasonList = item.querySelector('.season_num').value;

    item.addEventListener('mouseover',e=>{
        item.classList.add('season_title_click');
    })
    item.addEventListener('mouseout',e=>{
        if(clickedSeason!=seasonList)
        item.classList.remove('season_title_click');
    })

    item.addEventListener('click',e=> {
        if(curPageSeason==seasonList){
            console.log('같음');
            return false;
        }
        curPageSeason=seasonList; // 현재페이지의 시즌이 같도록해서 두번클릭 안되도록
        ssListImgElem.innerHTML = null; // 계절리스트 삭제
        clearInterval(timeCode); // 랜덤이 돌아가고있다면 삭제
        btnSwitch = 0;
        itemShowElem.innerHTML = `<img src="/img/rp2.png">`;

        //메뉴 하얀색으로 바꿔주기
        let clickedElem = document.querySelectorAll('.season_title_click');
        clickedElem.forEach(elem=>{
             elem.classList.remove('season_title_click');
        });
        item.classList.add('season_title_click');
        seasonText(seasonList);
        clickedSeason=seasonList;

        //계절 아이콘 바꿔주기
        removeChild(seasonIconElem);
        let iElem = document.createElement('i');
        if(seasonList == 1){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-seedling');
            seasonIconElem.append(iElem);
        }else if(seasonList == 2){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-sun');
            seasonIconElem.append(iElem);
        }else if(seasonList == 3) {
            iElem.classList.add('fa-brands');
            iElem.classList.add('fa-canadian-maple-leaf');
            seasonIconElem.append(iElem);
        }else if(seasonList == 4) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-snowflake');
            seasonIconElem.append(iElem);
        }else if(seasonList == 0) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-earth-americas');
            seasonIconElem.append(iElem);
        }

        //현재페이지를 0으로해서 페이지 초기화
        curPage = 1;

        fetch('/food/maxpage',{
            'method': 'post',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({f_season:seasonList,recordcount:15})
        }).then(res=>res.json()).then(tsmp=>{
            maxPage = tsmp; //통신으로 가져온 maxpage
            //maxpage가지고오면 getList통신
            getFoodList((data) => {
                curPage++;
                data.forEach(item=>{
                    getImg(item,makeSSList,1);
                });
                getFoodList((imgData)=>{
                    shuffleImg(imgData);//이미지 배열 세팅
                },{f_season: seasonList});

            }, {f_season: seasonList,recordcount:15,rowcnt:(curPage-1)*this.recordcount})
        });
        // 계절별 리스트 띄우기
    });
});

const makeSSList =(item,data)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElem1 = document.createElement('span');
    let spanElem2 = document.createElement('span');

    divElem.classList.add('ss-img-item');
    divElem.classList.add('flex-c-c');
    spanElem1.classList.add('ss-item-span1');
    spanElem2.classList.add('ss-item-span2');

    imgElem.addEventListener('error',e=>{
        imgElem.src='/img/imgerr.jpg';
    });

    imgElem.src = '/img/imgerr.jpg';
    if(data.result.length>0 && data.result[0].link!=null){
        imgElem.src = data.result[0].link
    }
    spanElem1.innerHTML=`[${item.f_cookery}]&nbsp&nbsp[${item.f_worlddiv}]&nbsp&nbsp[${item.alk}]`
    spanElem2.innerHTML=`${item.f_nm}`;
    divElem.append(imgElem);
    divElem.append(spanElem1);
    divElem.append(spanElem2);

    ssListImgElem.append(divElem);
}

// 날씨 정보 및 계절별 아이콘 띄우기
let seasonTodayElem = document.querySelector('#s_today');

getWeather((data)=>{
    console.log(data);
    let icon = data.weather[0].icon.substr(0,2);
    let curTem = (data.main.temp-273).toFixed(1); // 현재 온도
    let curSeason = getSeason(new Date().getMonth()+1);

    let div = document.createElement('div');
    div.classList.add('s-text');
    div.innerHTML = `
            <div>현재기온  ${curTem} <span class="f-s-20"><i class="${weatherIcon[icon]}"></i></span></div>                    
    `;
    seasonTodayElem.append(div);

    let seasonCode=0;
    let iElem = document.createElement('i');
    switch (curSeason){
        case '봄':
            seasonCode = 1;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-seedling');
            break;
        case '여름':
            seasonCode = 2;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-sun');
            break;
        case '가을':
            seasonCode = 3;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-canadian-maple-leaf');
            break;
        case '겨울':
            seasonCode = 4;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-snowflake');
            break;
    }
    seasonText(seasonCode);
    clickedSeason = seasonCode;
    curPageSeason = seasonCode;
    seasonIconElem.append(iElem);
    seasonTitleElems.forEach(item=>{
        let sscode = item.querySelector('.season_num').value;
        if(sscode==seasonCode){
            item.classList.add('season_title_click');
        }
    });

    // 첫 접속시 현재 날짜에 맞는 계절 페이지 띄우기
    fetch('/food/maxpage',{
        'method': 'post',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({f_season:seasonCode,recordcount:15})
    }).then(res=>res.json()).then(tsmp=>{
        maxPage = tsmp;
        console.log('통신 후');
        console.log(maxPage);
        getFoodList((data) => {
            curPage++;
            console.log('페이지 로드');
            console.log(curPage);
            getFoodList((imgData)=>{
                shuffleImg(imgData);//이미지 배열 세팅
            },{f_season: seasonCode});
            data.forEach(item=>{
                getImg(item,makeSSList,1);
            })
        }, {f_season: seasonCode,recordcount:15,rowcnt:(curPage-1)*15})
    });

});

