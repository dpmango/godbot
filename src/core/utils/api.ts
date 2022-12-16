export const buildParams = (reqObj: { [key: string]: any }): { [key: string]: string } => {
  let params = {};

  Object.keys(reqObj).forEach((key) => {
    const objVal = reqObj[key];
    if (objVal) {
      params = {
        ...params,
        [key]: objVal.toString(),
      };
    }
  });

  return params;
};
