{
    let currentPage = 1; //현재 페이지
    let maxPage = 1;
    const recordCount = 5; //레코드 수
    const pagingCount = 5; //페이징의 페이징 수

    const noticeListElem = document.querySelector('#notice_list');

    // 새 글 추가시 new 표시.
    function newtimepassed(rdt){
        let timearr = rdt.split(' ');
        let timeymd = timearr[0].split('-');
        let timehms = timearr[1].split(':');
        var rdtDate = new Date(timeymd[0],parseInt(timeymd[1])-1,timeymd[2],timehms[0],timehms[1]);
        var curDate = new Date(year,month,data,hours,minutes);
        var elapsedSec = (curDate.getTime()-rdtDate.getTime())/60000;
        if(elapsedSec <= 1440){
            return "New";
        } else if(elapsedSec > 1440){
            return '';
        }
    }


    // 공지사항 리스트 정보 가져오기
    const getList = () => {
        fetch(`/notice/list?currentPage=${currentPage}&recordCount=${recordCount}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                makeList(data);
            });
    };

    // 마지막 페이지 값.
    const getMaxPageVal = () => {
        fetch(`/notice/maxpage?recordCount=${recordCount}`)
            .then(res => res.json())
            .then(list => {
                console.log(list);
                maxPage = list;
                makePaging();
            });
    };
    getMaxPageVal();

    const makePaging = () => {
        const ulElem = document.querySelector('#pagination');
        ulElem.innerHTML = null;

        const calcPage = parseInt((currentPage - 1) / pagingCount);
        const startPage = (calcPage * pagingCount) + 1;
        const lastPage = (calcPage + 1) * pagingCount;

        if (startPage > 1) {
            const liElem = document.createElement('li');
            ulElem.appendChild(liElem);

            liElem.className = 'page-item page-link pointer';
            liElem.innerHTML = '&lt;';
            liElem.addEventListener('click', e => {
                currentPage = startPage - 1;
                getList();
                makePaging();
            });
        }

        for (let i = startPage; i <= (lastPage > maxPage ? maxPage : lastPage); i++) {
            const liElem = document.createElement('li');
            ulElem.appendChild(liElem);

            liElem.className = 'page-item page-link pointer';
            liElem.innerText = i;
            liElem.addEventListener('click', e => {
                if (currentPage !== i) {
                    currentPage = i;
                    getList();
                }
            });
        }

        if (maxPage > lastPage) {
            const liElem = document.createElement('li');
            ulElem.appendChild(liElem);

            liElem.className = 'page-item page-link pointer';
            liElem.innerHTML = '&gt;';
            liElem.addEventListener('click', e => {
                currentPage = lastPage + 1;
                getList();
                makePaging();
            });
        }

    }

    // 리스트 만들기.
    const makeList = list => {
        const tbodyElem = noticeListElem.querySelector('table tbody');
        tbodyElem.innerHTML = null;

        list.forEach(item => {
            const trElem = document.createElement('tr');
            tbodyElem.appendChild(trElem);

            trElem.innerHTML = `
                <td>${item.inotice}</td>
                <td>${item.n_title} <span class="new_icon">${newtimepassed(item.n_rdt)}</span></td>
                <td>${item.n_hits}</td>
                <td>${item.n_rdt.split(' ')[0]}</td>
            `;
            trElem.addEventListener('click', e => {
                location.href = `/notice/detail?inotice=${item.inotice}`;
            });
        });
    }
    getList();
}