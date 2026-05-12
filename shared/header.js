// shared/header.js
const menuItems = [
    { name: '首页', link: 'index.html', id: 'nav-home' },
    { name: '隐私声明', link: 'privacy.html', id: 'nav-privacy' },
    { name: '联系我们', link: 'contact.html', id: 'nav-contact' }
    // 未来在这里增加 { name: '123', link: '123.html' } 全站都会同步！
];

function injectHeader() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    
    let menuHTML = menuItems.map(item => {
        const isActive = currentPage === item.link ? 'active' : '';
        return `<li><a href="${item.link}" class="${isActive}">${item.name}</a></li>`;
    }).join('');

    const headerHTML = `
        <header>
            <a href="index.html" class="logo-text">繁星不语</a>
            <nav>
                <ul>
                    ${menuHTML}
                </ul>
            </nav>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// 页面加载完成后自动注入
document.addEventListener('DOMContentLoaded', injectHeader);