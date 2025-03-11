import{_ as a}from"./chunks/FlipWords.BNQNPGEl.js";import{_ as l,c as p,G as o,ae as t,o as e}from"./chunks/framework.B94Sjtek.js";const h=JSON.parse('{"title":"使用Puppeteer实现PDF下载功能","description":"使用Puppeteer实现PDF下载功能","frontmatter":{"layout":"doc","outline":"deep","title":"使用Puppeteer实现PDF下载功能","description":"使用Puppeteer实现PDF下载功能"},"headers":[],"relativePath":"pages/others/使用puppeteer实现pdf下载功能.md","filePath":"pages/others/使用puppeteer实现pdf下载功能.md"}'),c={name:"pages/others/使用puppeteer实现pdf下载功能.md"};function r(F,s,y,i,d,E){const n=a;return e(),p("div",null,[o(n,{words:["使用Puppeteer实现PDF下载功能"]}),s[0]||(s[0]=t(`<p>在公司中，我们遇到了生成错题本、学情报告PDF格式的需求。常见的PDF生成方式包括手动使用Canvas生成PDF或截图、使用html2canvas以及使用Puppeteer。每种方法都有其优缺点，下面将分别进行比较。</p><table tabindex="0"><thead><tr><th>实现方式</th><th>手动使用Canvas生成PDF或截图</th><th>使用html2canvas</th><th>使用Puppeteer</th></tr></thead><tbody><tr><td><strong>优点</strong></td><td>灵活性高：可以精确控制PDF的内容和布局<br>性能好：直接在浏览器端生成，无需额外的服务器资源</td><td>简单易用：只需将HTML元素转换为Canvas，然后导出为图片或PDF<br>兼容性好：支持大多数现代浏览器</td><td>功能强大：可以模拟完整的浏览器环境，支持复杂的页面和交互<br>高质量输出：生成的PDF质量高，接近打印效果<br>兼容性好：支持所有现代浏览器的特性</td></tr><tr><td><strong>缺点</strong></td><td>复杂性高：需要手动处理各种布局和样式问题<br>兼容性问题：不同浏览器对Canvas的支持可能有所不同</td><td>样式限制：某些复杂的CSS样式可能无法正确渲染<br>性能问题：对于复杂的页面，转换过程可能较慢</td><td>资源消耗大：需要启动一个完整的浏览器实例，资源消耗较高<br>性能问题：对于大规模PDF生成，性能可能成为瓶颈</td></tr></tbody></table><h2 id="通过puppeteer实现pdf下载功能" tabindex="-1">通过Puppeteer实现PDF下载功能 <a class="header-anchor" href="#通过puppeteer实现pdf下载功能" aria-label="Permalink to &quot;通过Puppeteer实现PDF下载功能&quot;">​</a></h2><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Context, Next } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;koa&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> puppeteer </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;puppeteer&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">export</span><span style="color:#66D9EF;font-style:italic;"> const</span><span style="color:#A6E22E;"> pdfGenerator</span><span style="color:#F92672;"> =</span><span style="color:#F92672;"> async</span><span style="color:#F8F8F2;"> (</span><span style="color:#FD971F;font-style:italic;">ctx</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">Context</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">next</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">Next</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">  if</span><span style="color:#F8F8F2;"> (ctx.path </span><span style="color:#F92672;">===</span><span style="color:#E6DB74;"> &#39;/pdfGenerator&#39;</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> url </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> ctx.query.url;</span></span>
<span class="line"><span style="color:#F92672;">    if</span><span style="color:#F8F8F2;"> (</span><span style="color:#F92672;">!</span><span style="color:#F8F8F2;">url) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      ctx.status </span><span style="color:#F92672;">=</span><span style="color:#AE81FF;"> 400</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">      ctx.body </span><span style="color:#F92672;">=</span><span style="color:#E6DB74;"> &#39;URL query parameter is required&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">      return</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> browser </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> puppeteer.</span><span style="color:#A6E22E;">launch</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#F8F8F2;">      executablePath: puppeteer.</span><span style="color:#A6E22E;">executablePath</span><span style="color:#F8F8F2;">(),</span></span>
<span class="line"><span style="color:#F8F8F2;">    });</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> page </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> browser.</span><span style="color:#A6E22E;">newPage</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">goto</span><span style="color:#F8F8F2;">(url, { waitUntil: </span><span style="color:#E6DB74;">&#39;networkidle0&#39;</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">    // 获取页面标题</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> title </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">title</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> pdfBuffer </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">pdf</span><span style="color:#F8F8F2;">({ format: </span><span style="color:#E6DB74;">&#39;A4&#39;</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.</span><span style="color:#A6E22E;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;Content-Type&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;application/pdf&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.</span><span style="color:#A6E22E;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;Content-Disposition&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">\`attachment; filename=&quot;</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">title</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">.pdf&quot;\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.body </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> pdfBuffer;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#F8F8F2;"> browser.</span><span style="color:#A6E22E;">close</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  } </span><span style="color:#F92672;">else</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#A6E22E;"> next</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span></code></pre></div></div><h3 id="waituntil-属性详解" tabindex="-1"><code>waitUntil</code> 属性详解 <a class="header-anchor" href="#waituntil-属性详解" aria-label="Permalink to &quot;\`waitUntil\` 属性详解&quot;">​</a></h3><table tabindex="0"><thead><tr><th><code>waitUntil</code> 值</th><th>含义</th><th><strong>优点</strong></th><th><strong>缺点</strong></th><th><strong>适用场景</strong></th></tr></thead><tbody><tr><td><code>load</code></td><td>页面的 <code>load</code> 事件被触发。这通常发生在所有资源（如样式表、图片等）都已加载完毕时。</td><td>确保所有资源都已加载完毕。</td><td>可能导致等待时间过长，尤其是对于包含大量资源的页面。</td><td>简单的静态页面。</td></tr><tr><td><code>domcontentloaded</code></td><td>页面的 DOM 内容已经加载并解析完成，但不包括样式表、图片等资源。</td><td>加载速度快，响应迅速。</td><td>某些资源可能未加载完毕，可能导致部分内容缺失。</td><td>需要快速响应且对资源加载要求不高的场景。</td></tr><tr><td><code>networkidle0</code></td><td>在连续 500 毫秒内没有网络连接活动（即没有超过 0 个网络连接）。</td><td>确保大部分动态内容已加载，适合复杂的页面。</td><td>可能会等待较长时间，尤其是在网络状况不佳的情况下。</td><td>包含大量异步加载内容的页面。</td></tr><tr><td><code>networkidle2</code></td><td>在连续 500 毫秒内最多有 2 个网络连接活动。</td><td>允许最多有 2 个网络连接活动，适合更严格的条件。</td><td>可能比 <code>networkidle0</code> 更严格，导致更长的等待时间。</td><td>对页面加载有较高要求的复杂页面。</td></tr></tbody></table><h2 id="监听指定dom元素判断页面渲染完成" tabindex="-1">监听指定DOM元素判断页面渲染完成 <a class="header-anchor" href="#监听指定dom元素判断页面渲染完成" aria-label="Permalink to &quot;监听指定DOM元素判断页面渲染完成&quot;">​</a></h2><p>除了使用 <code>waitUntil</code> 属性，我们还可以通过监听指定的DOM元素来判断页面是否渲染完成。例如，我们可以等待某个特定的元素出现在页面上，然后再生成PDF。</p><div class="custom-code-block"><div class="terminal-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki monokai vp-code" tabindex="0"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Context, Next } </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;koa&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> puppeteer </span><span style="color:#F92672;">from</span><span style="color:#E6DB74;"> &#39;puppeteer&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">export</span><span style="color:#66D9EF;font-style:italic;"> const</span><span style="color:#A6E22E;"> pdfGenerator</span><span style="color:#F92672;"> =</span><span style="color:#F92672;"> async</span><span style="color:#F8F8F2;"> (</span><span style="color:#FD971F;font-style:italic;">ctx</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">Context</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">next</span><span style="color:#F92672;">:</span><span> </span><span style="color:#A6E22E;text-decoration:underline;">Next</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">  if</span><span style="color:#F8F8F2;"> (ctx.path </span><span style="color:#F92672;">===</span><span style="color:#E6DB74;"> &#39;/pdfGenerator&#39;</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> url </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> ctx.query.url;</span></span>
<span class="line"><span style="color:#F92672;">    if</span><span style="color:#F8F8F2;"> (</span><span style="color:#F92672;">!</span><span style="color:#F8F8F2;">url) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      ctx.status </span><span style="color:#F92672;">=</span><span style="color:#AE81FF;"> 400</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">      ctx.body </span><span style="color:#F92672;">=</span><span style="color:#E6DB74;"> &#39;URL query parameter is required&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">      return</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> browser </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> puppeteer.</span><span style="color:#A6E22E;">launch</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#F8F8F2;">      executablePath: puppeteer.</span><span style="color:#A6E22E;">executablePath</span><span style="color:#F8F8F2;">(),</span></span>
<span class="line"><span style="color:#F8F8F2;">    });</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> page </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> browser.</span><span style="color:#A6E22E;">newPage</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">goto</span><span style="color:#F8F8F2;">(url, { waitUntil: </span><span style="color:#E6DB74;">&#39;domcontentloaded&#39;</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">    // 等待特定的DOM元素出现</span></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">waitForSelector</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;#specific-element&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">    // 获取页面标题</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> title </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">title</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">    const</span><span style="color:#F8F8F2;"> pdfBuffer </span><span style="color:#F92672;">=</span><span style="color:#F92672;"> await</span><span style="color:#F8F8F2;"> page.</span><span style="color:#A6E22E;">pdf</span><span style="color:#F8F8F2;">({ format: </span><span style="color:#E6DB74;">&#39;A4&#39;</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.</span><span style="color:#A6E22E;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;Content-Type&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;application/pdf&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.</span><span style="color:#A6E22E;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;Content-Disposition&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">\`attachment; filename=&quot;</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">title</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">.pdf&quot;\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">    ctx.body </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> pdfBuffer;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#F8F8F2;"> browser.</span><span style="color:#A6E22E;">close</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  } </span><span style="color:#F92672;">else</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F92672;">    await</span><span style="color:#A6E22E;"> next</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span></code></pre></div></div><p>通过这种方式，我们可以确保页面上的特定内容已经加载完成，然后再生成PDF。这对于需要等待异步加载内容的页面非常有用。</p>`,10))])}const D=l(c,[["render",r]]);export{h as __pageData,D as default};
