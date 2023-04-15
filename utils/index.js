export const TableHeadersToFilterOptions = (
  headersArr = [],
  excludeList = []
) => {
  let options = [];
  headersArr.forEach((x, idx, arr) => {
    if (!excludeList.includes(x.title)) {
      options.push({
        label: x.title,
        value: x.key,
      });
    }
  });

  return options;
};

export const FilterOptionFromHeader = (headerArr = []) => {
  return headerArr.reduce((arr, curr) => {
    if (curr.searchable) {
      return [
        ...arr,
        {
          label: curr.title,
          value: curr.key,
        },
      ];
    }
  }, []);
};

export const basicFormValidation = (initialValues) => {
  let validations = {};
  Object.entries(initialValues).map(([key, value]) => {
    if (typeof value === "number") {
      validations[key] = (value) => {
        return value < 1 && `${key} is required!`;
      };
    } else if (typeof value === "string") {
      validations[key] = (value) => {
        return !value && `${key} is required!`;
      };
    }
  });
  return validations;
};

// export const DebounceHandler = (fn = () => {}, delay = 500) => {
//   let timerInstance: null | any;
//   return (...rest:any) => {
//     clearTimeout(timerInstance);
//     timerInstance = setTimeout(() => {
//       fn(...rest);
//     }, delay);
//   };
// };

export const nestedProps = (obj, str) => {
  return str.split(".").reduce((a, v) => (a ? a[v] : "N / A"), obj);
};

export const queryMaker = (queries) => {
  if (!queries || !Object.keys(queries)?.length) {
    return `?_page=1&_limit=10`;
  }
  let exclude = ["page", "limit"];
  let queryArr = [];
  Object.entries(queries).map(([key, value]) => {
    if (!exclude.includes(key)) {
      queryArr.push(`${key}_like=${value}`);
    }
  });
  let page = queries.page || 1;
  let limit = queries.limit || 10;
  queryArr = [...queryArr, `_page=${page}`, `_limit=${limit}`];

  return `?${queryArr.join("&")}`;
};
