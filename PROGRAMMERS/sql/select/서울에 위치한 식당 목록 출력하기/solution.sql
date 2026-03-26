-- 코드를 입력하세요
select REST_ID, REST_NAME, FOOD_TYPE, FAVORITES, ADDRESS, round(avg(REVIEW_SCORE), 2) as SCORE
    from REST_REVIEW join (select * from REST_INFO where address like "서울%") as REST_INFO
    using (REST_ID)
    group by REST_ID
    order by SCORE desc, FAVORITES desc;