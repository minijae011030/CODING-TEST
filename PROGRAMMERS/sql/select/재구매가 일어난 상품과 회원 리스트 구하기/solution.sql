-- 코드를 입력하세요
-- 동일한 회원이 동일한 상품을 재구매한 데이터
SELECT user_id, product_id
    from ONLINE_SALE
    group by user_id, product_id
    having count(product_id) >= 2
    order by user_id, product_id desc;