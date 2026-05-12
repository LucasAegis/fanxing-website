// 将 HTML 结构作为模板字符串注入到 index.html 的挂载点中
const homeHTML = `
    <section class="hero">
        <div class="hero-text">
            <h1>繁星不语</h1>
            <p>输入法，只是它的入口。全程本地运行，绝对隐私保护，守护你的每一次表达。</p>
        </div>
    </section>

    <section class="features-section">
        <div class="feature-card">
            <div class="card-icon-dot bg-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3>100% 本地 AI</h3>
            <p>全程离线运行，绝不上传任何音频数据。从源头捍卫绝对隐私，无网状态依然提供毫秒级响应。</p>
        </div>
        <div class="feature-card">
            <div class="card-icon-dot bg-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3>超级小组件</h3>
            <p>隐于系统深处，双击唤出。内置 15 大类 800+ 符号，左右滑动即可一键上屏，打破传统输入局限。</p>
        </div>
        <div class="feature-card">
            <div class="card-icon-dot bg-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A2BE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3>离线工作站</h3>
            <p>支持拖拽导入音视频，自动生成带时间戳的 MD 文档。快轨草稿与慢轨精修，释放会议记录生产力。</p>
        </div>
    </section>

    <footer>
        <p>© 2026 繁星不语. All rights reserved.</p>
    </footer>
`;

// 执行注入
document.getElementById('home-dynamic-content').innerHTML = homeHTML;
