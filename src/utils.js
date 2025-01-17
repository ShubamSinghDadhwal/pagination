const parseJSON = async (response) => {
    try {
      return await response.json();
    } catch (e) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
  
export const request = async (url, options) => {
  const response = await fetch(url, options);
  const responseData = await parseJSON(response);
  return responseData;
};

export const getRange = (startPage, endPage) => {
  const rangeList = [];
  for (let i = startPage; i <= endPage; i++) {
    rangeList.push(i);
  }
  return rangeList;
}

export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatPercentage = (percentage) => {
  return `${percentage.toFixed(0)}%`;
};
