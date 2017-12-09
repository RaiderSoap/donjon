import Collider from "./collider";
import {Components} from "../core/const";

export default class BoxCollider extends Collider {

  /**
   * @param owner {GameObject}
   * @param param {Array.<number>} width,height.
   */
  constructor(owner, ...param) {
    super(owner);
    /** @private @type {number} */
    this._type = Components.BOX_COLLIDER;
    this._width = param[0];
    this._height = param[1];
  }

  /**
   *
   * @param other {BoxCollider}
   */
  copy(other) {
    super.copy(other);
    this._width = other._width;
    this._height = other._height;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }
}