-- 코드를 입력하세요
SELECT NAME
    from ANIMAL_INS
    where (select min(DATETIME) from ANIMAL_INS) = DATETIME