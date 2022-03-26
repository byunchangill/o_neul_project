{
    const searchParams = new URL(window.location.href).searchParams;
    const inotice = searchParams.get('inotice');

    // 디테일에서 목록 클릭시 리스트 화면으로 이동.
    const listBtnElem = document.querySelector('#list_btn');
    if(listBtnElem) {
        listBtnElem.addEventListener('click', e => {
            location.href='/notice';
        });
    }

    // 삭제 버튼 클릭시
    const noticeDelElem = document.querySelector('#del');
    const msg = {
        n_isDel: '삭제하시겠습니까?',
        fnIsDel : function(target) {
            return `${target}을(를) ` + this.n_isDel;
        }
    };

    if(noticeDelElem) {
        noticeDelElem.addEventListener('click', e => {
            if(confirm(msg.fnIsDel(  inotice +`번 글`))) {
                location.href=`/notice/del?inotice=${inotice}`;
            }
        });
    }

    //글 수정 버튼
    const noticeUpdateElem = document.querySelector('#update');
    if(noticeUpdateElem) {
        noticeUpdateElem.addEventListener('click', e => {
            location.href=`/notice/update?inotice=${inotice}`;
        });
    }
}
