// privacy/content.js
const privacyHTML = `
    <article class="privacy-container">
        <div class="update-time">生效日期：2026年5月10日</div>
        <h2>1. 零数据收集</h2>
        <p>繁星不语基于“零知识架构”设计。我们不在任何云端服务器收集、存储、共享或传输您的个人数据...</p>
        
        <h2>2. 物理网络隔离</h2>
        <p>本应用在系统底层<span class="highlight">已明确移除所有网络权限</span>。</p>

        <footer>© 2026 繁星不语. All rights reserved.</footer>
    </article>
`;

document.getElementById('privacy-content').innerHTML = privacyHTML;