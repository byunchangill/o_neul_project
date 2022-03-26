{
    const jmtMapElem = document.querySelector('#jmtmap');//지도를 담을 영역의 DOM 레퍼런스
    let jmt_addr = document.querySelector('#jmt_addr');

    let pageCount = 1;
    let jmtArr = [];
    let curPageArr = [];
    let isConnected = 0;

//현재위치를 받아서 좌표에 찍기, 좌표값을 이용해 현재위치 주소값 알기
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition((pos)=> {
        console.log(pos.coords.latitude);
        console.log(typeof pos.coords.latitude);

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude), // geolocation으로 얻어온 지도의 중심좌표
            level: 6 // 지도의 확대 레벨
        };
        let map = new kakao.maps.Map(jmtMapElem, options); //지도 생성 및 객체 리턴

        //현재위치 마커
        var marker = new kakao.maps.Marker({
            position: options.center
        });
        marker.setMap(map);



        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(options.center.getLng(), options.center.getLat(), (result, status)=> {
            if (status === kakao.maps.services.Status.OK) {
                let addrArr = result[0].address.address_name.split(' ');
                let addr = addrArr[0]+' '+addrArr[1]+' '+addrArr[2];
                jmt_addr.innerHTML = `${addr} 맛집`;
            }
        });
        var markers = [];

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({zIndex: 1});

        // 키워드로 장소를 검색합니다
        searchPlaces();

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch('맛집', placesSearchCB, {
                location: options.center,
                radius: 5000,
                category_group_code: 'FD6',
            });
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                if(pageCount>pagination.last){
                    if(isConnected == 0){

                        console.log(jmtArr);
                        fetch('/jmt/ajax', {
                            method: 'post',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(jmtArr)
                        })
                            .then(res => res.json())
                            .then((data) => {
                            isConnected++;
                            jmtArr=data;

                            let listTextElem = document.querySelector('#list_text');
                            listTextElem.innerHTML= `
                                    현재 주변 맛집이 ${jmtArr.length}개 있습니다.
                            
                                `

                            let pickItem = jmtArr[Math.floor(Math.random() * jmtArr.length)];
                            //하나 pick된거 만들어주기
                            const jmtPickElem = document.querySelector('#jmt_pick');
                            let divElem = document.createElement('div');
                            let imgElem = document.createElement('img');
                            let ctntDivElem = document.createElement('div');

                            imgElem.addEventListener('error',e=>{
                                imgElem.src = '/img/imgerr.jpg';
                            });
                            imgElem.addEventListener('click',e=>{
                                location.href=`/jmt/${pickItem.ijmt}`;
                            })


                            imgElem.src = '/img/imgerr.jpg';
                            if(pickItem.jpList.length>0){
                                for(let i = 0;i<pickItem.jpList.length;i++){
                                    if(!pickItem.jpList[i].orgurl.includes('naver')){
                                        imgElem.src = pickItem.jpList[i].orgurl;
                                        break;
                                    }
                                }
                            }
                            let starCount = Math.round(pickItem.jstars);
                            const starDiv = document.createElement('div');
                            starDiv.classList.add('jmt-item-star');
                                if(starCount>0){
                                    for(let i = 0; i<starCount;i++){
                                        starDiv.innerHTML+=`<i class="fa-solid fa-star"></i>`;
                                    }
                                }else {
                                    starDiv.innerHTML = `<i class="fa-regular fa-star"></i>`;
                                }
                                starDiv.innerHTML += `(${pickItem.jstars})`;

                                ctntDivElem.innerHTML=`
                                <div class="text-emph f-s-20 mt20">[${pickItem.j_catenm}] ${pickItem.j_placenm}</div>
                                <div><i class="g fa-solid fa-location-dot"></i>&nbsp;${pickItem.j_newaddr}</div>
                                <div><i class="fa-solid fa-signs-post"></i>&nbsp;${pickItem.j_oldaddr}</div>
                            `;
                                ctntDivElem.append(starDiv);



                            ctntDivElem.classList.add('g10');
                            ctntDivElem.classList.add('flex-c-c');

                            divElem.classList.add('jmt-pick-item');
                            divElem.classList.add('flex-c-c');

                            divElem.append(imgElem);
                            divElem.append(ctntDivElem);
                            jmtPickElem.append(divElem);

                            pagination.gotoFirst();
                        }).catch((e) =>{
                            console.log(e);
                        });
                    }else {
                        displayPlaces(data);
                    }
                }
                // 페이지 번호를 표출합니다
                displayPagination(pagination,data);


            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                let maptitleElem = document.querySelector('#map_title');
                maptitleElem.innerHTML = `주변(5km)에 식당이 없습니다`;
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            var bounds = new kakao.maps.LatLngBounds();

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            curPageArr.splice(0);

            for(let i = 0;i<places.length;i++){
                for(let k=0;k<jmtArr.length;k++){
                    if(places[i].id==jmtArr[k].ijmt){
                        curPageArr.push(jmtArr[k]);
                    }
                }
            }
            makeImgJmtList(curPageArr);
            for (var i = 0; i < places.length; i++) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i);

                console.log(places[i].id);
                //getKakaoJsonData(places[i].id);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function (marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infowindow.close();
                    });

                })(marker, places[i]);

            }
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
        //이미지 리스트 만들어주기
        makeImgJmtList = (curPageArr)=>{
            const jmtListBox = document.querySelector('#jmt_list_box');
            removeChild(jmtListBox);
            curPageArr.forEach(item=>{
                let divElem = document.createElement('div');
                let imgElem = document.createElement('img');
                let spanElem1 = document.createElement('span');
                let spanElem2 = document.createElement('span');

                divElem.classList.add('jmt-list-item');

                divElem.addEventListener('click',ev => {
                    location.href=`/jmt/${item.ijmt}`;
                });
                imgElem.addEventListener('error',e=>{
                    imgElem.src = '/img/imgerr.jpg';
                });
                imgElem.src = '/img/imgerr.jpg';
                if(item.jpList.length>0){
                    for(let i = 0;i<item.jpList.length;i++){
                        if(!item.jpList[i].orgurl.includes('naver')){
                            imgElem.src = item.jpList[i].orgurl;
                            break;
                        }
                    }
                }
                let starCount = Math.round(item.jstars);
                const starDiv = document.createElement('div');
                starDiv.classList.add('jmt-item-star');
                if(starCount>0){
                    for(let i = 0; i<starCount;i++){
                        starDiv.innerHTML+=`<i class="fa-solid fa-star"></i>`;
                    }
                }else {
                    starDiv.innerHTML = `<i class="fa-regular fa-star"></i>`;
                }
                starDiv.innerHTML += `(${item.jstars})`;


                spanElem1.innerHTML = `
                    [${item.j_catenm}] 
                `;
                spanElem1.append(starDiv);

                spanElem2.innerHTML=`
                    ${item.j_placenm}
                `;
                spanElem1.classList.add('jmt-item-span1');

                divElem.addEventListener('mouseover',ev => {
                    divElem.classList.add('jmt-item-click');
                });
                divElem.addEventListener('mouseout',ev => {
                    divElem.classList.remove('jmt-item-click');
                });

                divElem.append(imgElem);
                divElem.append(spanElem1);
                divElem.append(spanElem2);

                jmtListBox.append(divElem);

            });
            LoadingCancel();
        }
        // 검색결과 목록 하단에 페이지번호를 표시는 함수
        //여기서 jmtArr에 값을 추가해줌
        function displayPagination(pagination,data) {
            if(pageCount>pagination.last){
                var paginationEl = document.getElementById('list_page_box'),
                    fragment = document.createDocumentFragment(),
                    i;

                // 기존에 추가된 페이지번호를 삭제합니다
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild (paginationEl.lastChild);
                }

                for (i=1; i<=pagination.last; i++) {
                    var el = document.createElement('div');
                    el.innerHTML = i;

                    if (i===pagination.current) {
                        el.className = 'page-clicked';
                    } else {
                        el.onclick = (function(i) {
                            return function() {
                                pagination.gotoPage(i);
                            }
                        })(i);
                    }

                    fragment.appendChild(el);
                }
                paginationEl.appendChild(fragment);

            }else {
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

                    jmtArr.push(JmtEntity);

                });

                console.log(data);
                if(pageCount==pagination.last){
                    pageCount++;
                    pagination.gotoFirst();
                }else {
                    pageCount++;
                    pagination.nextPage();
                }
            }

        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, place) {
            var content = '<div style="padding:5px;z-index:1;">' + place.place_name + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    });
}
LoadingStart();