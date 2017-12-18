# Modal Window 정의
  - 사용자 인터페이스 디자인 개념에서 자식 윈도에서 부모 윈도로 돌아가기 전에 사용자의 상호동작을 요구하는 창. 응용 프로그램의 메인 창의 작업 흐름을 방해한다.

# Native HTML의 한계점
  - 팝업이 떴다라는 정보를 인지할 수 없다. (?)
  - 팝업 이외의 문서 정보에 접근이 된다.
  - 키보드 tab키 운용이 팝업을 벗어난다.

# 요구사항
  - 팝업이 열렸을 때 팝업 내용 인식 가능
  - 팝업 아래의 Windows는 비활성화
  - tab키 운용이 팝업 내부에서만 순환

# Keyboard Interaction
  - 대화상자가 열리면 포커스가 대화 상자 안의 요소로 이동.
    - 포커스 가능한 첫번째 요소에 초점 설정
    - 콘텐츠가 너무 많아서 첫번째 포커스 가능한 요소로 초점을 이동시키는 것이 콘텐츠의 시작 부분을 스크롤 밖으로 밀어낼 경우나
    - 대화상자 안에 초점을 받을 수 있는 요소가 없을 경우에는 정적 요소에 tabindex="-1" 추가하여 여기에 초점 이동
  - Tab
    - 대화상자 내 다음 tabbable 요소로 이동
    - 마지막 tabbable 요소에 있는 경우 포커스를 대화상자 내 첫 번째 tabbable 요소로 이동
  - Shift + Tab
    - 대화상자 내 이전 tabbable 요소로 이동
    - 첫번째 tabbable 요소에 있는 경우 포커스를 대화상자 내 마지막 tabbable 요소로 이동
  - ESC
    - 대화상자 닫기


# 참고자료
- [SSB BART group- ARIA Dialog Role](https://labs.ssbbartgroup.com/index.php/ARIA_Dialog_Role)
- [Dialog (Modal) Design Patterns - W3C](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal)