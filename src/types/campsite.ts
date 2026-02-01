// 캠핑장 데이터 타입 정의
export interface Campsite {
  // 기본 정보
  contentId: string;           // 콘텐츠 ID (고유 식별자)
  facltNm: string;             // 시설명 (캠핑장 이름)
  lineIntro: string;           // 한줄 소개
  intro: string;               // 소개글
  featureNm: string;           // 특징

  // 위치 정보
  addr1: string;               // 주소
  addr2?: string;              // 상세주소
  doNm: string;                // 도명
  sigunguNm: string;           // 시군구명
  mapX: number;                // 경도 (longitude)
  mapY: number;                // 위도 (latitude)
  direction: string;           // 오시는 길

  // 연락처/홈페이지
  tel: string;                 // 전화번호
  homepage?: string;           // 홈페이지 URL

  // 캠핑장 분류
  induty: string;              // 업종 (일반/자동차/글램핑/카라반)
  lctCl: string;               // 입지구분 (산/숲/해변/강 등)
  facltDivNm: string;          // 사업주체 (민간/지자체)

  // 시설 정보
  brazierCl: string;           // 화로대 (개별/불가 등)
  sbrsCl: string;              // 부대시설 (전기,무선인터넷,온수 등)
  sbrsEtc?: string;            // 기타 부대시설
  posblFcltyCl: string;        // 주변시설 (낚시,수영장,해수욕 등)
  posblFcltyEtc?: string;      // 기타 주변시설

  // 바닥재질 (사이트 수)
  siteBottomCl1: number;       // 잔디
  siteBottomCl2: number;       // 파쇄석
  siteBottomCl3: number;       // 데크
  siteBottomCl4: number;       // 자갈
  siteBottomCl5: number;       // 맨흙

  // 운영 정보
  operPdCl: string;            // 운영기간 (봄,여름,가을,겨울)
  operDeCl: string;            // 운영일 (평일+주말 등)
  hvofBgnde?: string;          // 휴장기간 시작일
  hvofEnddle?: string;         // 휴장기간 종료일

  // 테마/환경
  themaEnvrnCl: string;        // 테마환경 (일출명소,낙조명소 등)
  eqpmnLendCl?: string;        // 장비대여 정보
  animalCmgCl: string;         // 반려동물 동반 가능 여부

  // 이미지
  firstImageUrl: string;       // 대표 이미지 URL

  // 메타 정보
  createdtime: string;         // 등록일
  modifiedtime: string;        // 수정일
}

// 지역 필터용 타입
export interface Region {
  doNm: string;
  sigunguList: string[];
}

// 검색/필터 파라미터
export interface SearchParams {
  keyword?: string;
  doNm?: string;
  sigunguNm?: string;
  induty?: string[];
  lctCl?: string[];
  themaEnvrnCl?: string[];
  sbrsCl?: string[];
  operPdCl?: string[];
}

// 캠핑장 유형 상수
export const INDUTY_OPTIONS = [
  '일반야영장',
  '자동차야영장',
  '글램핑',
  '카라반',
] as const;

// 입지구분 상수
export const LCT_OPTIONS = [
  '산',
  '숲',
  '해변',
  '강',
  '호수',
  '섬',
  '도심',
] as const;

// 운영시즌 상수
export const SEASON_OPTIONS = [
  '봄',
  '여름',
  '가을',
  '겨울',
] as const;

// 테마 상수
export const THEME_OPTIONS = [
  '일출명소',
  '낙조명소',
  '별보기명소',
  '걷기길',
  '수상레저',
  '항공레저',
  '스키',
] as const;
