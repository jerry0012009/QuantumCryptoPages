(function () {
  var MOBILE_QUERY = "(max-width: 920px)";
  var mq = window.matchMedia(MOBILE_QUERY);

  function isZh() {
    return (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  }

  function getImage(section, fallbackIndex) {
    var selector = section ? "#" + section + " img" : "img";
    var images = Array.prototype.slice.call(document.querySelectorAll(selector));
    var img = images[fallbackIndex || 0] || images[0] || document.querySelector("#main img");
    return img ? (img.currentSrc || img.src || "") : "";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(className, text, href) {
    var a = el("a", className, text);
    a.href = href || "#qc-mobile-contact";
    return a;
  }

  function card(title, body) {
    var item = el("article", "qc-card");
    item.appendChild(el("h3", "", title));
    item.appendChild(el("p", "", body));
    return item;
  }

  function fact(value, label) {
    var item = el("article", "qc-fact");
    item.appendChild(el("strong", "", value));
    item.appendChild(el("span", "", label));
    return item;
  }

  function report(title, body, action) {
    var item = el("article", "qc-report-card");
    item.appendChild(el("h3", "", title));
    item.appendChild(el("p", "", body));
    item.appendChild(link("qc-text-link", action, "#qc-mobile-contact"));
    return item;
  }

  function bullets(items) {
    var list = el("ul", "qc-bullets");
    items.forEach(function (item) {
      list.appendChild(el("li", "", item));
    });
    return list;
  }

  function buildContent() {
    var zh = isZh();
    var heroImage = getImage("main", 0);
    var mainlineImage = getImage("mainline", 0);
    var wealthImage = getImage("privatewealth", 0);

    var copy = zh ? {
      heroSubtitle: "连接传统资本与数字金融的加密宏观投资及私人财富平台。",
      heroButton: "联系我们",
      keyFacts: "关键数据",
      initial: "基金初始规模",
      since: "区块链与数字资产经验",
      presence: "全球交易与研究网络",
      footnote: "除另有说明，核心数据截至 2024 年 3 月 31 日。",
      discover: "了解 Quantum Crypto",
      discoverBody: "Quantum Crypto 聚焦数字资产、宏观周期与颠覆性新兴技术，为超高净值客户提供数字资产配置与策略管理服务，并致力于成为连接传统资本与加密金融的重要桥梁。",
      what: "业务方向",
      whatCards: [
        ["多策略投资", "运营多策略数字资产对冲基金，重点关注全球宏观趋势与事件驱动机会。"],
        ["组合多元化", "通过布局颠覆性新兴技术，帮助投资者优化长期资产配置结构。"],
        ["风险控制", "提供金融风险管理与 OTC 解决方案，提升数字资产配置的安全边界。"]
      ],
      mainline: "主线",
      mainCards: [
        ["全球私人财富解决方案", "为高净值客户提供全球资产配置、合规框架与长期财富管理支持。"],
        ["自营交易部门", "在伦敦与北京设有办公室及交易中心，围绕宏观周期与事件驱动机会开展专有交易。"],
        ["生态系统合作建设", "与战略合作伙伴、专业团队及行业资源协同，拓展研究、技术、资本与市场价值。"]
      ],
      quote: "“我们聚焦颠覆性技术，并致力于成为连接传统资本与加密金融的重要桥梁。”",
      quoteBy: "Ray Wong，Quantum Crypto 创始合伙人",
      privateTitle: "全球私人财富规划",
      privateIntro: "Quantum Crypto 为超高净值客户提供综合性财富顾问服务，覆盖跨境规划、交易安排与合规支持。",
      privateBullets: ["海外税务规划", "证券交易", "员工激励", "并购交易", "家族企业运营", "CRS 与 FATCA 合规"],
      reports: "宏观研究与活动",
      reportAction: "申请获取研究报告",
      reportCards: [
        ["主流全球资产概览与核心价值", "比较主要资产类别的价值基础、风险特征及其在投资组合中的配置作用。"],
        ["2025 年香港金融政策分析与全球资产配置", "评估香港金融政策对跨境资本流动、数字金融发展及全球资产配置策略的影响。"],
        ["货币投机：代币经济周期、宏观对冲与价值投资", "分析数字资产如何受到流动性环境、政策变化与长期资本配置框架的共同影响。"]
      ],
      news: "新闻",
      newsAction: "了解更多",
      newsCards: [
        ["Quantum Crypto 推出 2,100 万美元数字资产基金", "面向家族办公室与高净值客户，聚焦全球货币市场中的宏观对冲策略机会。"],
        ["Quantum Crypto 推出 QuanTech II", "拓展数字资产市场专有套利交易能力，以量化研究、纪律化执行与风险控制框架捕捉市场偏差。"]
      ],
      contact: "联系方式",
      social: "社交链接",
      portal: "投资者登录"
    } : {
      heroSubtitle: "A crypto macro investment and private wealth platform connecting traditional capital with digital finance.",
      heroButton: "Contact Us",
      keyFacts: "Key Facts",
      initial: "Initial Fund Size",
      since: "Blockchain & Digital Asset Experience",
      presence: "Global Trading and Research Presence",
      footnote: "Core figures are as of March 31, 2024, unless otherwise indicated.",
      discover: "Discover Quantum Crypto",
      discoverBody: "Quantum Crypto is a crypto macro hedge fund targeting disruptive emerging technologies, providing crypto financial management services to ultra-high-net-worth clients and serving as a bridge between traditional capital and crypto finance.",
      what: "What We Do",
      whatCards: [
        ["Multi-Strategy Investment", "We operate a multi-strategy crypto hedge fund focused on global macro and corporate events."],
        ["Portfolio Diversification", "We help investors diversify portfolios through exposure to disruptive emerging technologies."],
        ["Risk Control", "We provide financial risk management and OTC solutions designed to protect crypto assets."]
      ],
      mainline: "Mainline",
      mainCards: [
        ["Private Global Wealth Solutions", "We support compliant global asset allocation, efficient wealth management, and family legacy planning."],
        ["Proprietary Trading", "With offices and trading rooms in London and Beijing, we trade digital assets around macro and event-driven opportunities."],
        ["Ecosystem Partnerships", "We collaborate with strategic partners and specialist teams to expand research, technology, capital, and market value."]
      ],
      quote: "“We focus on disruptive technologies and serve as a bridge for traditional capital into crypto finance.”",
      quoteBy: "Ray Wong, Founding Partner of Quantum Crypto",
      privateTitle: "Private Wealth Solutions",
      privateIntro: "We offer a focused range of wealth advisory services for ultra-high-net-worth clients across planning, transactions, incentives, and compliance.",
      privateBullets: ["Overseas Tax Planning", "Securities Trading", "Employee Incentives", "Mergers and Acquisitions", "Family Business Operations", "CRS & FATCA Compliance"],
      reports: "Macro Reports & Events",
      reportAction: "Request Research",
      reportCards: [
        ["Overview of Mainstream Global Assets and Core Value", "A research overview comparing value foundations, risk characteristics, and portfolio roles across major asset classes."],
        ["2025 Hong Kong Financial Policy Analysis and Global Asset Allocation", "An assessment of policy implications for cross-border capital flows, digital finance, and global allocation strategy."],
        ["Currency Speculation: Tokenomic Cycle, Macro Hedging, and Value Investing", "A briefing on liquidity, policy shifts, and long-term capital allocation frameworks across digital assets."]
      ],
      news: "News",
      newsAction: "Learn More",
      newsCards: [
        ["Quantum Crypto Launches $21 Million Crypto Fund", "The London-based digital asset investment firm launched Quantum Crypto Fund I for family offices and high-net-worth clients."],
        ["Quantum Crypto Launches QuanTech II", "QuanTech II advances proprietary arbitrage trading with quantitative research, disciplined execution, and risk controls."]
      ],
      contact: "Contact Us",
      social: "Social Links",
      portal: "Investor Portal Login"
    };

    var shell = el("div", "qc-mobile-shell");
    shell.setAttribute("aria-label", "Quantum Crypto mobile content");

    var hero = el("section", "qc-mobile-hero");
    if (heroImage) hero.style.setProperty("--qc-hero-image", "url('" + heroImage.replace(/'/g, "\\'") + "')");
    hero.appendChild(el("div", "qc-hero-kicker", "Quantum Crypto"));
    hero.appendChild(el("h1", "", "Quantum Crypto"));
    hero.appendChild(el("p", "", copy.heroSubtitle));
    hero.appendChild(link("qc-button", copy.heroButton, "#qc-mobile-contact"));
    shell.appendChild(hero);

    var facts = el("section", "qc-section qc-keyfacts");
    facts.appendChild(el("h2", "", copy.keyFacts));
    var factGrid = el("div", "qc-fact-grid");
    factGrid.appendChild(fact("$21M", copy.initial));
    factGrid.appendChild(fact("Since 2016", copy.since));
    factGrid.appendChild(fact("London & Beijing", copy.presence));
    facts.appendChild(factGrid);
    facts.appendChild(el("p", "qc-footnote", copy.footnote));
    shell.appendChild(facts);

    var discover = el("section", "qc-section qc-discover");
    discover.appendChild(el("h2", "", copy.discover));
    discover.appendChild(el("p", "", copy.discoverBody));
    shell.appendChild(discover);

    var what = el("section", "qc-section qc-dark-section");
    what.appendChild(el("h2", "", copy.what));
    var whatCards = el("div", "qc-card-stack");
    copy.whatCards.forEach(function (item) { whatCards.appendChild(card(item[0], item[1])); });
    what.appendChild(whatCards);
    shell.appendChild(what);

    var mainline = el("section", "qc-section qc-mainline");
    mainline.appendChild(el("h2", "", copy.mainline));
    if (mainlineImage) {
      var img = el("img", "qc-section-image");
      img.src = mainlineImage;
      img.alt = "";
      mainline.appendChild(img);
    }
    var mainCards = el("div", "qc-card-stack");
    copy.mainCards.forEach(function (item) { mainCards.appendChild(card(item[0], item[1])); });
    mainline.appendChild(mainCards);
    shell.appendChild(mainline);

    var quote = el("section", "qc-mobile-quote");
    quote.appendChild(el("blockquote", "", copy.quote));
    quote.appendChild(el("p", "", "— " + copy.quoteBy));
    shell.appendChild(quote);

    var wealth = el("section", "qc-section qc-private");
    wealth.appendChild(el("h2", "", copy.privateTitle));
    if (wealthImage) {
      var wealthImg = el("img", "qc-section-image");
      wealthImg.src = wealthImage;
      wealthImg.alt = "";
      wealth.appendChild(wealthImg);
    }
    wealth.appendChild(el("p", "", copy.privateIntro));
    wealth.appendChild(bullets(copy.privateBullets));
    shell.appendChild(wealth);

    var reports = el("section", "qc-section qc-dark-section");
    reports.appendChild(el("h2", "", copy.reports));
    var reportList = el("div", "qc-report-list");
    copy.reportCards.forEach(function (item) { reportList.appendChild(report(item[0], item[1], copy.reportAction)); });
    reports.appendChild(reportList);
    shell.appendChild(reports);

    var news = el("section", "qc-section qc-news");
    news.appendChild(el("h2", "", copy.news));
    var newsList = el("div", "qc-report-list");
    copy.newsCards.forEach(function (item) { newsList.appendChild(report(item[0], item[1], copy.newsAction)); });
    news.appendChild(newsList);
    shell.appendChild(news);

    var contact = el("section", "qc-section qc-mobile-contact");
    contact.id = "qc-mobile-contact";
    contact.appendChild(el("h2", "", copy.contact));
    contact.appendChild(link("qc-contact-line", "Email: quantumcryptopr@proton.me", "mailto:quantumcryptopr@proton.me"));
    contact.appendChild(link("qc-contact-line", "Telephone: (+44) 0771963202", "tel:+440771963202"));
    contact.appendChild(el("p", "qc-contact-line", "Quantum Crypto, 14 Leinster Gardens, London, England, W2 6DR"));
    contact.appendChild(el("h3", "", copy.social));
    var socials = el("div", "qc-socials");
    ["LinkedIn", "X.com", "Facebook"].forEach(function (name) {
      socials.appendChild(link("qc-text-link", name, "#navigation"));
    });
    contact.appendChild(socials);
    contact.appendChild(link("qc-button qc-button-secondary", copy.portal, "#navigation"));
    shell.appendChild(contact);

    return shell;
  }

  function ensureBrand() {
    var mobileHeader = document.querySelector(".block-header-layout-mobile");
    if (!mobileHeader || mobileHeader.querySelector(".qc-mobile-brand")) return;
    var brand = link("qc-mobile-brand", "Quantum Crypto", "/quantumcrypto/");
    mobileHeader.insertBefore(brand, mobileHeader.firstChild);
  }

  function markOriginalContent() {
    var main = document.querySelector("main");
    if (!main) return;
    Array.prototype.slice.call(main.children).forEach(function (child) {
      if (child.classList.contains("qc-mobile-shell")) return;
      if (child.querySelector && child.querySelector(".block-header")) return;
      child.classList.add("qc-original-mobile-content");
    });
  }

  function correctVisibleCopy() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (textNode) {
      textNode.nodeValue = textNode.nodeValue
        .replace(/finnace/g, "finance")
        .replace(/developes/g, "develops")
        .replace(/crypto Assets/g, "crypto assets");
    });
  }

  function mount() {
    var main = document.querySelector("main");
    if (!main || !document.querySelector("#main") || !document.querySelector(".block-header-layout-mobile")) {
      return false;
    }

    var staleShell = document.querySelector(".qc-mobile-shell");
    if (staleShell && staleShell.querySelector("section.block")) {
      staleShell.remove();
      staleShell = null;
    }

    if (!mq.matches) {
      document.body.classList.remove("qc-mobile-enhanced");
      return true;
    }

    ensureBrand();

    if (!document.querySelector(".qc-mobile-shell")) {
      var headerBlock = Array.prototype.slice.call(main.children).find(function (child) {
        return child.querySelector && child.querySelector(".block-header");
      });
      if (headerBlock && headerBlock.nextSibling) {
        main.insertBefore(buildContent(), headerBlock.nextSibling);
      } else if (headerBlock) {
        main.appendChild(buildContent());
      } else {
        main.insertBefore(buildContent(), main.firstChild);
      }
    }

    markOriginalContent();
    correctVisibleCopy();
    document.body.classList.add("qc-mobile-enhanced");
    return true;
  }

  function scheduleMount(attempt) {
    attempt = attempt || 0;
    if (mount()) return;
    if (attempt < 40) {
      window.setTimeout(function () {
        scheduleMount(attempt + 1);
      }, 100);
    }
  }

  if (document.readyState === "complete") {
    window.setTimeout(function () { scheduleMount(); }, 300);
  } else {
    window.addEventListener("load", function () {
      window.setTimeout(function () { scheduleMount(); }, 300);
    }, { once: true });
  }
  mq.addEventListener ? mq.addEventListener("change", function () { scheduleMount(); }) : mq.addListener(function () { scheduleMount(); });
})();
