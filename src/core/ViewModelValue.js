const ViewModelValue = class {
  constructor(subKey, category, key, val) {
    Object.assign(this, { subKey, category, key, val });
    Object.freeze(this);
  }
};

export default ViewModelValue;
