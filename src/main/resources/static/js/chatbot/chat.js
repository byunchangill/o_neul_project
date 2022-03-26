{
    // chatbot on / off 기능
    const chatBtnElem = document.querySelector('#chat_btn');
    const chatMainElem = document.querySelector('#chat_main');
    const chatMainCloseElem = document.querySelector('#chat_main_close');
    const chatSentence = document.querySelector('#sentence');

    const firstSentence = chatSentence.innerHTML;

    const reSetBtnDiv = document.createElement('div');

    chatBtnElem.addEventListener('click', e => {
        chatBtnElem.style.display = "none";
        chatMainElem.style.display = "block";
    });

    chatMainCloseElem.addEventListener('click', e => {
        chatSentence.innerHTML = firstSentence;
        makeEvent();
        chatBtnElem.style.display = "block";
        chatMainElem.style.display = "none";
    });


    function makeEvent() {

        // 맛집, 메뉴, 고객문의 선택지.
        const foodJmtElem = document.querySelector('#food_jmt');
        const chatMenuElem = document.querySelector('#chat_menu');
        const chatCustomerElem = document.querySelector('#chat_customer');
        const questionElem = document.querySelector('#question');

        // 스크롤 맨 하단으로 계속 이동.
        questionElem.addEventListener('DOMNodeInserted',e=>{
            questionElem.lastChild.scrollIntoView({behavior : 'smooth'});
        });

        // 처음으로 클릭시 스크롤 상위로 올리기.
        chatMainElem.scrollTo({top:0, left:0, behavior:'auto'});

        // 맛집 선택시 맛집 추가 선택지.
        const jmtTypeDiv = document.createElement('div');
        const todayJmtDiv = document.createElement('div');
        const tvJmtDiv = document.createElement('div');

        foodJmtElem.addEventListener('click', e => {
            jmtTypeDiv.innerHTML = "맛집중에는 오늘의 맛집과 방송 맛집이 있습니다. 둘중 하나를 선택해주세요.";
            jmtTypeDiv.className = "jmt_type";

            todayJmtDiv.innerHTML = "오늘의 맛집";
            todayJmtDiv.className = "today_jmt";

            tvJmtDiv.innerHTML = "TV 맛집";
            tvJmtDiv.className = "tv_jmt";

            reSetBtnDiv.innerHTML = "처음으로";
            reSetBtnDiv.className = "reset_btn";

            questionElem.append(jmtTypeDiv);
            questionElem.append(todayJmtDiv);
            questionElem.append(tvJmtDiv);
            questionElem.append(reSetBtnDiv);

            // 오늘의 맛집 클릭시 오늘의 맛집으로 주소 이동.
            todayJmtDiv.addEventListener('click', e => {
                location.href = "/jmt";
            });

            reSetBtnDiv.addEventListener('click', e => {
                chatSentence.innerHTML = firstSentence;
                makeEvent();
            });
        });

        // TV 맛집 클릭시 TV 맛집 추가 선택지.
        const tvTypeDiv = document.createElement('div');
        const deliciousMensDiv = document.createElement('div');
        const threeKingsDiv = document.createElement('div');
        const liveInformationDiv = document.createElement('div');
        const wednesdayPartyDiv = document.createElement('div');
        const youngJaLoadDiv = document.createElement('div');
        const tastyRoadDIv = document.createElement('div');

        tvJmtDiv.addEventListener('click', e => {
            tvTypeDiv.innerHTML = "요즘 영자로드 모르는 사람 있어?? 하지만 다양한 프로그램이 있으니 원하는 프로그램을 선택해주세요.";
            tvTypeDiv.className = "tv_type";

            deliciousMensDiv.innerHTML = "맛있는 녀석들";
            deliciousMensDiv.className = "delicious_mens";

            threeKingsDiv.innerHTML = "백종원의 3대천왕";
            threeKingsDiv.className = "three_kings";

            liveInformationDiv.innerHTML = "생생정보통";
            liveInformationDiv.className = "live_information";

            wednesdayPartyDiv.innerHTML = "수요미식회";
            wednesdayPartyDiv.className = "wednesday_party";

            youngJaLoadDiv.innerHTML = "영자로드";
            youngJaLoadDiv.className = "youngJa_load";

            tastyRoadDIv.innerHTML = "테이스티로드";
            tastyRoadDIv.className = "tasty_road";

            questionElem.append(tvTypeDiv);
            questionElem.append(deliciousMensDiv);
            questionElem.append(threeKingsDiv);
            questionElem.append(liveInformationDiv);
            questionElem.append(wednesdayPartyDiv);
            questionElem.append(youngJaLoadDiv);
            questionElem.append(tastyRoadDIv);
            questionElem.append(reSetBtnDiv);

            deliciousMensDiv.addEventListener('click', e => {
                location.href = "/tv/1";
            });

            threeKingsDiv.addEventListener('click', e => {
                location.href = "/tv/2";
            });

            liveInformationDiv.addEventListener('click', e => {
                location.href = "/tv/3";
            });

            wednesdayPartyDiv.addEventListener('click', e => {
                location.href = "/tv/4";
            });

            youngJaLoadDiv.addEventListener('click', e => {
                location.href = "/tv/5";
            });

            tastyRoadDIv.addEventListener('click', e => {
                location.href = "/tv/6";
            });
        });

        // 메뉴 선텍시 메뉴 추가 선택지
        const menuTypeDiv = document.createElement('div');
        const toDayFoodDiv = document.createElement('div');
        const seasonMenuDiv = document.createElement('div');
        const alcoholMenuDiv = document.createElement('div');

        chatMenuElem.addEventListener('click', e => {
            menuTypeDiv.innerHTML = "메뉴 고르는게 이 세상에서 제일 힘든것같아요 ... 저도 항상 고민중입니다. 당신의 선택을 쉽게 도아드릴게요. 아래중 하나를 선택해주세요.";
            menuTypeDiv.className = "menu_type";

            toDayFoodDiv.innerHTML = "오늘의 음식";
            toDayFoodDiv.className = "today_food";

            seasonMenuDiv.innerHTML = "계절 메뉴";
            seasonMenuDiv.className = "season_menu";

            alcoholMenuDiv.innerHTML = "술 페어링";
            alcoholMenuDiv.className = "alcohol_menu";

            reSetBtnDiv.innerHTML = "처음으로";
            reSetBtnDiv.className = "reset_btn";

            questionElem.append(menuTypeDiv);
            questionElem.append(toDayFoodDiv);
            questionElem.append(seasonMenuDiv);
            questionElem.append(alcoholMenuDiv);
            questionElem.append(reSetBtnDiv);

            reSetBtnDiv.addEventListener('click', e => {
                chatSentence.innerHTML = firstSentence;
                makeEvent();
            });
        });

        // 오늘의 음식 클릭시
        const toDayQuestionDiv = document.createElement('div');
        const moveToDayFoodDiv = document.createElement('div');
        toDayFoodDiv.addEventListener('click', e => {
            toDayQuestionDiv.innerHTML = "혹시 싫어하는 음식이나 재료가 있으신가요? 있으시다면 체크해주세요 제가 빼고 찾아드릴게요. 그럼 오늘의 음식으로 이동할까요??";
            toDayQuestionDiv.className = "today_question";

            moveToDayFoodDiv.innerHTML = "이동하기";
            moveToDayFoodDiv.className = "move_today_food";

            questionElem.append(toDayQuestionDiv);
            questionElem.append(moveToDayFoodDiv);
            questionElem.append(reSetBtnDiv);

            // 오늘의 음식 페이지 이동.
            moveToDayFoodDiv.addEventListener('click', e => {
                location.href = "/food";
            });
        });

        // 계절 메뉴 클릭시 선택지.
        const seasonTypeDiv = document.createElement('div');
        const springDiv = document.createElement('div');
        const summerDiv = document.createElement('div');
        const failDiv = document.createElement('div');
        const winterDiv = document.createElement('div');

        seasonMenuDiv.addEventListener('click', e => {
            seasonTypeDiv.innerHTML = "저는 사계절중에 봄 / 가을을 좋아해요. 선선한 바람을 느끼며 자유롭게 날아가고싶어요~ 당신은 어떤 계절을 좋아하나요?";
            seasonTypeDiv.className = "season_type";

            springDiv.innerHTML = "봄";
            springDiv.className = "spring";

            summerDiv.innerHTML = "여름";
            summerDiv.className = "summer";

            failDiv.innerHTML = "가을";
            failDiv.className = "fail";

            winterDiv.innerHTML = "겨울";
            winterDiv.className = "winter";

            questionElem.append(seasonTypeDiv);
            questionElem.append(springDiv);
            questionElem.append(summerDiv);
            questionElem.append(failDiv);
            questionElem.append(winterDiv);
            questionElem.append(reSetBtnDiv);

            springDiv.addEventListener('click', e => {
                location.href = "/season";
            });

            summerDiv.addEventListener('click', e => {
                location.href = "/season";
            });

            failDiv.addEventListener('click', e => {
                location.href = "/season";
            });

            winterDiv.addEventListener('click', e => {
                location.href = "/season";
            });
        });

        // 술 페어링 클릭시 선택지.
        const alcoholTypeDiv = document.createElement('div');
        const sojuDiv = document.createElement('div');
        const beerDiv = document.createElement('div');
        const makgeolliDiv = document.createElement('div');
        const westernAlcoholDiv = document.createElement('div');

        alcoholMenuDiv.addEventListener('click', e => {
            alcoholTypeDiv.innerHTML = "술은 역시 소맥이죠!!! 그렇지만 당신의 취향을 존중합니다.";
            alcoholTypeDiv.className = "alcohol_type";

            sojuDiv.innerHTML = "소주";
            sojuDiv.className = "soju";

            beerDiv.innerHTML = "맥주";
            beerDiv.className = "beer";

            makgeolliDiv.innerHTML = "막걸리";
            makgeolliDiv.className = "makgeolli";

            westernAlcoholDiv.innerHTML = "양주";
            westernAlcoholDiv.className = "westernAlcohol";

            questionElem.append(alcoholTypeDiv);
            questionElem.append(sojuDiv);
            questionElem.append(beerDiv);
            questionElem.append(makgeolliDiv);
            questionElem.append(westernAlcoholDiv);
            questionElem.append(reSetBtnDiv);

            sojuDiv.addEventListener('click', e => {
                location.href = "alc";
            });

            beerDiv.addEventListener('click', e => {
                location.href = "alc";
            });

            makgeolliDiv.addEventListener('click', e => {
                location.href = "alc";
            });

            westernAlcoholDiv.addEventListener('click', e => {
                location.href = "alc";
            });
        });

        // 고객문의 클릭시 선택지
        const customerTypeDiv = document.createElement('div');
        const telDiv = document.createElement('div');
        const noticeDiv = document.createElement('div');

        chatCustomerElem.addEventListener('click', e => {
            customerTypeDiv.innerHTML = "저를 찾으셨나요? 무엇이 궁금하신가요?";
            customerTypeDiv.className = "customer_type";

            telDiv.innerHTML = "고객센터전화번호";
            telDiv.className = "tel";

            noticeDiv.innerHTML = "공지사항";
            noticeDiv.className = "notice";

            reSetBtnDiv.innerHTML = "처음으로";
            reSetBtnDiv.className = "reset_btn";

            questionElem.append(customerTypeDiv);
            questionElem.append(telDiv);
            questionElem.append(noticeDiv);
            questionElem.append(reSetBtnDiv);

            reSetBtnDiv.addEventListener('click', e => {
                chatSentence.innerHTML = firstSentence;
                makeEvent();
            });
        });

        // 고객 센터 전화번호 클릭시
        const chatTelDiv = document.createElement('div');
        const telNumberDiv = document.createElement('div');
        telDiv.addEventListener('click', e => {
            chatTelDiv.innerHTML = "문의 사항이 있으시면 아래번호로 전화주세요.";
            chatTelDiv.className = "chat_tel";

            telNumberDiv.innerHTML = "010-5185-8980 손동윤";
            telNumberDiv.className = "tel_number";

            questionElem.append(chatTelDiv);
            questionElem.append(telNumberDiv);
            questionElem.append(reSetBtnDiv);
        });

        // 공지사항 클릭시
        const noticeTypeDiv = document.createElement('div');
        const moveNoticeDiv = document.createElement('div');
        noticeDiv.addEventListener('click', e => {
            noticeTypeDiv.innerHTML = "공지사항에는 각종 이벤트와 당신을 위한 유익한 정보들이 많이 있습니다.";
            noticeTypeDiv.className = "notice_type";

            moveNoticeDiv.innerHTML = "이동하기";
            moveNoticeDiv.className = "move_notice";

            questionElem.append(noticeTypeDiv);
            questionElem.append(moveNoticeDiv);
            questionElem.append(reSetBtnDiv);

            moveNoticeDiv.addEventListener('click', e => {
                location.href = "/notice";
            });
        });
    }
    makeEvent();
}
