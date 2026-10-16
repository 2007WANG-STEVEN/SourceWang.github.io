/* ==========================================================
 * 全站脚本
 * 1. 工具列表：数据驱动渲染，新增工具只需往 TOOLS 数组加一条
 * 2. 主题切换：深/亮色，记录在 localStorage
 * ========================================================== */

/* ---------- 1. 工具列表配置 ----------
 *
 * 新增一个工具的步骤：
 *   1. 在 tools/ 下新建目录，如 tools/word-count/index.html
 *   2. 在下面 TOOLS 数组中添加一条记录
 *
 * 字段说明：
 *   name   工具名称
 *   desc   一句话描述
 *   path   工具页面路径（相对根目录）
 *   tags   标签数组（可选）
 *   status "online" 已上线 | "dev" 开发中（不可点击）
 */
const TOOLS = [
  // 示例（取消注释并修改即可启用）：
  // {
  //   name: '字数统计',
  //   desc: '统计文本的字数、字符数与行数。',
  //   path: 'tools/word-count/index.html',
  //   tags: ['文本'],
  //   status: 'online',
  // },
];

/* ---------- 渲染工具列表 ---------- */
function renderTools() {
  const grid = document.getElementById('tool-grid');
  if (!grid) return;

  if (TOOLS.length === 0) {
    grid.innerHTML = `
      <div class="placeholder-card">
        还没有上线任何工具<span class="accent"> _</span><br>
        第一个工具可以在 js/main.js 的 TOOLS 列表中添加
      </div>`;
    return;
  }

  grid.innerHTML = TOOLS.map(tool => {
    const statusText = tool.status === 'online'
      ? '<span class="tool-status online">● 可用</span>'
      : '<span class="tool-status">○ 开发中</span>';

    const tags = (tool.tags || [])
      .map(tag => `<span class="tool-tag">${tag}</span>`)
      .join('');

    if (tool.status === 'online') {
      return `
        <a class="tool-card" href="${tool.path}">
          <div class="tool-name">${tool.name}</div>
          <div class="tool-desc">${tool.desc}</div>
          <div class="tool-meta">${tags}${statusText}</div>
        </a>`;
    }
    return `
      <div class="tool-card disabled">
        <div class="tool-name">${tool.name}</div>
        <div class="tool-desc">${tool.desc}</div>
        <div class="tool-meta">${tags}${statusText}</div>
      </div>`;
  }).join('');
}

/* ---------- 2. 主题切换 ---------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // 恢复上次选择的主题
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.dataset.theme = saved;
  }
  updateBtn(btn, root.dataset.theme);

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateBtn(btn, next);
  });
}

function updateBtn(btn, theme) {
  btn.textContent = theme === 'dark' ? '☾' : '☀';
}

/* ---------- 启动 ---------- */
initTheme();
renderTools();
