-- 코드를 작성해주세요
-- 아이템의 희귀도가 RARE인 아이템들을 모은다음..
-- 업그레이드 아이템의 아이디, 이름, 희귀도 출력

select ITEM_ID, ITEM_NAME, RARITY from (select ITEM_TREE.ITEM_ID
    from ITEM_INFO join ITEM_TREE
    on ITEM_INFO.ITEM_ID = ITEM_TREE.PARENT_ITEM_ID
    where   ITEM_INFO.RARITY = 'RARE') as ID join ITEM_INFO
    using (ITEM_ID)
    order by ITEM_ID desc;