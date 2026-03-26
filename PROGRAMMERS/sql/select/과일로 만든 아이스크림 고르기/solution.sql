-- 코드를 입력하세요
SELECT FLAVOR 
    from ICECREAM_INFO join FIRST_HALF
    using (FLAVOR)
    where INGREDIENT_TYPE = 'fruit_based' and TOTAL_ORDER >= 3000
    order by TOTAL_ORDER desc;