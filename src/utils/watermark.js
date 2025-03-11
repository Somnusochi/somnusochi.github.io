export class WaterMark {
  constructor(config, styles) {
    this.node = null;
    this.measureText = { width: 0 };
    this.config = {
      width: typeof window !== 'undefined' ? window.screen.width : 1920, // 默认宽度
      height: typeof window !== 'undefined' ? window.screen.height : 1080, // 默认高度
      degree: -30,
      color: '#333',
      fontSize: 18,
      fontFamily: 'sans-serif',
      ...config,
    };
    this.styles = {
      position: 'fixed',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 99999,
      opacity: 0.1,
      ...styles,
    };
    this.mo = null;
  }
  init(config, styles) {
    this.mergeConfig(config || {});
    this.mergeStyles(styles || {});
    this.initCanvas();
    this.check();
    return this;
  }
  mergeConfig(config) {
    Object.assign(this.config, config);
    // 处理文字
    let { fontSize, fontFamily, font } = this.config;
    this.config.font = font || `${fontSize}px ${fontFamily}`;
  }
  mergeStyles(styles) {
    Object.assign(this.styles, styles);
  }
  update(config = {}, styles = {}) {
    this.mergeConfig(config);
    this.mergeStyles(styles);
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.drawWaterMark(this.ctx, this.config.text);
    return this;
  }
  /**
   * @description 是否存在，不存在创建
   * @memberof WaterMark
   */
  check() {
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;
    const container = document.body;
    const _this = this;
    if (MutationObserver) {
      this.mo = new MutationObserver(mutationList => {
        const canvasDom = document.querySelector('.watermrk-canvas');
        mutationList.forEach(mutationRecord => {
          const { type, attributeName, target } = mutationRecord;
          if (
            !canvasDom ||
            (type === 'attributes' &&
              attributeName === 'style' &&
              target.className === 'watermrk-canvas')
          ) {
            // 避免一直触发
            _this.mo.disconnect();
            _this.mo = null;
            _this.reload();
          }
        });
      });
      this.mo.observe(container, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
    return this;
  }
  reload() {
    this.destory();
    this.init();
    return this;
  }
  destory() {
    if (this.mo) {
      this.mo.disconnect();
      this.mo = null;
    }
    this?.canvas?.parentNode?.removeChild(this.canvas);
    this.canvas = null;
    return this;
  }
  initCanvas() {
    this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = this.config.height;
    this.canvas.width = this.config.width;
    this.drawWaterMark(this.ctx, this.config.text);
    this.appendCanvas();
  }
  createCanvas() {
    if (!this.canvas) {
      let canvas = document.createElement('canvas');
      canvas.classList.add('watermrk-canvas');
      this.canvas = canvas;
      Object.assign(canvas.style, this.generateStyle());
    }
  }
  isExist() {
    let canvasDom = document.querySelector('.watermrk-canvas');
    return Boolean(canvasDom);
  }
  appendCanvas() {
    !this.isExist() && document.body.appendChild(this.canvas);
  }
  /**
   * @description 批画水印
   * @param {*} ctx
   * @param {*} text
   * @memberof WaterMark
   */
  drawWaterMark(ctx, text) {
    this.setText(this.config);
    let textHeight = 80;
    let textWidth = this.measureText.width + 28;
    let col = this.config.width / textWidth;
    let row = this.config.height / 50;
    for (let rIdx = 0; rIdx < row; rIdx++) {
      for (let cIdx = 0; cIdx < col; cIdx++) {
        this.drawText(ctx, text, cIdx * textWidth, rIdx * textHeight);
      }
    }
  }
  /**
   * @description 设置文本信息
   * @memberof WaterMark
   */
  setText(config) {
    this.ctx.fillStyle = config.color;
    this.ctx.font = config.font;
    var measureText = this.ctx.measureText(config.text);
    this.measureText = measureText;
  }
  drawText(ctx, text, x, y) {
    ctx.save();
    this.rotateContext(ctx, this.config.degree, x, y);
    this.ctx.fillText(text, x, y);
    ctx.restore();
  }
  rotateContext(ctx, degree, x, y) {
    ctx.translate(x, y);
    ctx.rotate((degree * Math.PI) / 180);
  }
  getBase64() {
    return this.canvas.toDataURL('image/png', 1);
  }
  /**
   * @description 生成容器样式
   * @param {*} styles 样式对象
   * @returns 样式
   * @memberof WaterMark
   */
  generateStyle(styles = {}) {
    return Object.assign(this.styles, styles);
  }
}

export default new WaterMark();
