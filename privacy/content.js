// privacy/content.js
const privacyHTML = `
    <div class="privacy-card">
        <div class="update-time">生效日期：2026年5月10日</div>
        
        <h1 class="main-title">隐私声明</h1>
        <p class="intro-text">繁星不语极其重视您的隐私。本声明详细说明了我们如何处理信息——或者更准确地说，我们如何做到“不处理”您的个人信息。</p>

        <section class="privacy-section">
            <span class="section-title">1. 零数据收集</span>
            <p>繁星不语（本应用）基于“零知识架构”设计。我们不在任何云端服务器收集、存储、共享或传输您的个人数据、语音记录或文本转录内容。您在使用过程中产生的所有文本和偏好设置，仅以加密形式存储在您当前设备的本地沙盒中，由您完全掌控。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">2. 物理网络隔离</span>
            <p>本应用在系统底层<span class="highlight">已明确移除所有网络权限</span>。从技术原理上，本应用完全不具备向任何云端服务器传输数据的能力。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">3. 本地处理与麦克风权限说明</span>
            <p>所有的语音识别均基于应用内置的双 AI 引擎在您的设备上进行本地推理。<span class="highlight">您的语音数据永远不会离开您设备的内存（RAM）。</span></p>
            <p>为了实现核心功能，本应用需要获取您设备的“麦克风权限”。该权限仅被严格用于捕捉音频以进行实时的本地转录。音频流在内存中被即时处理完毕后会自动销毁，绝不会被保存到设备存储中，更不会被向外传输。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">4. 本地剪贴板使用说明</span>
            <p>为实现特定的文本编辑与输入功能，本应用提供读取本地剪贴板的选项。该功能默认处于严格关闭状态，本应用自身不具备、也绝不会主动获取您的剪贴板权限。仅当您在应用首页主动点击相关授权按钮并明确授予权限后，本应用才会读取剪贴板内容。若您无此需求或未主动开启，本应用永远不可能获取您的剪贴板数据。该读取行为仅发生在设备本地，数据落盘即止，绝不会被上传或用于任何与功能无关的分析。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">5. 支付与交易信息</span>
            <p>我们不处理任何支付行为，也不存储任何信用卡信息。所有的交易均由应用商店（如华为应用市场）的官方计费系统安全处理。我们仅接收来自应用商店的匿名购买凭证以验证您的授权状态，我们无法获取您的真实身份信息。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">6. 分析与日志记录</span>
            <p>本应用未集成任何第三方分析 SDK（例如 Google Analytics 或友盟）。本应用不会生成任何会被传输到设备外部的使用日志。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">7. 数据的删除与重置</span>
            <p>由于我们从未收集、存储或向我们的服务器传输过任何用户数据，因此不存在需要向我们申请“删除用户数据”的情况。如果您希望清除本地的使用记录（如您的偏好设置），只需在系统中卸载本应用，或清除本应用的存储数据即可。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">8. 未成年人隐私保护</span>
            <p>本应用面向广泛人群。由于本应用采用完全本地化运行且不向外部传输任何信息的架构，我们自然也不会收集任何未成年人的个人数据。若您是未成年人的监护人，请放心让未成年人使用。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">9. 隐私政策的更新</span>
            <p>由于本应用彻底切断了网络通讯能力，我们无法通过在线弹窗或联网推送的方式通知您隐私政策的变更。任何关于本政策的更新，将随应用版本的迭代在应用商店详情页及官方网站进行公示。</p>
        </section>

        <section class="privacy-section">
            <span class="section-title">10. 开发者联系方式</span>
            <p>如对本隐私声明有任何合规性疑问，请联系：<a href="mailto:lucas@fanxingos.com" class="contact-link">lucas@fanxingos.com</a></p>
        </section>

        <footer class="privacy-footer">
            <p>© 2026 繁星不语. All rights reserved.</p>
        </footer>
    </div>
`;

document.getElementById('privacy-content').innerHTML = privacyHTML;
