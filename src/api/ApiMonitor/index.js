import Http from "../../services/index";

const apis = {
  // pv上报
  getToolReport: (params) => Http.get(`/report/getToolList`, params),
};

export default apis;
