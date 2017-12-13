/**
 * @abstract
 * @implements {Serializable}
 */
export default class Component {

  constructor(data) {
    /**
     * @type {GameObject}
     */
    this._owner = null;
    this._type = 0;
    /* initialize member field through copy constructor */
    this.copyConstructor(data);
  }
  /**
   * Copy constructor
   * @abstract
   * @param data {object} could be a json file
   */
  copyConstructor(data) {
  }

  /* -------------------Getter/Setter/Accessor-------------------------- */

  /** @return {GameObject} */
  getOwner() {
    return this._owner;
  }

  /** @return {number} */
  getType() {
    return this._type;
  }

  /** @param owner {GameObject} */
  setOwner(owner) {
    this._owner = owner;
  }

  /* -------------------Serializable-------------------------- */

  /** @abstract */
  serialize() {
  }

  /** @abstract */
  deserialize(str) {
  }

  /* ------------------- Game Flow  -------------------------- */
  /**
   * @abstract
   */
  update() {
  }

  /* --------------------Messages--------------------------- */
  /**
   * Call method  'methodName' on this component.
   * @param methodName
   * @param params
   */
  triggerMessage(methodName, ...params) {
    this[methodName](...params)
  }

  /**
   * [Message] Called when object(owner) is created by ObjectFactory.
   */
  onCreate() {
  }

  onInstantiate(owner) {
    /* Reset ownership of components */
    this.setOwner(owner);
  }
}