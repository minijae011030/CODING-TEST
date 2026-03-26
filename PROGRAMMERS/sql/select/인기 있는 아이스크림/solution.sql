-- 코드를 입력하세요
-- 상반기에 판매된 아이스크림의 맛을 총주문량을 기준으로 내림차순 
SELECT FLAVOR from FIRST_HALF
    order by TOTAL_ORDER desc, SHIPMENT_ID;