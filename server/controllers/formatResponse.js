function formatResponse(restRes, apiRes) {
  restRes.setHeader("Content-Type", "application/json");
  restRes.response = JSON.stringify(apiRes);
  return restRes;
}

module.exports = formatResponse;
