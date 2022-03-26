// 술 종류별 페이지 이동.
let alcoholTitleElems = document.querySelectorAll('.alcohol_title');
let alcoholIconElem = document.querySelector('#alcohol_icon');

// 이미지 리스트
const alcoholListImgElem = document.querySelector('#alcohol_list_img');

let curPageAlcohol;

// 술 종류별 특징 텍스트
let alcoholTextList =[,
    '<div class="text-emph">소주의 효능</div>'+'\n'+
    '<div>1. 혈전의 예방효과</div>'+'\n'+
    '<div>혈전을 녹이기 위해서는 플라스민(Plasmin)이라는 혈액 내에 존재하는 산소의 작용이 필요하게 된다.'+'\n'+
    '알코올은 플라스민을 증가시키는 기능이 있는 것으로 알려져 있으며 그중에서도 소주는 특히 많은 플라스민을 증가시키는 능력이 있다는 실험 결과가 발표되었다.</div>'+'\n'+
    '<div>2. 미용 효과</div>'+'\n'+
    '<div>소주에는 폴리페놀의 일종인 항산화성분인 안토시아닌이 함유되어 있다.'+'\n'+
    '이것의 강한 항산화 작용에 의해 노화 방지, 혈액 정화, 눈의 건강을 유지하는 효과를 기대할 수 있다.</div>'+'\n'+
    '<div>지나친 음주는 건강을 해칩니다.</div>'
    ,
    '<div class="text-emph">맥주의 효능</div>'+'\n'+
    '<div>1. 신장 건강 강화</div>'+'\n'+
    '<div>맥주를 마시고 난 후 화장실이 가고 싶어지는 이유 중 하나는 이뇨 작용 때문이다.\n' +
    '맥주의 90%가 수분으로 이루어져 있고 나트륨 함량이 낮으면서 칼륨은 풍부하게 함유하고 있기 때문에, 맥주를 마시면 잔류하고 있는 체액의 제거를 촉진할 수 있다.\n' +
    '또한 맥주에 들어있는 홉 때문에 적당히 마시는 것은 신장 결석이 생기는 위험을 40% 까지 줄여준다.</div>'+'\n'+
    '<div>2. 소화 개선</div>'+'\n'+
    '<div>맥주의 섬유질과 소염 성분은 소화를 돕는데 아주 좋다.'+'\n'+
    '맥주는 발효된 액체이기 때문에 장내세균총을 위한 유익 박테리아를 돕고 위의 pH를 균형 잡히게 해준다.'+'\n'+
    '또한 가스, 염증, 통증에도 좋으며, 식이섬유 때문에 변비에도 아주 좋은 치료제이다.</div>'+'\n'+
    '<div>지나친 음주는 건강을 해칩니다.</div>\n'
    ,
    '<div class="text-emph">막걸리의 효능</div>'+'\n'+
    '<div>1. 콜레스테롤 감소</div>'+'\n'+
    '적당히 섭취하면 알코올 섭취는 일반적으로 좋은 콜레스테롤을 개선하고 응고를 줄이며 심장 건강을 약간 향상시킬 수 있다.'+'\n'+
    '술은 나쁜 콜레스테롤을 줄이고 고혈압에 기여하는 효소의 생성을 자연스럽게 억제함으로써 도움을 준다.</div>'+'\n'+
    '<div>2. 변비 예방</div>'+'\n'+
    '<div>연구에 따르면 한국 전통 막걸리는 프로바이오틱한 잠재력을 가지고 있다.'+'\n'+
    '프로바이오틱스는 장을 건강하게 유지하고 감염으로부터 보호하는 것으로 알려져 있다.'+'\n'+
    '막걸리는 요구르트에서 발견되는 수준보다 높은 수준의 젖산 및 유산균을 함유하며 식이 섬유가 포함되어 있어 변비 예방에 도움이 된다.</div>'+'\n'+
    '<div>지나친 음주는 건강을 해칩니다.</div>\n'
    ,
    '<div>한국에는 술을 단순하게 다섯가지 종류로 나누는 경향이 있는데, 이것이 맥주, 소주, 청주, 막걸리, 그리고 양주이다.'+'\n'+
    '술의 제조법이나 제조국과 무관하게 단순히 외국술이라는 이유로 부르는 것이기 때문에 엄밀한 분류법은 아니다.</div>'+'\n'+
    '<div>양주는 보통 위스키를 가리키는 말로 쓰이지만,'+'\n'+
    '색이 갈색이고 맛이 쓰면 대충 양주로 퉁치는 분위기 때문에 위스키 외에도 브랜디, 럼, 데킬라 같은 술도 한 묶음으로 엮이며,'+'\n'+
    '심지어 리큐르나 색이 무색 투명한 보드카나 진도 종종 여기에 들어간다.</div>'+'\n'+
    '<div>와인이나, 일본의 사케 같은 경우는 외국 술이긴 하지만 다른 술과는 확연한 차이를 보이기에 구분해서 부른다.</div>'+'\n'+
    '<div>지나친 음주는 건강을 해칩니다.</div>\n'
]

let clickedAlcohol=1;
let timeCode;
const alcoholText = (alcoholcode) => {
    const alcoholTextElem = document.querySelector('#alcohol_text');
    alcoholTextElem.innerHTML = alcoholTextList[alcoholcode];
}

// 술 종류별 이미지 랜덤 셔플
let imgArr=[];
let alcoholCount = 0;
let btnSwitch =0;
const itemShowElem = document.querySelector('#alcohol_item_show');

