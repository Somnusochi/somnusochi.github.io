---
layout: doc
outline: deep
title: weex填坑指南
description: weex填坑指南
---
<FlipWords :words="['weex填坑指南']"/>

## 记录项目从 Vue 2.0 拓展到 Weex

- 不支持 `p` 标签，`p` 居然不能设置 `font-size`，文字显示一律改用 `text` 标签：`<text></text>`
- `padding`、`border`、`margin` 等属性不支持简写，请使用 `padding-top`、`padding-right`、`padding-bottom`、`padding-left`

- `:class` 不能使用对象语法，应该使用数组语法。数组写法：`:class="[type === 'index' ? 'active' : '']"` ✔️；对象写法：`:class="{active: type === 'index'}"` ❌。且数组写法一次只能判断添加一个类，`:class="[type === 'index' ? 'active disabled' : '']"` ❌

- 图片一定需要写宽高，且不能使用 `img` 简写，只能用 `image` 标签

- 务必使用 Weex 提供的所支持的标签，例如 `div`、`text`（HTML5 标签语义化一夜回到解放前，毕竟不用 SEO）。在 Weex 提供的内建组件中，例如 `scroller` 之类的，使用 Weex 不支持的标签在 native 端可能会导致 DOM 元素直接消失

- [Vue 语法的 Weex 组件](https://github.com/Somnusochi/incubator-weex/tree/master/examples/vue)

- [Stream 请求封装](https://github.com/dreamochi/DayDayUp/issues/78)

- `DOM` 元素只支持单个类设置样式

```html
<div class="warpper">
  <text class="warpper_context">text</text>
</div>
```

```css
.warpper .warpper_context ❌
  color: #fff; // native 端无效

.warpper_context ✔️
  color: #fff; // native 端有效
```

- 默认为 `flex` 布局，务必设置 `flex-direction` 属性

- 不支持 `display: none`，即不支持 `v-show`，需要替换成 `v-if`

- 对于多个 `inline-block` 元素的布局无法有效实现

- 对于 CSS 不支持 `.active.active` 增加 CSS 选择器权重的写法

- [iOS: modal.toast 无法显示浮层提示](https://github.com/alibaba/weex/issues/2183)

```objective-c
WXModalUIModule.m
- (void)toast:(NSString *)message duration:(double)duration
{
    WXAssertMainThread();
    // UIView *superView =  [[[UIApplication sharedApplication] windows] objectAtIndex:0];
    UIView *superView = [[[UIApplication sharedApplication] windows] lastObject];
    if (!superView) {
        superView = self.weexInstance.rootView;
    }
    UIView *toastView = [self toastViewForMessage:message superView:superView];
    WXToastInfo *info = [WXToastInfo new];
    info.toastView = toastView;
    info.superView = superView;
    info.duration = duration;
    [[WXToastManager sharedManager].toastQueue addObject:info];
    
    if (![WXToastManager sharedManager].toastingView) {
        [self showToast:toastView superView:superView duration:duration];
    }
}
```

- [weex-vue-navigator](https://github.com/MMF-FE/weex-vue-navigator) 使用 `vue-router` 的情况下在 native 端实现原生多页应用的体验（用了一下存在内存泄露的问题待解决）

- [`iOS` 端顶部渲染 20px 的问题](https://github.com/SyswinAE/weex-frame/issues/5)

- 值得注意的函数执行顺序

```javascript
getSkuList() {
  this.skuList = [];
  console.log('aaa');
  storage.setItem('skuList', _this.skuList, event => {
    console.log('set success');
  });
  storage.getItem('skuList', event => {
    console.log('get value');
    if (event.data) {
      this.skuList = event.data;
    }
  });
  console.log('bbb');
}
```

```
运行结果
aaa
bbb
set success
get value
```

- `storage` 存储的内容应该转为字符串，取的内容转化为 JSON 对象

```javascript
let skuList = [{
  skuId: 2696,
  count: 1,
  createTime: 1490688258
}, {
  skuId: 2970,
  count: 1,
  createTime: 1490688272
}, {
  skuId: 2971,
  count: 1,
  createTime: 1490688272
}, {
  skuId: 2972,
  count: 1,
  createTime: 1490688272
}];
skuList = JSON.stringify(skuList);
storage.setItem('skuList', skuList, event => {
  console.log('set success');
});
storage.getItem('skuList', event => {
  console.log('get value:', event.data);
  if (event.data) {
    this.skuList = JSON.parse(event.data);
  }
});
```

- `router-view` 需要包裹在 `div` 标签中
