let tvProNmElem = document.querySelector('#tv_proNm').value;
const youbuteModalElem = document.querySelector('#youtube_modal');
const youtubeboxElem = document.querySelector('#youtube_box');
const youtubeCancelBtnElem = document.querySelector('#youtube_cancel_btn');
//유튜브
const getYoutube = (keyword)=>{
    let myApiKey = "AIzaSyBZRrYQ1XdveD-B4yT0gqbmNdp1HkZr5nY";
    let tvListVal = tvProNmElem+' '+keyword;
    let url = `https://www.googleapis.com/youtube/v3/search?q=${tvListVal}&key=${myApiKey}&maxResults=1&order=viewCount`;
    fetch(url)
        .then((res)=>{
            return  res.json();
        }).then((data)=> {
            let ifElem = youtubeboxElem.querySelector('iframe');
            if(ifElem){
                ifElem.remove();
            }
            console.log(data);
            item = data.items[0];
            if(item.id.videoId){

                youtubeboxElem.innerHTML = `
                            <iframe class="iframeVid"
                                src="https://www.youtube.com/embed/${item.id.videoId}"
                                width="600" height="300"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        `;
            }
            //모달창켜주기
            youbuteModalElem.style.display = 'flex';
            document.body.style.overflow='hidden';
    }).catch(err=>{
        console.log(err);
        alert('youtube영상이 없습니다.');
        youbuteModalElem.style.display = 'none';
    });
}
//유튜브모달 닫기 이벤트
//addeventlistener를 걸어줄때 잘 확인하고 걸어주자

youtubeCancelBtnElem.addEventListener('click',e=>{
    youtubeboxElem.innerHTML=null;
    youbuteModalElem.style.display = 'none';
    document.body.style.overflow='visible';
});


let tvproBoxElems = document.querySelectorAll('.tvpro_btn');
//현재 주소창을 가져와 지금 어디가 클릭되어있는지 확인
let curHref = window.location.href;
let hrefArr = curHref.split('/');
let trproCode = hrefArr[hrefArr.length-1];

tvproBoxElems.forEach(item=>{
    let tvproCode = item.querySelector('.tvpro_name').value;
    let itemDivElem = item.querySelector('div');

    if(itemDivElem.classList.contains('tvpro_box_clk')){
        item.classList.remove('tvpro_lp');
        itemDivElem.classList.remove('tvpro_box_clk');
        itemDivElem.classList.add('tvpro_box');
    }

    if(tvproCode==trproCode){
        item.classList.add('tvpro_lp');
        itemDivElem.classList.remove('tvpro_box');
        itemDivElem.classList.add('tvpro_box_clk');
    }


    itemDivElem.addEventListener('click',e=>{
        location.href = `/tv/${tvproCode}`;
    });
});





{
    //페이지 스크롤 구현
}
//페이징처리
const maxPage = document.querySelector('#tv_maxpage').value;
let curpage = 1;
const tvListElem = document.querySelector('#tv_list');

//이미지,div만들어주기,이벤트까지(유튜브)
const makeItemDiv = (item,connectKmap) =>{
    if(connectKmap&&!item.t_img){
        connectKmap(item);
        return;
    }
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElemAddr = document.createElement('span');
    let spanElem = document.createElement('span');

    divElem.classList.add('tv-item');
    console.log(item.t_img);

    if(item.t_img=='noPhoto'||item.t_img==null){
        imgElem.src = '/img/imgerr.jpg';
    }else {
        imgElem.src = item.t_img;
    }

    let addr = item.t_addr;
    if(item.t_addr.includes(' ')){
        let addrArr = item.t_addr.split(' ');
        addr = addrArr[0]+' '+addrArr[1]+' '+addrArr[2]+' '+addrArr[3];
    }
    spanElemAddr.innerHTML = `${addr}`
    spanElem.innerHTML = `[${item.t_menunm}] ${item.t_restnm}`;

    spanElemAddr.classList.add('addrspan');
    spanElem.classList.add('nmspan');

    divElem.append(imgElem);
    divElem.append(spanElemAddr);
    divElem.append(spanElem);

    divElem.addEventListener('mouseover',evt => {
        divElem.classList.add('tv-item-ytlg');
    });
    divElem.addEventListener('mouseout',evt => {
        divElem.classList.remove('tv-item-ytlg');
    });

    divElem.addEventListener('click',e=>{
        getYoutube(item.t_restnm);
    });

    tvListElem.append(divElem);
}
//이미지 통신
const getTvImg = (itv,id,item) =>{
    fetch(`/ajax/tv/img/${itv}?id=${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            item.t_img = data.result;
            makeItemDiv(item);
        })
}


//이미지를 가져오기위해 카카오맵-json
const connectKmap = (item) =>{
    let keyword = item.t_addr;
    if(item.t_addr.includes(' ')){
        let addrArr = item.t_addr.split(' ');
        keyword = addrArr[0]+' '+addrArr[1]+' '+item.t_restnm;
    }

    console.log(keyword);

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword,(data, status, pagination)=>{
        if (status === kakao.maps.services.Status.OK) {
            getTvImg(item.itv,data[0].id,item);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            console.log('??');
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    },{size :1});
}


//통신으로 가져오기
const getTvList = () =>{
    fetch(`/ajax/tv/${trproCode}?curpage=${curpage}`)
        .then(res=>res.json())
        .then(data=>{
            curpage++;
            console.log(data);
            data.forEach(item=>{
                //makeItemDiv에 함수랑 item을 같이넣고
                //item에 t_img가 없을때
                //connectKmap이 실행되도록
                makeItemDiv(item,connectKmap);
            });
        })
}

//스크롤에 이벤트
window.addEventListener('scroll', () => {
    let val = window.innerHeight + window.scrollY;
    if(val >= document.body.offsetHeight){
        console.log('cur : '+curpage);
        console.log('max : '+maxPage);
        if(curpage<maxPage){
            getTvList();
        }else {
            console.log('페이지 끝');
        }
    }
});
getTvList();
