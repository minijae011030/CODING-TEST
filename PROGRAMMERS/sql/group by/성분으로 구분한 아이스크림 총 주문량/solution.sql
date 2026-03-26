-- 코드를 입력하세요
-- 상반기동안 아이스크림 성분타입, 성분타입에 대한 총주문량
SELECT INGREDIENT_TYPE, sum(TOTAL_ORDER)
    from FIRST_HALF join ICECREAM_INFO
    using (FLAVOR)
    group by INGREDIENT_TYPE
    order by sum(TOTAL_ORDER)