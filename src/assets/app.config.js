const BASE_URL =
  "http://10.201.234.189:8889/mytel-got-talent-voting-system/cms/auth/";

export const ServiceUrl = {
  SEARCH_GUESTS: `${BASE_URL}find-user`,
  GUESTS: `${BASE_URL}find-all-users`,
  ALL_CONTESTANTS: `${BASE_URL}find-all-candidates`,
  SEARCH_CONTESTANTS: `${BASE_URL}find-candidate`,
  Login: `${BASE_URL}login`,
};

export const WS_URL = "ws://10.201.234.135:8889/mytel-got-talent-voting-system";