const makeImgShuffle=()=>{
    if(alcoholCount < imgArr.length){
        itemShowElem.innerHTML=`
                <img src="${imgArr[alcoholCount].img}">
                <div>${imgArr[alcoholCount].nm}</div>
            `;
        alcoholCount++;
    }else {
        alcoholCount = 0;
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

// 술 종류 클릭시 종류에 맞는 아이콘 띄우기
alcoholTitleElems.forEach(item=>{
    let alcoholList = item.querySelector('.alcohol_num').value;

    item.addEventListener('mouseover', e => {
        item.classList.add('alcohol_title_click');
    })
    item.addEventListener('mouseout',e=>{
        if(clickedAlcohol!=alcoholList)
            item.classList.remove('alcohol_title_click');
    })

    item.addEventListener('click', e => {
        clickedAlcohol = alcoholList;
        console.log(clickedAlcohol);
        if(curPageAlcohol == alcoholList) {
            console.log('같음');
            return false;
        }
        curPageAlcohol = alcoholList; // 현재페이지의 값이 같도록해서 두번클릭 안되도록
        alcoholListImgElem.innerHTML = null; // 술 리스티 삭체.
        clearInterval(timeCode); // 랜덤이 돌아가고있다면 삭제
        btnSwitch = 0;
        itemShowElem.innerHTML = `<img src="/img/rp2.png">`;

        //메뉴 하얀색으로 바꿔주기
        let clickedElem = document.querySelectorAll('.alcohol_title_click');
        clickedElem.forEach(elem=>{
            elem.classList.remove('alcohol_title_click');
        });
        item.classList.add('alcohol_title_click');
        alcoholText(alcoholList);
        clickedSeason = alcoholList;

        //계절 아이콘 바꿔주기
        removeChild(alcoholIconElem);
        let iElem = document.createElement('i');
        if(alcoholList == 1){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-wine-bottle');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 2){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-beer-mug-empty');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 3) {
            iElem.classList.add('fa');
            iElem.classList.add('fa-glass-whiskey');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 4) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-champagne-glasses');
            alcoholIconElem.append(iElem);
        }

        //현재페이지를 0으로해서 페이지 초기화
        curPage = 1;

        fetch('/food/maxpage',{
            'method': 'post',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({alknum: alcoholList, recordcount: 15})
        }).then(res=>res.json()).then(tsmp=>{
            maxPage = tsmp; //통신으로 가져온 maxpage
            curPage++;
            //maxpage가지고오면 getList통신
            getFoodList((data) => {
                data.forEach(item=>{
                    getImg(item, makeAlcoholList, 1);
                });
                getFoodList((imgData)=>{
                    shuffleImg(imgData);//이미지 배열 세팅
                },{alknum: alcoholList});
            }, {alknum: alcoholList, recordcount: 15, rowcnt: (curPage-1)*15})
        });
    });
});
//스크롤에 이벤트
window.addEventListener('scroll', () => {
    let val = window.innerHeight + window.scrollY;
    if(val >= document.body.offsetHeight){
        if(curPage<maxPage){
            getFoodList((data) => {
                curPage++;
                data.forEach(item=>{
                    getImg(item, makeAlcoholList, 1);
                });
            }, {alknum: clickedAlcohol, recordcount: 15, rowcnt: (curPage-1)*15})
        }else {
            console.log('페이지 끝');
        }
    }
});

const makeAlcoholList =(item, data)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElem1 = document.createElement('span');
    let spanElem2 = document.createElement('span');

    divElem.classList.add('alcohol-img-item');
    divElem.classList.add('flex-c-c');
    spanElem1.classList.add('alcohol-item-span1');
    spanElem2.classList.add('alcohol-item-span2');

    imgElem.addEventListener('error',e=>{
        imgElem.src='/img/imgerr.jpg';
    });


    imgElem.src = '/img/imgerr.jpg';
    if(data.result.length > 0 && data.result[0].link!=null){
        imgElem.src = data.result[0].link
    }
    spanElem1.innerHTML=`[${item.f_cookery}]&nbsp&nbsp[${item.f_worlddiv}]&nbsp&nbsp[${item.f_season}]`
    spanElem2.innerHTML=`${item.f_nm}`;
    divElem.append(imgElem);
    divElem.append(spanElem1);
    divElem.append(spanElem2);

    alcoholListImgElem.append(divElem);
}

// 첫 접속시 현재 날짜에 맞는 계절 페이지 띄우기
let alcoholList = 1;
const titleNmElems = document.querySelectorAll('.alcohol_title');
titleNmElems.forEach(item=>{
    let alkValue = item.querySelector('.alcohol_num').value;
    console.log(alkValue);
    if(alkValue==alcoholList){
        item.classList.add('alcohol_title_click');
    }
});
fetch('/food/maxpage',{
    'method': 'post',
    'headers': { 'Content-Type': 'application/json' },
    'body': JSON.stringify({alknum:alcoholList,recordcount:15})
    }).then(res=>res.json()).then(tsmp=> {
    maxPage = tsmp; //통신으로 가져온 maxpage
    getFoodList((data) => {
        curPage++;
        alcoholText(alcoholList);
        data.forEach(item => {
            getImg(item, makeAlcoholList, 1);
        });
        getFoodList((imgData) => {
            shuffleImg(imgData);//이미지 배열 세팅
        }, {alknum: alcoholList});
    }, {alknum: alcoholList, recordcount: 15, rowcnt: (curPage - 1) * 15});
});