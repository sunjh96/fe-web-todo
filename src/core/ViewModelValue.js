const ViewModelValue = class {
  constructor(subKey, category, k, v) {
    Object.assign(this, { subKey, category, k, v });
    Object.freeze(this);
  }
};

export default ViewModelValue;
