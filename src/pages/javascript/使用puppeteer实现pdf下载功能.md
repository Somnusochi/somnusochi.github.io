---
layout: doc
outline: deep
title: 使用Puppeteer实现PDF下载功能
description: 使用Puppeteer实现PDF下载功能
---
<FlipWords :words="['使用Puppeteer实现PDF下载功能']"/>

在公司中，我们遇到了生成错题本、学情报告PDF格式的需求。常见的PDF生成方式包括手动使用Canvas生成PDF或截图、使用html2canvas以及使用Puppeteer。每种方法都有其优缺点，下面将分别进行比较。

| 实现方式 | 手动使用Canvas生成PDF或截图 | 使用html2canvas | 使用Puppeteer |
| --- | --- | --- | --- |
| **优点** | 灵活性高：可以精确控制PDF的内容和布局<br>性能好：直接在浏览器端生成，无需额外的服务器资源 | 简单易用：只需将HTML元素转换为Canvas，然后导出为图片或PDF<br>兼容性好：支持大多数现代浏览器 | 功能强大：可以模拟完整的浏览器环境，支持复杂的页面和交互<br>高质量输出：生成的PDF质量高，接近打印效果<br>兼容性好：支持所有现代浏览器的特性 |
| **缺点** | 复杂性高：需要手动处理各种布局和样式问题<br>兼容性问题：不同浏览器对Canvas的支持可能有所不同 | 样式限制：某些复杂的CSS样式可能无法正确渲染<br>性能问题：对于复杂的页面，转换过程可能较慢 | 资源消耗大：需要启动一个完整的浏览器实例，资源消耗较高<br>性能问题：对于大规模PDF生成，性能可能成为瓶颈 |

## 通过Puppeteer实现PDF下载功能

```ts
import { Context, Next } from 'koa';
import puppeteer from 'puppeteer';

export const pdfGenerator = async (ctx: Context, next: Next) => {
  if (ctx.path === '/pdfGenerator') {
    const url = ctx.query.url;
    if (!url) {
      ctx.status = 400;
      ctx.body = 'URL query parameter is required';
      return;
    }

    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 获取页面标题
    const title = await page.title();

    const pdfBuffer = await page.pdf({ format: 'A4' });

    ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Disposition', `attachment; filename="${title}.pdf"`);
    ctx.body = pdfBuffer;

    await browser.close();
  } else {
    await next();
  }
};
```

### `waitUntil` 属性详解

| `waitUntil` 值 | 含义 | **优点** | **缺点** | **适用场景** |
| --- | --- | --- | --- | --- |
| `load` | 页面的 `load` 事件被触发。这通常发生在所有资源（如样式表、图片等）都已加载完毕时。 | 确保所有资源都已加载完毕。 | 可能导致等待时间过长，尤其是对于包含大量资源的页面。 | 简单的静态页面。 |
| `domcontentloaded` | 页面的 DOM 内容已经加载并解析完成，但不包括样式表、图片等资源。 | 加载速度快，响应迅速。 | 某些资源可能未加载完毕，可能导致部分内容缺失。 | 需要快速响应且对资源加载要求不高的场景。 |
| `networkidle0` | 在连续 500 毫秒内没有网络连接活动（即没有超过 0 个网络连接）。 | 确保大部分动态内容已加载，适合复杂的页面。 | 可能会等待较长时间，尤其是在网络状况不佳的情况下。 | 包含大量异步加载内容的页面。 |
| `networkidle2` | 在连续 500 毫秒内最多有 2 个网络连接活动。 | 允许最多有 2 个网络连接活动，适合更严格的条件。 | 可能比 `networkidle0` 更严格，导致更长的等待时间。 | 对页面加载有较高要求的复杂页面。 |

## 监听指定DOM元素判断页面渲染完成

除了使用 `waitUntil` 属性，我们还可以通过监听指定的DOM元素来判断页面是否渲染完成。例如，我们可以等待某个特定的元素出现在页面上，然后再生成PDF。

```ts
import { Context, Next } from 'koa';
import puppeteer from 'puppeteer';

export const pdfGenerator = async (ctx: Context, next: Next) => {
  if (ctx.path === '/pdfGenerator') {
    const url = ctx.query.url;
    if (!url) {
      ctx.status = 400;
      ctx.body = 'URL query parameter is required';
      return;
    }

    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // 等待特定的DOM元素出现
    await page.waitForSelector('#specific-element');

    // 获取页面标题
    const title = await page.title();

    const pdfBuffer = await page.pdf({ format: 'A4' });

    ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Disposition', `attachment; filename="${title}.pdf"`);
    ctx.body = pdfBuffer;

    await browser.close();
  } else {
    await next();
  }
};
```

通过这种方式，我们可以确保页面上的特定内容已经加载完成，然后再生成PDF。这对于需要等待异步加载内容的页面非常有用。
