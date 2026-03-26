-- 코드를 입력하세요
-- 2022/10/5 에 등록된 중고거래 조회
SELECT BOARD_ID, WRITER_ID, TITLE, PRICE, (
    case STATUS
        when 'SALE' then '판매중'
        when 'RESERVED' then '예약중'
        else '거래완료'
    end
) as STATUS
    from USED_GOODS_BOARD
    where CREATED_DATE = '2022-10-05'
    order by BOARD_ID desc