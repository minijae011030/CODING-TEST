-- 코드를 입력하세요
-- 입양을 간 기록은 있는데 보호소에 들어온 기록이 없는 동물의 id, 이름 조회

SELECT ANIMAL_ID, ANIMAL_OUTS.NAME
    from ANIMAL_INS right outer join ANIMAL_OUTS
    using (ANIMAL_ID)
    where ANIMAL_INS.DATETIME is null
    order by ANIMAL_ID, NAME