/**
 * @extends {SpriteBase}
 */
class SpriteGraphicComp extends SpriteBase {

  /**
   * @param renderComponent {GraphicComponent}
   */
  constructor(renderComponent) {
    super();
    if (!renderComponent) {
      console.error("Creating SpriteGraphicComp without RenderComponent.");
    }
    /**
     * @type {GraphicComponent}
     * @private
     */
    this._graphicComp = renderComponent;

    /**
     * @type {string}
     * @private
     */
    this._assetName = null;

    this.anchor.x = 0.5;
    this.anchor.y = 1;
  }

  /**
   * @override
   */
  update() {
    super.update();
    this.updateBitmap();
    this.updateFrame();
    this.updatePosition();
    this.updateScale();
    this.updateOther();
  }

  /** @override @protected */
  updateVisibility() {
    super.updateVisibility();
    if (this._graphicComp.isTransparent()) {
      this.visible = false;
    }
  }

  /**
   * Check if imaged changed, and reset the bitmap
   *
   * @private
   */
  updateBitmap() {
    if (this.isImageChanged()) {
      this._assetName = this._graphicComp.assetName;
      this.setBitmap();
    }
  }

  /**
   * Set the frame area base on _pattern, direction, etc
   *
   * @private
   */
  updateFrame() {
    let pw = this.patternWidth();
    let ph = this.patternHeight();
    let sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    let sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.setFrame(sx, sy, pw, ph);
  }

  /**
   * Update the position base on the screen x,y,z
   *
   * @private
   */
  updatePosition() {
    this.x = this._graphicComp.screenX();
    this.y = this._graphicComp.screenY();
    this.z = this._graphicComp.screenZ();
  }

  /**
   * Update the scale base on the screen scale
   *
   * @private
   */
  updateScale() {
    this.scale.x = this._graphicComp.screenScaleX();
    this.scale.y = this._graphicComp.screenScaleY();
  }

  /**
   * Update opacity and blend mode
   *
   * @private
   */
  updateOther() {
    this.opacity = this._graphicComp.opacity;
    this.blendMode = this._graphicComp.blendMode;
  }

  /** @private @return {boolean} */
  isImageChanged() {
    return this._assetName !== this._graphicComp.assetName;
  }

  /**
   * @private
   */
  setBitmap() {
    this.bitmap = ImageManager.loadCharacter(this._assetName);
  }

  /*-------------------------------------------------------*/

  patternWidth() {
    return this.bitmap.width / this._graphicComp.frameLength();
  }

  patternHeight() {
    return this.bitmap.height / this._graphicComp.directionLength();
  }

  characterBlockX() {
    return 0;
  }

  characterBlockY() {
    return 0;
  }

  characterPatternX() {
    return this._graphicComp.pattern();
  }

  characterPatternY() {
    return (this._graphicComp.direction() - 2) / 2;
  }
}