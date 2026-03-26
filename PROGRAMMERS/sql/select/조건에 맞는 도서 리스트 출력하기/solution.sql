-- 코드를 입력하세요
-- 2021 인문
SELECT BOOK_ID, date_format(PUBLISHED_DATE, '%Y-%m-%d') as PUBLISHED_DATE 
    from book
    where year(PUBLISHED_DATE) = 2021
    and CATEGORY = '인문'
    order by PUBLISHED_DATE;