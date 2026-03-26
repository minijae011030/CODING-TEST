-- 코드를 입력하세요
-- 보호 시작일보다 입양일이 더 빠른 동물의 아이디, 이름 조회
-- 보호 시작일이 빠른 순으로 조회
SELECT ANIMAL_ID, ANIMAL_INS.NAME
    from ANIMAL_INS join ANIMAL_OUTS
    using (ANIMAL_ID)
    where ANIMAL_INS.DATETIME > ANIMAL_OUTS.DATETIME
    order by ANIMAL_INS.DATETIME