## 프로그래머스 7daySQL 챌린지 후기 및 sql 설명

프로그래머스에서 7day SQL 챌린지라는 걸 했다.
7일 동안 열심히 SQL 문제를 2문제씩 풀면
경품을 통해 갤럭시 버즈를 준다고 해서 응모를 하려고 문제를 풀었다.

이미 SQLD도 있고 동아리도 데이터 관련 동아리라 SQL은 꽤 자신이 있는 편이라서
편한 마음으로 참가 하였다.


1일차는 가벼운 SELECT 문이었다.
내가 짠 코드는 이렇다. 
 1. SELECT * FROM ANIMAL_INS ORDER BY ANIMAL_ID;
   - ANIMAL_INS의 모든 컬럼을 조회한다. ANIMAL_ID 순으로 정렬 한다.
 2. SELECT NAME, DATETIME FROM ANIMAL_INS ORDER BY ANIMAL_ID DESC;
   - ANIMAL_INS의 NAME, DATETIME을 조회한다. ANIMAL_ID의 내림차순으로 정렬한다.
   
2일차는 SELECT 문에 프로그래밍의 if 문과 비슷한 기능을 하는 where 절 문제였다.
 3. SELECT ANIMAL_ID, NAME FROM ANIMAL_INS WHERE INTAKE_CONDITION="Sick" order by ANIMAL_ID;
    - ANIMAL_INS의 INTAKE-CONDITION이 "Sick"인 ANIMAL_ID와 NAME을 조회한다. ANIMAL_ID 순으로 정렬한다.
 4. SELECT ANIMAL_ID, NAME FROM ANIMAL_INS WHERE INTAKE_CONDITION != "Aged" order by ANIMAL_ID;
    - ANIMAL_INS의 INTAKE_CONDITION이 "Aged"가 아닌 ANIMAL_ID 와 NAME을 조회한다. ANIMAL_ID 순으로 정렬한다.
 
3일차는 통계를 내라고 되어있었다. 그래서 MIN, MAX 등의 함수를 쓰는거겠구나 짐작했다.
 5. SELECT MIN(DATETIME) 시간 FROM ANIMAL_INS;
    - ANIMAL_INS의 DATETIME이 최소인 시간을 조회한다.

 6. SELECT ANIMAL_ID FROM ANIMAL_INS WHERE NAME IS NULL ORDER BY ANIMAL_ID;
    - ANIMAL_INS의 NAME이 NULL인 ANIMAL_ID를 조회한다. ANIMAL_ID 순으로 정렬한다.
    
4일차는 GROUP BY를 활용해서 동물들이 몇마리 있는지 세는 것이었다. GROUP BY를 사용하여 특정 그룹별로 묶어서 COUNT(*)로 개수를 세었다.

 7. SELECT ANIMAL_TYPE, count(*) from ANIMAL_INS GROUP BY ANIMAL_TYPE;
    - ANIMAL_INS를 ANIMAL_TYPE으로 그룹을 지은뒤 그룹의 ANIMAL_TYPE과 총 개수를 각각 출력한다.
    
 8. SELECT NAME, COUNT(*) FROM ANIMAL_INS WHERE NAME IS NOT NULL GROUP BY NAME HAVING COUNT (*) >=2  ORDER BY NAME;
    - ANIMAL_INS에서 NAME이 NULL이 아닌 것들중에 NAME으로 그룹을 짓고 그것의 COUNT가 2 이상인 것들의 NAME과 COUNT를 조회한다.
      NAME 순으로 정렬한다.
    
5일차는 서브쿼리와 JOIN 문을 활용하는 것이었다.
 
 9. SELECT ANIMAL_ID, NAME FROM ANIMAL_OUTS A WHERE ANIMAL_ID NOT IN (SELECT ANIMAL_ID FROM ANIMAL_INS B) ORDER BY ANIMAL_ID;
    - ANIMAL_OUTS의 ANIMAL_ID가 ANIMAL_INS 에 없는 것들의 ID 와 NAME을 조회한다. ANIMAL_ID로 정렬한다.
    
 10. SELECT ANIMAL_ID, NAME FROM ANIMAL_INS A WHERE DATETIME >= (SELECT DATETIME FROM ANIMAL_OUTS B WHERE A.ANIMAL_ID = B.ANIMAL_ID) ORDER BY DATETIME
    - ANIMAL_INS 와 ANIMAL_OUTS의 ID가 같은 것들의 DATETIME이 ANIMAL_INS가 더 최근인 것들의 ANIMAL_ID 와 NAME을 조회한다. DATETIME 순으로 정렬한다.

6일차는 이제까지 배운 내용을 복습해 SELECT 문을 내것으로 만들어라고 되어있었다.

 11. SELECT NAME, DATETIME FROM ANIMAL_INS A WHERE NOT EXISTS (SELECT ANIMAL_ID FROM ANIMAL_OUTS B WHERE A.ANIMAL_ID = B.ANIMAL_ID) ORDER BY DATETIME LIMIT 3;
    - ANIMAL_INS가 ANIMAL_OUTS에 없는 것들의 NAME과 DATETIME을 조회한다. DATETIME으로 정렬하고 최대 3개만 출력한다.
    
 12. SELECT ANIMAL_ID, ANIMAL_TYPE, NAME FROM ANIMAL_OUTS A WHERE SEX_UPON_OUTCOME != (SELECT SEX_UPON_INTAKE FROM ANIMAL_INS B WHERE A.ANIMAL_ID = B.ANIMAL_ID AND SEX_UPON_INTAKE LIKE '%Intact%') order by ANIMAL_ID;
    - ANIMAL_OUTS의 SEX_UPON_OUTCOME이 ANIMAL_INS와 ID가 같고 ANIMAL_INS SEX_UPON_INTAKE가 단어사이에 INTACT가 들어간 애들과  다른 것들의 ANIMAL_ID, ANIMAL_TYPE, NAME을 출력한다. ANIMAL_ID순으로 정렬한다.

7일차는 마지막날이었는데 문자열을 다루는 실습을 풀어보자고 되어있었다.

 13. SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE FROM ANIMAL_INS WHERE NAME IN ('Lucy','Ella', 'Pickle', 'Rogan','Sabrina', 'Mitty') order by ANIMAL_ID;
    - ANIMAL_INS의 NAME에 'Lucy','Ella', 'Pickle', 'Rogan','Sabrina', 'Mitty' 가 들어가는 것들의 ANIMAL_ID, NAME, SEX_UPON,INTAKE 컬럼을 조회한다. ANIMAL_ID 순으로 정렬한다.
    
 14. SELECT ANIMAL_ID, NAME FROM ANIMAL_INS WHERE ANIMAL_TYPE = 'Dog' and NAME LIKE '%el%' order by NAME;
    - ANIMAL_INS의 ANIMAL_TYPE이 'Dog'이고 NAME 사이에 'el'이 들어가 있는 것들의 ANIMAL_ID와 NAME을 조회한다. NAME순으로 출력한다.
    

대체적으로 그렇게 어려운 문제들이 아니라 좋기도 하면서 아쉽기도 하였다. 7일 동안 이 문제 푸는 시간 기다리면서 재밌었던거 같다.
다음에도 이런 행사 같은게 있으면 참가를 많이 해봐야겠다.
