<FlipWords :words="['QRCode处理实践指南']"/>

## 前言
在日常业务中，我们经常遇到需要处理大量员工微信名片的场景。由于微信生成的二维码样式不统一，需要一个工具来统一处理这些二维码图片，使其具有一致的格式与样式。本文将介绍如何在浏览器环境中处理二维码图片，包括二维码的读取、生成和图片裁剪等功能。

## 业务背景
1. 问题描述：
   - 微信二维码名片样式不统一
   - 图片大小不一致
   - 包含多余的背景和装饰元素

2. 解决方案：
   - 提取原始二维码中的 URL 信息
   - 使用统一配置重新生成二维码
   - 确保输出图片具有一致的尺寸和样式

## 依赖安装
```shell
pnpm add jsqr qrcode callforth
```

## 主要功能
1. 图片转 Base64
2. 二维码识别
3. 二维码生成
4. 图片裁剪

## 核心代码实现

### 文件流转 Base64
```js
const filetoBase64 = async file => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  const result = await eventOn(fileReader, "load");
  return result.target.result;
}
```

### 二维码转换处理
```js
const qrcodeTransfer = async ({ imgSrc, retries }) => {
  let image = new Image();
  image.src = imgSrc;
  await eventOn(image, "load");
  const scalingRatio = [1, 0.8, 0.5];
  const widthScaled = scalingRatio[3 - retries] * image.width;
  const heightScaled = scalingRatio[3 - retries] * image.height;
  
  let canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = widthScaled;
  canvas.height = heightScaled;
  
  ctx.drawImage(image, 0, 0, widthScaled, heightScaled);
  let imageData = ctx.getImageData(0, 0, widthScaled, heightScaled);
  
  const result = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert"
  });
  
  return await qrcode.toDataURL(result.data, {margin: 1.5});
}
```

### 重试机制
```js
const retry = (fn, params, retries = 3, err = null) => {
  if (!retries) {
    return Promise.reject(err);
  }
  return fn({ ...params, retries }).catch(err => {
    return retry(fn, params, (retries - 1), err);
  });
}
```

#### 为什么需要重试机制？
在实际业务中，二维码识别会因为多种原因导致失败：
1. 图片质量问题
   - 微信压缩导致的图片模糊
   - 截图时的尺寸变形
   - 二维码周围的干扰元素

2. 设备兼容性
   - 不同设备的截图分辨率不同
   - 系统级图片处理的差异

3. 网络问题
   - 图片加载不完整
   - 网络延迟导致的加载超时

#### 重试策略说明
1. 缩放比例优化
   - 首次尝试使用原始尺寸（1.0）
   - 第二次尝试使用0.8倍缩放
   - 最后尝试使用0.5倍缩放
   - 这种递减策略能有效处理不同清晰度的图片

2. 错误处理
   - 每次失败后自动降级尝试
   - 最多重试3次，避免无限循环
   - 保留上一次的错误信息，便于调试

3. 性能考虑
   - 使用Promise链式调用，避免回调地狱
   - 通过参数传递重试次数，保持函数纯净
   - 失败后立即进入下一次尝试，提高响应速度

## 完整流程说明

1. 接收文件输入
2. 将文件转换为 Base64
3. 通过缩放比例尝试识别二维码
4. 重新生成二维码
5. 转换为文件流返回

## 使用示例

```js
// 裁剪二维码图片
const handleQRCodeImage = async (file) => {
  try {
    const result = await clipQrCode(file);
    console.log('处理成功:', result);
  } catch (error) {
    console.error('处理失败:', error);
  }
}
```

## 注意事项

1. 图片识别可能会失败，所以实现了重试机制
2. 使用不同的缩放比例提高识别成功率
3. 输入输出都是 File 对象，便于与表单集成
4. 全过程异步处理，需要使用 async/await 或 Promise


## 完整代码
```js
import jsQR from "jsqr";
import qrcode from 'qrcode';
import { eventOn } from "callforth";

// 裁剪ios微信二维码分享图片
const clipQrCode = async file => {
  try {
    const imgSrc = await filetoBase64(file);
    // 因为有存在不同图片读取不了的情况，尝试3次
    const dataurl = await retry(qrcodeTransfer, { imgSrc });
    return dataURLtoFile(dataurl, file.name);
  } catch (e) {
    console.error(e);
  }
}

// 将文件流转成base64
const filetoBase64 = async file => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  const result = await eventOn(fileReader, "load");
  return result.target.result;
}

/**
 * [qrcodeTransfer 二维码转义]
 * @param  {[String]}  imgSrc  [图片base64]
 * @param  {[Number]}  retries [尝试次数]
 * @return {Promise}         [裁剪后的图片base64]
 */
const qrcodeTransfer = async ({ imgSrc, retries }) => {
  let image = new Image();
  image.src = imgSrc;
  await eventOn(image, "load");
  const scalingRatio = [1, 0.8, 0.5];
  const widthScaled = scalingRatio[3 - retries] * image.width;
  const heightScaled = scalingRatio[3 - retries] * image.height;
  
  let canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = widthScaled;
  canvas.height = heightScaled;
  
  ctx.drawImage(image, 0, 0, widthScaled, heightScaled);
  let imageData = ctx.getImageData(0, 0, widthScaled, heightScaled);
  
  const result = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert"
  });
  
  return await qrcode.toDataURL(result.data, {margin: 1.5});
}

// 重试
const retry = (fn, params, retries = 3, err = null) => {
  if (!retries) {
    return Promise.reject(err);
  }
  return fn({ ...params, retries }).catch(err => {
    return retry(fn, params, (retries - 1), err);
  });
}

// 将base64转换为文件流
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default clipQrCode;
```

## 总结
通过合理使用重试机制和缩放策略，我们成功实现了一个可靠的二维码处理工具。该工具不仅能处理各种不同来源的二维码图片，还能保证输出结果的一致性。这对于需要批量处理微信二维码名片的业务场景来说，是一个很好的解决方案。