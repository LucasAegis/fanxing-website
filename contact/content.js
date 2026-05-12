// contact/content.js
const contactHTML = `
    <div class="channel-status">安全加密通道已建立</div>
    
    <div class="contact-intro">
        如有任何企业合作、功能定制或技术问题反馈，请随时与我们联系。<br>
        <span class="response-time">系统响应时间：通常在 24 小时内。</span>
    </div>

    <div class="email-box">
        <div class="email-label">核心对接邮箱</div>
        <a href="mailto:lucas@fanxingos.com" class="email-link">lucas@fanxingos.com</a>
    </div>
`;

// 将内容注入到 main 标签中
document.getElementById('contact-content').innerHTML = contactHTML;