-- 코드를 입력하세요
-- 자동차 종류가 suv인 자동차들의 평균 일일 대여 요금
SELECT round(avg(daily_fee)) as AVERAGE_FEE 
    from CAR_RENTAL_COMPANY_CAR t
    where t.car_type = 'SUV'