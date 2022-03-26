{
    let starLate = 0;
    const ijmtElem = document.querySelector('#ijmt');
    let ijmt = ijmtElem.dataset.ijmt;
    let updStarElem = document.querySelector('#jmt_upd_star');
    let icmtElem = document.querySelector('#jmt_icmt');

    //이미지 올리기
    const imgFilesElem = document.querySelector('#review_img_file');
    const previewImage = document.getElementById("review_img_preveiw");
    const imgFileName = document.getElementById("imgfile_nm");


    imgFilesElem.addEventListener('change',e=>{
        removeChild(previewImage);
        imgFileName.innerHTML=null;
        preImgView(Array.from(imgFilesElem.files));
    });

    function preImgView(files) {
        files.forEach(item=>{
            if (item) {
                // FileReader 인스턴스 생성
                const reader = new FileReader()
                // 이미지가 로드가 된 경우
                reader.onload = e => {
                    let imgElem = document.createElement('img');
                    imgElem.src = e.target.result;

                    previewImage.append(imgElem);

                    imgFileName.innerHTML += `&nbsp;${item.name}`;
                }
                // reader가 이미지 읽도록 하기
                reader.readAsDataURL(item);
            }
        });
    }

    (function (){
        'use strict'

        const reviewFormContainerElem = document.querySelector('#review_form_container');

        //댓글 입력 폼
        if (reviewFormContainerElem) {
            const reviewWriteBtnElem = reviewFormContainerElem.querySelector('button[name="review_write"]');
            const reviewChangeBtnElem = reviewFormContainerElem.querySelector('button[name="review_change"]');
            const reviewCtntInputElem = reviewFormContainerElem.querySelector('textarea[name="ctnt"]');

            if(reviewWriteBtnElem){
                reviewWriteBtnElem.addEventListener('click', e => {
                    const param = {
                        iuser,
                        ijmt,
                        j_ctnt: reviewCtntInputElem.value,
                        j_star:starLate
                    }
                    fetch('/review/ajax', {
                        method : 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(param)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            if(imgFilesElem){
                                const fData = new FormData();

                                fData.append('ijmt',ijmt);
                                fData.append('icmt',data);

                                Array.from(imgFilesElem.files).forEach(uplFile=>{
                                    fData.append('jmtRvImgArr',uplFile);

                                });
                                fetch(`/review/ajax/img`,{
                                    'method':'POST',
                                    'body':fData
                                }).then(res=>res.json())
                                    .then(data=>{
                                        console.log(data);
                                        location.href=`/jmt/${ijmt}`;

                                    })
                            }
                        }).catch((e) =>{
                        console.log(e);
                    });
                });
            }
            if(reviewChangeBtnElem){
                /* 사진이미지 보여주기
                fetch(`/review/ajax/img?icmt=${icmtElem.value}`)
                    .then(res=>res.json())
                    .then(data=>{
                        data.forEach(item=>{
                            let imgElem = document.createElement('img');
                            imgElem.src = `/pic/jmt/${ijmt}/${icmtElem.value}/${item}`;
                            previewImage.append(imgElem);
                        })
                        console.log(data);
                    })

                 */

                reviewChangeBtnElem.addEventListener('click',e=>{
                    const param = {
                        iuser,
                        ijmt,
                        j_ctnt: reviewCtntInputElem.value,
                        j_star:starLate,
                        icmt : icmtElem.value
                    }
                    console.log(param);
                    fetch('/review/ajax', {
                        method : 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(param)
                    })
                        .then(res => res.json())
                        .then((data) => {

                            if(imgFilesElem){
                                const fData = new FormData();

                                fData.append('ijmt',ijmt);
                                fData.append('icmt',icmtElem.value);

                                Array.from(imgFilesElem.files).forEach(uplFile=>{
                                    fData.append('jmtRvImgArr',uplFile);

                                });
                                fetch(`/review/ajax/img`,{
                                    'method':'POST',
                                    'body':fData
                                }).then(res=>res.json())
                                    .then(data=>{
                                        console.log(data);
                                        location.href=`/jmt/${ijmt}`;

                                    })
                            }
                        }).catch((e) =>{
                        console.log(e);
                    });
                });
            }

        }

        //별점 마킹 모듈 프로토타입으로 생성
        function Rating(){};
        Rating.prototype.rate = 0;
        Rating.prototype.setRate = function(newrate){
            //별점 마킹 - 클릭한 별 이하 모든 별 체크 처리
            this.rate = newrate;
            let items = document.querySelectorAll('.rate_radio');
            items.forEach(function(item, idx){
                if(idx < newrate){
                    item.checked = true;
                }else{
                    item.checked = false;
                }
            });
        }
        let rating = new Rating();//별점 인스턴스 생성

        if(updStarElem){
            rating.setRate(updStarElem.value);
            starLate = updStarElem.value;
        }

        document.addEventListener('DOMContentLoaded', function(){
            //별점선택 이벤트 리스너
            document.querySelector('.rating').addEventListener('click',function(e){
                let elem = e.target;
                if(elem.classList.contains('rate_radio')){
                    rating.setRate(parseInt(elem.value));
                    starLate = rating.rate;
                }
            })
        });
    })();


    console.log(starLate);
}