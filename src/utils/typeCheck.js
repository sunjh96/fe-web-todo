/**
 * @param {*} target
 * @param {*} type
 * 
 * @returns typeof target === type ? target : error
 */

const typeCheck = (target, type) => {
  if (typeof type == 'string') {
    if (typeof target != type) throw `타입 에러 ${target} : ${type}`;
  } else if (!(target instanceof type)) {
    throw `타입 에러 ${target} : ${type}`;
  }

  return target;
};

export default typeCheck;
