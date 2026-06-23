(function () {
  var MOBILE_QUERY = "(max-width: 768px)";
  var mq = window.matchMedia(MOBILE_QUERY);
  if (mq.matches) {
    document.documentElement.classList.add("qc-mobile-boot");
  }

  function isZh() {
    return (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  }

  function imageUrl(img) {
    if (!img) return "";
    var srcset = img.getAttribute("srcset") || "";
    var matches = srcset.match(/(?:https?:\/\/|\.{0,2}\/)[^\s]+?\s+\d+w/g) || [];
    var best = matches.map(function (candidate) {
      var parts = candidate.trim().split(/\s+/);
      return {
        url: parts[0],
        width: parts[1] ? parseInt(parts[1], 10) : 0
      };
    }).filter(function (candidate) {
      return candidate.url;
    }).sort(function (a, b) {
      return b.width - a.width;
    })[0];
    return best ? new URL(best.url, document.baseURI).href : (img.src || img.currentSrc || "");
  }

  function imageKey(url) {
    return (url || "").split("/").pop().replace(/\?.*$/, "");
  }

  function getImages(section) {
    var selector = section ? "#" + section + " img" : "img";
    var seen = {};
    return Array.prototype.slice.call(document.querySelectorAll(selector)).map(function (img) {
      return imageUrl(img);
    }).filter(function (url) {
      var key = imageKey(url);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function getImage(section, fallbackIndex) {
    var images = getImages(section);
    return images[fallbackIndex || 0] || images[0] || imageUrl(document.querySelector("#main img"));
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
    if (/^https?:\/\//.test(a.href) && a.origin !== window.location.origin) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function card(title, body, meta) {
    var item = el("article", "qc-card");
    if (meta) item.appendChild(el("span", "qc-card-meta", meta));
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

  function report(title, body, action, href, meta) {
    var item = el("article", "qc-report-card");
    if (meta) item.appendChild(el("span", "qc-card-meta", meta));
    item.appendChild(el("h3", "", title));
    item.appendChild(el("p", "", body));
    item.appendChild(link("qc-text-link", action, href || "#qc-mobile-contact"));
    return item;
  }

  function mediaReport(item, action) {
    var article = report(item[0], item[1], item[3] || action, item[4], item[5]);
    if (item[2]) {
      var img = el("img", "qc-report-image");
      img.src = item[2];
      img.alt = "";
      article.insertBefore(img, article.firstChild);
    }
    return article;
  }

  function bullets(items) {
    var list = el("ul", "qc-bullets");
    items.forEach(function (item) {
      list.appendChild(el("li", "", item));
    });
    return list;
  }

  function header(copy) {
    var siteHeader = el("header", "qc-mobile-header");
    siteHeader.appendChild(link("qc-mobile-brand", "Quantum Crypto", "/quantumcrypto/"));

    var menuButton = el("button", "qc-menu-button");
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.appendChild(el("span", ""));
    menuButton.appendChild(el("span", ""));
    menuButton.appendChild(el("span", ""));
    siteHeader.appendChild(menuButton);

    var nav = el("nav", "qc-mobile-menu");
    [
      ["Key Facts", "#qc-mobile-keyfacts"],
      ["What We Do", "#qc-mobile-what"],
      ["Mainline", "#qc-mobile-mainline"],
      [copy.reports, "#qc-mobile-reports"],
      [copy.contact, "#qc-mobile-contact"],
      [copy.language, copy.languageHref],
      [copy.portal, "/quantumcrypto/login/"]
    ].forEach(function (item) {
      nav.appendChild(link("", item[0], item[1]));
    });
    siteHeader.appendChild(nav);

    menuButton.addEventListener("click", function () {
      var isOpen = siteHeader.classList.toggle("qc-menu-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.addEventListener("click", function () {
      siteHeader.classList.remove("qc-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });

    return siteHeader;
  }

  function buildContent() {
    var zh = isZh();
    var heroImage = getImage("main", 0);
    var mainlineImage = getImage("mainline", 0);
    var wealthImage = getImage("privatewealth", 0);
    var reportImages = [0, 1, 2, 3, 4, 5, 6].map(function (index) {
      return getImage("reports", index);
    });

    var copy = zh ? {
      heroSubtitle: "连接传统资本与数字金融的加密宏观投资及私人财富平台。",
      heroButton: "联系我们",
      heroSecondaryButton: "投资者登录",
      heroKicker: "Digital Asset Investment",
      keyFacts: "关键数据",
      initial: "基金初始规模",
      since: "区块链与数字资产经验",
      presence: "全球交易与研究网络",
      footnote: "除另有说明，核心数据截至 2024 年 3 月 31 日。",
      discover: "了解 Quantum Crypto",
      discoverBody: "Quantum Crypto 聚焦数字资产、宏观周期与颠覆性新兴技术，为超高净值客户提供数字资产配置与策略管理服务，并致力于成为连接传统资本与加密金融的重要桥梁。",
      what: "业务方向",
      whatCards: [
        ["多策略投资", "运营多策略数字资产对冲基金，重点关注全球宏观趋势与事件驱动机会。", "01"],
        ["组合多元化", "通过布局颠覆性新兴技术，帮助投资者优化长期资产配置结构。", "02"],
        ["风险控制", "提供金融风险管理与 OTC 解决方案，提升数字资产配置的安全边界。", "03"]
      ],
      mainline: "主线",
      mainCards: [
        ["全球私人财富解决方案", "为高净值客户提供全球资产配置、合规框架与长期财富管理支持。", "Wealth"],
        ["自营交易部门", "在伦敦与北京设有办公室及交易中心，围绕宏观周期与事件驱动机会开展专有交易。", "Trading"],
        ["生态系统合作建设", "与战略合作伙伴、专业团队及行业资源协同，拓展研究、技术、资本与市场价值。", "Ecosystem"]
      ],
      quote: "“我们聚焦颠覆性技术，并致力于成为连接传统资本与加密金融的重要桥梁。”",
      quoteBy: "Ray Wong，Quantum Crypto 创始合伙人",
      privateTitle: "全球私人财富规划",
      privateIntro: "Quantum Crypto 为超高净值客户提供综合性财富顾问服务，覆盖跨境规划、交易安排与合规支持。",
      privateBullets: ["海外税务规划", "证券交易", "员工激励", "并购交易", "家族企业运营", "CRS 与 FATCA 合规"],
      reports: "宏观研究与活动",
      reportAction: "申请获取研究报告",
      reportCards: [
        ["Quantum Crypto 成为 2024 香港金融世博会赞助商及资产管理机构合作伙伴", "Quantum Crypto 宣布成为 2024 Wiki Finance Expo Hong Kong 的赞助商及资产管理合作伙伴。作为亚洲规模领先的金融科技、外汇与加密金融盛会，Wiki Finance Expo Hong Kong 为全球金融机构、科技企业与数字资产参与者提供了重要交流平台。", reportImages[0], "查看活动动态", "https://x.com/Wikiexpo_global/status/1789946359446913349", "Event"],
        ["主流全球资产概览与核心价值", "Quantum Crypto 围绕主流全球资产开展研究概览，比较主要资产类别的价值基础、风险特征及其在投资组合中的配置作用，并分析其在宏观环境变化下的长期意义。", reportImages[1], "申请获取研究报告", "#qc-mobile-contact", "Research"],
        ["2025 年香港金融政策分析与全球资产配置", "Quantum Crypto 发布关于 2025 年香港金融政策环境的研究概览，评估相关政策对跨境资本流动、数字金融发展及全球资产配置策略的影响。", reportImages[2], "申请获取研究报告", "#qc-mobile-contact", "Policy"],
        ["货币投机：代币经济周期、宏观对冲与价值投资", "Quantum Crypto 举办关于代币经济周期、宏观对冲与价值投资的研究简报，分析数字资产如何受到流动性环境、政策变化与长期资本配置框架的共同影响。", reportImages[3], "查看研究简报", "https://followin.io/zh-Hant/feed/14568355", "Briefing"],
        ["AI 概念：2024 年叙事周期与投资逻辑", "Quantum Crypto 在北京举办关于 AI 驱动市场叙事的研究简报，探讨基础设施周期、资本预期与技术采用如何共同塑造 2024 年的投资逻辑。", reportImages[4], "申请获取研究报告", "#qc-mobile-contact", "AI"],
        ["加密金融：开拓金融科技的未来", "Quantum Crypto 举办关于加密金融机构化发展的研究简报，重点分析比特币储备策略、稳定币监管，以及主要司法辖区的 VASP 牌照框架。", reportImages[5], "申请获取研究报告", "#qc-mobile-contact", "Crypto Finance"],
        ["数字资产与货币周期的机构视角", "Quantum Crypto 合伙人受邀出席北京大学 2024 Blockchain and Web3 Innovation Roundtable，并发表主题分享，从机构视角探讨比特币周期、宏观对冲、货币演进，以及数字资产市场中的价值投资逻辑。", reportImages[6], "查看报道", "https://foresightnews.pro/article/detail/71988", "Roundtable"]
      ],
      news: "新闻",
      newsAction: "了解更多",
      newsCards: [
        ["Quantum Crypto 推出 2,100 万美元数字资产基金", "面向家族办公室与高净值客户，聚焦全球货币市场中的宏观对冲策略机会。", "https://foresightnews.pro/article/detail/59778", "Fund"],
        ["Quantum Crypto 推出 QuanTech II", "拓展数字资产市场专有套利交易能力，以量化研究、纪律化执行与风险控制框架捕捉市场偏差。", "/quantumcrypto/login/", "Strategy"]
      ],
      contact: "联系方式",
      social: "社交链接",
      portal: "投资者登录",
      language: "English",
      languageHref: "/quantumcrypto/"
    } : {
      heroSubtitle: "A crypto macro investment and private wealth platform connecting traditional capital with digital finance.",
      heroButton: "Contact Us",
      heroSecondaryButton: "Investor Portal",
      heroKicker: "Digital Asset Investment",
      keyFacts: "Key Facts",
      initial: "Initial Fund Size",
      since: "Blockchain & Digital Asset Experience",
      presence: "Global Trading and Research Presence",
      footnote: "Core figures are as of March 31, 2024, unless otherwise indicated.",
      discover: "Discover Quantum Crypto",
      discoverBody: "Quantum Crypto is a crypto macro hedge fund targeting disruptive emerging technologies, providing crypto financial management services to ultra-high-net-worth clients and serving as a bridge between traditional capital and crypto finance.",
      what: "What We Do",
      whatCards: [
        ["Multi-Strategy Investment", "We operate a multi-strategy crypto hedge fund focused on global macro and corporate events.", "01"],
        ["Portfolio Diversification", "We help investors diversify portfolios through exposure to disruptive emerging technologies.", "02"],
        ["Risk Control", "We provide financial risk management and OTC solutions designed to protect crypto assets.", "03"]
      ],
      mainline: "Mainline",
      mainCards: [
        ["Private Global Wealth Solutions", "We support compliant global asset allocation, efficient wealth management, and family legacy planning.", "Wealth"],
        ["Proprietary Trading", "With offices and trading rooms in London and Beijing, we trade digital assets around macro and event-driven opportunities.", "Trading"],
        ["Ecosystem Partnerships", "We collaborate with strategic partners and specialist teams to expand research, technology, capital, and market value.", "Ecosystem"]
      ],
      quote: "“We focus on disruptive technologies and serve as a bridge for traditional capital into crypto finance.”",
      quoteBy: "Ray Wong, Founding Partner of Quantum Crypto",
      privateTitle: "Private Wealth Solutions",
      privateIntro: "We offer a focused range of wealth advisory services for ultra-high-net-worth clients across planning, transactions, incentives, and compliance.",
      privateBullets: ["Overseas Tax Planning", "Securities Trading", "Employee Incentives", "Mergers and Acquisitions", "Family Business Operations", "CRS & FATCA Compliance"],
      reports: "Macro Reports & Events",
      reportAction: "Request Research",
      reportCards: [
        ["Quantum Crypto Named Sponsor and Asset Management Partner of Wiki Finance EXPO Hong Kong", "Quantum Crypto announced partnership with Wiki Finance Expo Hong Kong 2024, Asia's largest fintech, forex, and crypto event, as a sponsor and Asset Management partner.", reportImages[0], "View Event", "https://x.com/Wikiexpo_global/status/1789946359446913349", "Event"],
        ["Overview of Mainstream Global Assets and Core Value", "Quantum Crypto conducted a research overview of mainstream global assets, comparing value foundations, risk characteristics, and portfolio roles across major asset classes under changing macro conditions.", reportImages[1], "Request Research", "#qc-mobile-contact", "Research"],
        ["2025 Hong Kong Financial Policy Analysis and Global Asset Allocation", "Quantum Crypto released a research overview on Hong Kong's 2025 financial policy landscape, assessing implications for cross-border capital flows, digital finance development, and global asset allocation strategy.", reportImages[2], "Request Research", "#qc-mobile-contact", "Policy"],
        ["Currency Speculation: Tokenomic Cycle, Macro Hedging, and Value Investing", "Quantum Crypto delivered a research briefing on tokenomic cycles, macro hedging, and value investing, analyzing how digital assets respond to liquidity conditions, policy shifts, and long-term allocation frameworks.", reportImages[3], "View Briefing", "https://followin.io/zh-Hant/feed/14568355", "Briefing"],
        ["AI Concept: 2024 Narratives and Investment Logic", "Quantum Crypto delivered a research briefing in Beijing on AI-driven market narratives, examining how infrastructure cycles, capital expectations, and technological adoption shaped investment logic in 2024.", reportImages[4], "Request Research", "#qc-mobile-contact", "AI"],
        ["Crypto Finance: Pioneering the Future of FinTech", "Quantum Crypto delivered a research briefing on the institutional development of crypto finance, examining Bitcoin reserve strategies, stablecoin regulation, and VASP licensing frameworks across major jurisdictions.", reportImages[5], "Request Research", "#qc-mobile-contact", "Crypto Finance"],
        ["Institutional Perspectives on Digital Assets and Monetary Cycles", "A Quantum Crypto partner was invited to speak at Peking University's 2024 Blockchain and Web3 Innovation Roundtable, sharing institutional perspectives on Bitcoin cycles, macro hedging, monetary evolution, and digital asset value investing.", reportImages[6], "View Coverage", "https://foresightnews.pro/article/detail/71988", "Roundtable"]
      ],
      news: "News",
      newsAction: "Learn More",
      newsCards: [
        ["Quantum Crypto Launches $21 Million Crypto Fund", "The London-based digital asset investment firm launched Quantum Crypto Fund I for family offices and high-net-worth clients.", "https://foresightnews.pro/article/detail/59778", "Fund"],
        ["Quantum Crypto Launches QuanTech II", "QuanTech II advances proprietary arbitrage trading with quantitative research, disciplined execution, and risk controls.", "/quantumcrypto/login/", "Strategy"]
      ],
      contact: "Contact Us",
      social: "Social Links",
      portal: "Investor Portal Login",
      language: "汉语",
      languageHref: "/quantumcrypto/zh/"
    };

    var shell = el("div", "qc-mobile-shell");
    shell.setAttribute("data-qc-mobile-shell", "true");
    shell.setAttribute("aria-label", "Quantum Crypto mobile content");
    shell.appendChild(header(copy));

    var hero = el("section", "qc-mobile-hero");
    if (heroImage) hero.style.setProperty("--qc-hero-image", "url('" + heroImage.replace(/'/g, "\\'") + "')");
    hero.appendChild(el("div", "qc-hero-kicker", copy.heroKicker));
    hero.appendChild(el("h1", "", "Quantum Crypto"));
    hero.appendChild(el("p", "", copy.heroSubtitle));
    var heroActions = el("div", "qc-hero-actions");
    heroActions.appendChild(link("qc-button", copy.heroButton, "#qc-mobile-contact"));
    heroActions.appendChild(link("qc-button qc-button-secondary", copy.heroSecondaryButton, "/quantumcrypto/login/"));
    hero.appendChild(heroActions);
    shell.appendChild(hero);

    var facts = el("section", "qc-section qc-keyfacts");
    facts.id = "qc-mobile-keyfacts";
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
    what.id = "qc-mobile-what";
    what.appendChild(el("h2", "", copy.what));
    var whatCards = el("div", "qc-card-stack");
    copy.whatCards.forEach(function (item) { whatCards.appendChild(card(item[0], item[1], item[2])); });
    what.appendChild(whatCards);
    shell.appendChild(what);

    var mainline = el("section", "qc-section qc-mainline");
    mainline.id = "qc-mobile-mainline";
    mainline.appendChild(el("h2", "", copy.mainline));
    if (mainlineImage) {
      var img = el("img", "qc-section-image");
      img.src = mainlineImage;
      img.alt = "";
      mainline.appendChild(img);
    }
    var mainCards = el("div", "qc-card-stack");
    copy.mainCards.forEach(function (item) { mainCards.appendChild(card(item[0], item[1], item[2])); });
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
    reports.id = "qc-mobile-reports";
    reports.appendChild(el("h2", "", copy.reports));
    var reportList = el("div", "qc-report-list");
    copy.reportCards.forEach(function (item) { reportList.appendChild(mediaReport(item, copy.reportAction)); });
    reports.appendChild(reportList);
    shell.appendChild(reports);

    var news = el("section", "qc-section qc-news");
    news.appendChild(el("h2", "", copy.news));
    var newsList = el("div", "qc-report-list");
    copy.newsCards.forEach(function (item) { newsList.appendChild(report(item[0], item[1], copy.newsAction, item[2], item[3])); });
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
    socials.appendChild(link("qc-text-link", "X.com", "https://x.com/Wikiexpo_global/status/1789946359446913349"));
    socials.appendChild(link("qc-text-link", "Research", "https://followin.io/zh-Hant/feed/14568355"));
    contact.appendChild(socials);
    contact.appendChild(link("qc-button qc-button-secondary", copy.portal, "/quantumcrypto/login/"));
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
      child.setAttribute("aria-hidden", "true");
      child.inert = true;
    });
  }

  function restoreOriginalContent() {
    Array.prototype.slice.call(document.querySelectorAll(".qc-original-mobile-content")).forEach(function (child) {
      child.classList.remove("qc-original-mobile-content");
      child.removeAttribute("aria-hidden");
      child.inert = false;
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
    if (!main || !document.querySelector("#main")) {
      return false;
    }

    var staleShell = document.querySelector("[data-qc-mobile-shell]");
    if (staleShell && staleShell.querySelector("section.block")) {
      staleShell.remove();
      staleShell = null;
    }

    if (!mq.matches) {
      document.documentElement.classList.remove("qc-mobile-boot");
      document.body.classList.remove("qc-mobile-enhanced");
      if (staleShell) staleShell.remove();
      restoreOriginalContent();
      return true;
    }

    document.documentElement.classList.add("qc-mobile-boot");
    if (!document.querySelector("[data-qc-mobile-shell]")) {
      document.body.insertBefore(buildContent(), document.body.firstChild);
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

  scheduleMount();
  if (document.readyState !== "complete") {
    document.addEventListener("DOMContentLoaded", function () { scheduleMount(); }, { once: true });
    window.addEventListener("load", function () {
      scheduleMount();
    }, { once: true });
  } else {
    scheduleMount();
  }
  mq.addEventListener ? mq.addEventListener("change", function () { scheduleMount(); }) : mq.addListener(function () { scheduleMount(); });
})();
