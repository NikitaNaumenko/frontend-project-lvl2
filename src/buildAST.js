import _ from 'lodash';

const types = [
  {
    type: 'nested',
    check: (key, data1, data2) => (
      _.isObject(data1[key]) && _.isObject(data2[key])
    ),
    process: (key, data1, data2, func) => (
      { key, type: 'nest', children: func(data1[key], data2[key]) }
    ),
  },
  {
    type: 'unchanged',
    check: (key, data1, data2) => (
      _.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]
    ),
    process: (key, data1) => ({ key, valueBefore: data1[key], type: 'unchanged' }),
  },
  {
    type: 'changed',
    check: (key, data1, data2) => (
      _.has(data1, key) && _.has(data2, key)
    ),
    process: (key, data1, data2) => ({
      key, valueBefore: data1[key], valueAfter: data2[key], type: 'changed',
    }),
  },
  {
    type: 'added',
    check: (key, data1, data2) => !_.has(data1, key) && _.has(data2, key),
    process: (key, _data1, data2) => ({ key, valueAfter: data2[key], type: 'added' }),
  },
  {
    type: 'deleted',
    check: (key, data1, data2) => _.has(data1, key) && !_.has(data2, key),
    process: (key, data1) => ({ key, valueBefore: data1[key], type: 'deleted' }),
  },
];

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  return keys.reduce((acc, key) => {
    const { process } = types.find(({ check }) => check(key, data1, data2));
    return [...acc, process(key, data1, data2, buildAST)];
  }, []);
};

export default (data1, data2) => ({ type: 'root', children: buildAST(data1, data2) });
