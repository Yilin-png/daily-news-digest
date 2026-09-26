export type ConceptCategory = "事件" | "政策" | "概念" | "机构" | "技术" | "人物" | "地理";

export interface Concept {
  id: string;
  name: string;
  category: ConceptCategory;
  /** Literal strings matched in article bodies to auto-link the first mention. */
  aliases: string[];
  summary: string;
  /** Supports [[concept-id|显示文字]] wiki links. */
  detail: string;
}

export const conceptCategories: ConceptCategory[] = [
  "事件",
  "政策",
  "概念",
  "技术",
  "机构",
  "人物",
  "地理",
];

export const concepts: Concept[] = [
  // —— 中美关系 ——
  {
    id: "constructive-strategic-stability",
    name: "中美建设性战略稳定关系",
    category: "政策",
    aliases: ["中美建设性战略稳定关系", "建设性战略稳定关系"],
    summary: "2026 年 5 月特朗普访华期间双方提出的中美关系新定位。",
    detail:
      "据财新报道，其内涵被概括为「合作为主、竞争有度、分歧可控、和平可期」，强调以机制化沟通管理竞争，而非追求一次性的全面协议。它与 [[us-china-trade-truce|贸易休战]]、[[us-china-ai-dialogue|中美 AI 对话]]等安排相互配套，是理解 2026 年两次元首会晤的总框架。",
  },
  {
    id: "us-china-ai-dialogue",
    name: "中美 AI 对话",
    category: "政策",
    aliases: ["风险与收益对话", "AI 事件通报机制", "AI 事件通知热线", "事故沟通机制", "AI 对话"],
    summary: "中美政府间就人工智能风险开展的双边沟通机制。",
    detail:
      "2024 年 5 月两国在日内瓦举行首次 AI 政府间对话；同年 11 月两国元首在利马同意，核武器使用决定应由人类而非 AI 作出。2026 年美方提出建立国家安全级 AI 事件通报机制，思路类似冷战时期的美苏热线，用于在 AI 相关事故发生时快速沟通、避免误判。它与 [[chip-export-controls|芯片出口管制]]并存，构成「一边对话、一边设防」的格局；[[hallucination|AI 幻觉]]引发军事误判的风险是其现实背景之一。",
  },
  {
    id: "us-china-trade-war",
    name: "中美贸易战",
    category: "事件",
    aliases: ["贸易战", "贸易摩擦"],
    summary: "2018 年起中美相互加征关税的经贸冲突。",
    detail:
      "特朗普第一任期依据 301 调查对华加征关税，2020 年 1 月双方签署第一阶段经贸协议。2025 年 4 月「对等关税」使双方税率一度超过 100%，5 月日内瓦会谈后大幅回落，10 月釜山会晤后进入 [[us-china-trade-truce|贸易休战]]。其间 [[rare-earths|稀土]]与 [[chip-export-controls|芯片]]成为双方最重要的筹码。",
  },
  {
    id: "us-china-trade-truce",
    name: "中美贸易休战",
    category: "事件",
    aliases: ["贸易休战", "经济休战", "贸易缓和协议", "关税休战"],
    summary: "2025 年 10 月釜山会晤达成、为期一年的关税与出口管制互相暂停安排。",
    detail:
      "美方下调芬太尼相关关税并暂停部分制裁措施，中方暂停 2025 年 10 月宣布的扩大 [[rare-earths|稀土]]出口管制、恢复采购 [[soybeans|美国大豆]]。关键条款原定 2026 年 11 月 10 日到期，华盛顿峰会仅延长两个月至 2027 年 1 月 10 日。它是 [[us-china-trade-war|贸易战]]的阶段性停火，而非终局协议。",
  },
  {
    id: "nixon-1972",
    name: "尼克松访华",
    category: "事件",
    aliases: ["1972 年尼克松访华", "尼克松"],
    summary: "1972 年 2 月美国总统尼克松访问中国，开启中美关系正常化。",
    detail:
      "访问期间双方发表《上海公报》，美方表示「认识到」海峡两岸都认为只有一个中国；1979 年两国正式建交，同年美国国会通过 [[taiwan-relations-act|台湾关系法]]。访问后中国向美国赠送大熊猫，开启了 [[panda-diplomacy|熊猫外交]]。",
  },
  {
    id: "rare-earths",
    name: "稀土",
    category: "概念",
    aliases: ["稀土", "关键矿产"],
    summary: "17 种金属元素的统称，是永磁体、电机、军工和电子产品的关键原料。",
    detail:
      "中国在稀土开采、精炼和永磁体制造上占据主导地位。2025 年 4 月起中国对部分中重稀土实施出口许可管理，10 月又宣布扩大范围，随后在 [[us-china-trade-truce|贸易休战]]中暂停。稀土与美国的 [[chip-export-controls|芯片出口管制]]构成中美相互牵制的两张牌，也是西方 [[de-risking|去风险]]的核心领域。",
  },
  {
    id: "soybeans",
    name: "美国大豆采购",
    category: "政策",
    aliases: ["美国大豆", "大豆", "农产品"],
    summary: "中国对美农产品采购承诺，是中美贸易协议中政治意义最强的部分。",
    detail:
      "美国中西部农业州是共和党重要票仓。贸易战期间中国转向巴西采购，美国农民损失惨重。釜山休战中国承诺 2026—2028 年每年采购 2500 万吨美国大豆，执行进度被视为衡量 [[us-china-trade-truce|休战]]成效的晴雨表。",
  },
  {
    id: "chip-export-controls",
    name: "芯片出口管制",
    category: "政策",
    aliases: ["芯片出口限制", "芯片出口"],
    summary: "美国限制先进 AI 芯片及制造设备对华出口的政策。",
    detail:
      "2022 年 10 月拜登政府出台全面管制，此后多次加码。特朗普第二任期更趋交易化：2025 年曾允许英伟达 H20 芯片对华销售并收取收入分成。中国则以 [[rare-earths|稀土]]出口管制作为反制筹码。",
  },
  {
    id: "de-risking",
    name: "去风险",
    category: "政策",
    aliases: ["降低相互依赖"],
    summary: "不全面脱钩、只在敏感领域降低对对手依赖的经济安全策略。",
    detail:
      "2023 年欧盟委员会主席冯德莱恩提出这一说法，后被美国与 G7 采纳。中美贸易委员会把商品分为「关键」与「正常」两类分别处理，正是去风险思路的具体化；[[rare-earths|稀土]]和芯片是其中的核心领域。",
  },
  {
    id: "g2",
    name: "G2",
    category: "概念",
    aliases: ["G2"],
    summary: "「两国集团」，指中美两国共同主导全球事务的构想。",
    detail:
      "该提法由美国经济学家弗雷德·伯格斯滕在 2000 年代提出，奥巴马时期一度被热议，中方长期表示不接受「两国共治」的说法。特朗普在 2025 年釜山会晤前用「G2」形容与习近平的会面，使这一词重新流行。",
  },
  {
    id: "taiwan-relations-act",
    name: "台湾关系法",
    category: "政策",
    aliases: ["台湾关系法"],
    summary: "1979 年中美建交后美国国会通过的法律，规范美台非官方关系。",
    detail:
      "该法要求美国向台湾提供「防御性武器」，并把以非和平方式决定台湾前途视为对西太平洋和平的威胁，但并未承诺出兵防卫。它是 [[strategic-ambiguity|战略模糊]]的法律基础，也是 [[taiwan-arms-sales|对台军售]]的依据；中方认为其违反中美三个联合公报。",
  },
  {
    id: "strategic-ambiguity",
    name: "战略模糊",
    category: "政策",
    aliases: ["战略模糊"],
    summary: "美国对台湾若遭攻击是否出兵刻意不作明确承诺的政策。",
    detail:
      "这一政策既意在阻止台湾宣布「独立」，也意在阻止大陆以武力改变现状。拜登曾多次表态会出兵，被视为向「战略清晰」偏移；特朗普第二任期回到更模糊、更交易化的立场，甚至把 [[taiwan-arms-sales|军售]]视为谈判筹码。",
  },
  {
    id: "taiwan-arms-sales",
    name: "对台军售",
    category: "政策",
    aliases: ["军售包", "军售"],
    summary: "美国依据台湾关系法向台湾出售武器装备。",
    detail:
      "每次大额军售都会引发北京强烈抗议。2025 年美国批准约 111 亿美元军售；另一笔约 140 亿美元的军售包因峰会被推迟，特朗普称其为「很好的谈判筹码」，引发外界对美国 [[taiwan-relations-act|台湾关系法]]承诺连续性的担忧。",
  },
  {
    id: "thucydides-trap",
    name: "修昔底德陷阱",
    category: "概念",
    aliases: ["修昔底德陷阱"],
    summary: "崛起国与守成国之间因权力转移而容易爆发战争的说法。",
    detail:
      "源自古希腊史学家修昔底德对伯罗奔尼撒战争的论述：「雅典的崛起及其引起的斯巴达的恐惧使战争不可避免。」哈佛学者格雷厄姆·艾利森 2012 年提出这一概念，2017 年出书推广。习近平多次表示世界上本无修昔底德陷阱，以此强调中美可以避免冲突。",
  },
  {
    id: "panda-diplomacy",
    name: "熊猫外交",
    category: "政策",
    aliases: ["大熊猫", "熊猫"],
    summary: "中国以赠送或租借大熊猫作为外交友好象征的做法。",
    detail:
      "1972 年 [[nixon-1972|尼克松访华]]后，中国向美国国家动物园赠送「玲玲」和「兴兴」；此后改为以合作研究名义租借。2023—2024 年多家美国动物园的熊猫陆续归还，包括 1999 年起饲养熊猫的亚特兰大动物园，一度被视为关系降温的象征。",
  },
  {
    id: "bessent",
    name: "斯科特·贝森特",
    category: "人物",
    aliases: ["贝森特", "Bessent"],
    summary: "美国财政部长，特朗普第二任期对华经贸谈判的主要负责人。",
    detail:
      "贝森特曾是对冲基金经理。2025 年起他与中国国务院副总理何立峰牵头日内瓦、伦敦、斯德哥尔摩、马德里等多轮经贸磋商，推动达成 [[us-china-trade-truce|贸易休战]]，并提出建立 [[us-china-ai-dialogue|国家安全级 AI 事件通报机制]]。",
  },
  {
    id: "apec-g20",
    name: "APEC 与 G20",
    category: "机构",
    aliases: ["APEC", "G20"],
    summary: "亚太经合组织与二十国集团，两大多边经济合作平台。",
    detail:
      "2026 年 APEC 由中国在深圳主办，G20 由美国主办，2027 年 G20 轮值主席国为英国。中美互相支持对方办会，被视为关系稳定的信号；英国则希望借主办 G20 推动 [[ai-safety-summits|AI 全球治理]]。",
  },
  {
    id: "party-congress",
    name: "中共全国代表大会",
    category: "事件",
    aliases: ["党代会"],
    summary: "中国共产党每五年召开一次的全国代表大会，决定领导层与路线方针。",
    detail:
      "第二十次党代会于 2022 年召开，第二十一次将于 2027 年召开。重大政治日程之前，北京通常更重视外部环境稳定，这也是 2026 年中美双方都倾向「稳住局面」的原因之一。",
  },
  {
    id: "iran-war",
    name: "伊朗与海湾冲突",
    category: "事件",
    aliases: ["伊朗战争", "中东冲突", "海湾战争", "伊朗"],
    summary: "本期多篇报道提及的、2026 年持续的伊朗与海湾地区军事冲突。",
    detail:
      "据报道，冲突把油价推高至每桶 100 美元以上，扰乱 [[hormuz|霍尔木兹海峡]]航运，推高 [[vlcc|油轮运价]]，并成为中美峰会上难以达成一致的议题；美方还指责中国企业向伊朗提供卫星图像。能源涨价也让英国等经济体面临 [[second-round-effects|二轮通胀]]压力。",
  },

  // —— 英国 ——
  {
    id: "brexit",
    name: "英国脱欧",
    category: "事件",
    aliases: ["脱欧"],
    summary: "英国 2016 年公投决定、2020 年正式完成的退出欧盟进程。",
    detail:
      "脱欧后英国失去欧盟单一市场的无摩擦准入，增长和贸易受到拖累。外交上，英国一边维护 [[special-relationship|英美特殊关系]]，一边尝试与欧盟在安全与防务上「重置」关系。",
  },
  {
    id: "special-relationship",
    name: "英美特殊关系",
    category: "概念",
    aliases: ["特殊关系"],
    summary: "丘吉尔 1946 年提出的说法，指英美在情报、核武器和军事上的紧密同盟。",
    detail:
      "两国共享「五眼联盟」情报体系，英国核威慑依赖美制三叉戟导弹。[[chagos|查戈斯群岛]]上的迪戈加西亚基地也是英美军事合作的关键节点。",
  },
  {
    id: "chagos",
    name: "查戈斯群岛",
    category: "地理",
    aliases: ["查戈斯群岛", "查戈斯"],
    summary: "印度洋群岛，英国 1965 年将其从毛里求斯分离，岛上迪戈加西亚是英美共用军事基地。",
    detail:
      "国际法院 2019 年发表咨询意见，认为英国应尽快结束对群岛的管辖。2025 年 5 月英国与毛里求斯签署条约，把主权移交毛里求斯，同时以 99 年租约保留迪戈加西亚基地。该协议在美国共和党内颇受批评，也让外界关注英国在 [[falklands|福克兰群岛]]问题上的立场。",
  },
  {
    id: "falklands",
    name: "福克兰群岛（马尔维纳斯群岛）",
    category: "地理",
    aliases: ["福克兰"],
    summary: "南大西洋群岛，英国与阿根廷存在主权争议。",
    detail:
      "1982 年阿根廷出兵占领，英国派特遣舰队夺回，史称福克兰战争。英国在 [[chagos|查戈斯]]问题上让步后，外界担心会产生示范效应，伯纳姆因此重申英国对福克兰的主权立场。",
  },
  {
    id: "ai-safety-summits",
    name: "全球 AI 安全峰会",
    category: "事件",
    aliases: ["AI 全球原则"],
    summary: "由英国发起的政府间人工智能安全峰会系列。",
    detail:
      "2023 年 11 月英国在布莱切利园主办首届峰会，中美等 28 国和欧盟签署《布莱切利宣言》。此后峰会在首尔（2024）、巴黎（2025）、新德里（2026）举行，议题逐渐从「安全」转向「行动」和「影响」。行业层面的对应物是 [[frontier-model-forum|Frontier Model Forum]] 等自律组织。",
  },
  {
    id: "patriot",
    name: "爱国者防空系统",
    category: "技术",
    aliases: ["「爱国者」", "爱国者", "防空导弹"],
    summary: "美国研制的远程地对空导弹系统，可拦截飞机、巡航导弹和弹道导弹。",
    detail:
      "乌克兰依靠爱国者抵御俄罗斯弹道导弹，但每枚拦截弹价值数百万美元，产能有限。用它拦截廉价的 [[shahed|Shahed 无人机]]严重不划算，这正是乌克兰大力发展 [[fpv-interceptor|拦截无人机]]的原因。",
  },

  // —— 能源与产业 ——
  {
    id: "catl",
    name: "宁德时代",
    category: "机构",
    aliases: ["宁德时代"],
    summary: "全球最大的动力电池制造商，总部位于福建宁德。",
    detail:
      "公司 2011 年成立，2018 年在深交所上市，2025 年 5 月在港股上市，是当年全球规模最大的 IPO 之一。其全球动力电池份额长期接近四成，[[lfp|磷酸铁锂]]产能居首。车企的 [[de-catl|去宁德化]]和公司业务转向 [[energy-storage|储能]]是近期两大看点。",
  },
  {
    id: "lfp",
    name: "磷酸铁锂电池（LFP）",
    category: "技术",
    aliases: ["LFP"],
    summary: "以磷酸铁锂为正极材料的锂电池，成本低、寿命长、热稳定性好。",
    detail:
      "与三元锂电池相比，LFP 能量密度较低，但不含钴镍、更便宜更安全。比亚迪刀片电池等结构创新弥补了续航劣势，使 LFP 在 2020 年后重回主流，也被广泛用于 [[energy-storage|储能]]。",
  },
  {
    id: "ultra-fast-charging",
    name: "超快充",
    category: "技术",
    aliases: ["超快充", "闪充"],
    summary: "以兆瓦级功率在数分钟内为电动车补充大部分电量的技术。",
    detail:
      "实现超快充需要电池材料、电芯散热、整车高压平台和充电桩同时升级。2025 年比亚迪推出兆瓦级闪充，[[catl|宁德时代]]、吉利等随后跟进，竞争进入「5 分钟」区间。",
  },
  {
    id: "de-catl",
    name: "去宁德化",
    category: "概念",
    aliases: ["去宁德化"],
    summary: "车企通过自研电池或扶持第二供应商，降低对宁德时代依赖的策略。",
    detail:
      "动力电池约占整车成本三到四成，单一供应商的议价权直接挤压车企利润。但替代供应商在规模、良率和技术上短期难以追平 [[catl|宁德时代]]，分析师认为它「更多是叙事而非根本转变」；监管层的 [[anti-involution|反内卷]]表态也限制了借此压价的空间。",
  },
  {
    id: "anti-involution",
    name: "反内卷",
    category: "政策",
    aliases: ["不能把低价等同低成本"],
    summary: "中国官方 2024 年以来整治行业无序价格战的政策导向。",
    detail:
      "汽车、光伏、电池等行业产能过剩导致持续降价，压缩利润和研发投入。监管层强调竞争应基于技术和效率，而非牺牲质量的低价，这也约束了车企借 [[de-catl|去宁德化]]压价的做法。",
  },
  {
    id: "energy-storage",
    name: "储能",
    category: "技术",
    aliases: ["储能"],
    summary: "用电池等方式储存电能、在需要时释放，用于平衡电网和保障供电。",
    detail:
      "风电光伏的波动性与 [[ai-data-center|AI 数据中心]]的全天候用电需求，使大型储能快速增长，成为电池厂商在电动车之外的第二增长曲线。",
  },
  {
    id: "ai-data-center",
    name: "AI 数据中心",
    category: "概念",
    aliases: ["数据中心"],
    summary: "为训练和运行大模型而建设的大规模算力设施，以耗电、耗水巨大著称。",
    detail:
      "单个 AI 园区的用电规模可达数吉瓦，相当于一座中型城市，电网接入、供水和许可成为主要瓶颈。美国多地开始立法要求数据中心自担电网升级成本；开发商则转向 [[fuel-cell|燃料电池]]、燃气机组乃至 [[smr|小型核反应堆]]等自建电源。[[stargate|星际之门]]是其中规模最大的计划之一。",
  },
  {
    id: "stargate",
    name: "星际之门（Stargate）",
    category: "事件",
    aliases: ["Stargate", "星际之门"],
    summary: "2025 年 1 月 OpenAI、软银、Oracle 等宣布的美国大型 AI 基础设施计划。",
    detail:
      "计划宣称未来四年投资最高 5000 亿美元。Oracle 作为主要云合作方负责建设和运营多个园区，新墨西哥 Project Jupiter 是其中之一。其融资高度依赖银行贷款与私募资本，暴露出 [[ai-data-center|AI 数据中心]]扩张的财务风险，也是 [[openai|OpenAI]] 算力战略的核心。",
  },
  {
    id: "take-or-pay",
    name: "照付不议",
    category: "概念",
    aliases: ["「无论如何付款」", "无论如何付款"],
    summary: "买方无论是否实际使用，都必须按约付款的合同条款。",
    detail:
      "常见于天然气、电力和基础设施租赁，目的是保证开发商有稳定现金流偿还贷款。对承租人而言，项目延误的风险主要落在自己身上，只能借助 [[force-majeure|不可抗力]]等条款争取缓冲。",
  },
  {
    id: "force-majeure",
    name: "不可抗力",
    category: "概念",
    aliases: ["不可抗力通知", "不可抗力"],
    summary: "因无法预见、无法避免的外部事件，允许合同方延迟或免除履约的条款。",
    detail:
      "通常涵盖自然灾害、战争、政府行为等。Oracle 以供电和许可延误为由发出通知，本质是推迟 [[take-or-pay|照付不议]]租金的起付时间，而非减少应付总额。",
  },
  {
    id: "fuel-cell",
    name: "燃料电池",
    category: "技术",
    aliases: ["燃料电池"],
    summary: "通过电化学反应把天然气或氢气直接转化为电能的发电装置。",
    detail:
      "Bloom Energy 的固体氧化物燃料电池可在现场快速部署，帮助 [[ai-data-center|数据中心]]绕开漫长的电网并网排队，但仍需天然气供应与空气排放许可。",
  },
  {
    id: "junk-rating",
    name: "垃圾级评级",
    category: "概念",
    aliases: ["垃圾级"],
    summary: "低于 BBB-（标普口径）的高收益、投机级信用评级。",
    detail:
      "跌入垃圾级会使许多只能持有投资级债券的机构被迫卖出，借款成本随之上升。Oracle 为 [[ai-data-center|AI 基建]]大举借债，评级已降至距垃圾级一档。",
  },
  {
    id: "smr",
    name: "小型模块化反应堆（SMR）",
    category: "技术",
    aliases: ["SMR", "小型模块化反应堆"],
    summary: "单堆功率通常在 300 兆瓦以下、可在工厂预制模块化生产的核反应堆。",
    detail:
      "支持者认为标准化制造能摆脱大型核电站「每座都是定制」的超支困境，也更适合为 [[ai-data-center|AI 数据中心]]就近供电。但目前多数设计尚未商业运行，供应链和监管审批仍是瓶颈，[[vogtle|沃格特勒核电站]]的教训让投资者格外谨慎。",
  },
  {
    id: "vogtle",
    name: "沃格特勒核电站",
    category: "事件",
    aliases: ["上一个核项目"],
    summary: "美国佐治亚州核电站，其 3、4 号机组是美国数十年来首批新建核电机组。",
    detail:
      "项目 2013 年开工，原计划 2016—2017 年投运，实际拖到 2023 年和 2024 年，总成本超过 300 亿美元，是最初预算的两倍多，其间承包商西屋电气于 2017 年申请破产。它是评估 [[smr|SMR]] 等新核电项目时的主要风险参照。",
  },
  {
    id: "vlcc",
    name: "超大型原油运输船（VLCC）",
    category: "技术",
    aliases: ["VLCC", "超大型原油运输船"],
    summary: "载重 20 万至 32 万吨、可装约 200 万桶原油的油轮，是远洋原油运输主力。",
    detail:
      "油轮运价由「吨海里」需求决定：航程越长、等待越久，所需船只越多，运价越高。VLCC 适合中东、西非、巴西到亚洲的长航线；较小的苏伊士型油轮约装 100 万桶。满载 VLCC 无法通过 [[suez|苏伊士运河]]。",
  },
  {
    id: "hormuz",
    name: "霍尔木兹海峡",
    category: "地理",
    aliases: ["霍尔木兹海峡", "霍尔木兹"],
    summary: "连接波斯湾与阿曼湾的狭窄水道，全球约五分之一石油消费量经此运输。",
    detail:
      "最窄处约 33 公里，沙特、伊拉克、阿联酋、科威特、卡塔尔和伊朗的油气出口高度依赖这里。1980 年代两伊「油轮战」期间美国海军曾为油轮护航。沙特东西管道可把原油输往红海延布港，部分绕开海峡，但又面临 [[houthi|胡塞武装]]威胁。",
  },
  {
    id: "suez",
    name: "苏伊士运河与 SUMED 管道",
    category: "地理",
    aliases: ["苏伊士运河", "苏伊士"],
    summary: "连接红海与地中海的运河，是欧亚航运捷径。",
    detail:
      "满载 [[vlcc|VLCC]] 吃水过深无法通过，须先在红海一侧把原油卸入埃及 SUMED 管道，输送到地中海一侧再装船。[[houthi|胡塞武装]]袭击商船后，大量船只改绕好望角，航程增加一到两周。",
  },
  {
    id: "houthi",
    name: "胡塞武装",
    category: "机构",
    aliases: ["胡塞"],
    summary: "控制也门北部的武装组织，与伊朗关系密切。",
    detail:
      "2023 年 11 月起以支持加沙为由袭击红海商船，迫使大量航运公司绕行好望角，红海—[[suez|苏伊士]]航线运量大幅下降。",
  },

  // —— 宏观经济 ——
  {
    id: "boe-mpc",
    name: "英格兰银行货币政策委员会",
    category: "机构",
    aliases: ["货币政策委员会", "英格兰银行"],
    summary: "负责制定英国利率的九人委员会，由英格兰银行行长主持。",
    detail:
      "委员包括行长、三位副行长、首席经济学家和四名外部委员，一人一票，每年开会八次，目标是把 CPI 通胀维持在 2%。在能源冲击下，委员会需判断是否出现 [[second-round-effects|二轮效应]]。",
  },
  {
    id: "second-round-effects",
    name: "二轮效应",
    category: "概念",
    aliases: ["二轮效应", "二轮通胀"],
    summary: "初始价格冲击通过工资和企业定价扩散、演变成持续性通胀的过程。",
    detail:
      "能源涨价本身是「第一轮」影响；如果企业普遍上调售价、工人要求更高工资，就会形成工资—价格螺旋。央行通常「看穿」第一轮冲击，但对二轮效应必须加息应对。英国家庭账单受 [[energy-price-cap|能源价格上限]]影响，传导存在时滞。",
  },
  {
    id: "energy-price-cap",
    name: "能源价格上限",
    category: "政策",
    aliases: ["价格上限"],
    summary: "英国能源监管机构 Ofgem 为家庭电气标准费率设定的上限。",
    detail:
      "2019 年起实施，现按季度根据批发价格调整。由于调整滞后，国际油气涨价往往数月后才体现在家庭账单和 CPI 中，给 [[boe-mpc|英格兰银行]]判断通胀路径带来难度。",
  },
  {
    id: "rent-burden",
    name: "30% 租金负担线",
    category: "概念",
    aliases: ["Carrie Bradshaw 指数", "税前收入 30%"],
    summary: "房租不超过税前收入 30% 即视为「可负担」的通行标准。",
    detail:
      "源于美国公共住房政策：1969 年布鲁克修正案把公房租金上限定为收入的 25%，1981 年提高到 30%。经济学人据此编制「Carrie Bradshaw 指数」，以《欲望都市》中独居纽约的专栏作家命名，测算独居者租一套单间所需的年收入。它随 [[housing-cycle|住房供给周期]]起伏。",
  },
  {
    id: "housing-cycle",
    name: "住房供给周期",
    category: "概念",
    aliases: ["新开工量"],
    summary: "租金上涨刺激开工、集中交付压低租金、开工回落再推高租金的循环。",
    detail:
      "公寓从开工到交付通常需要两到三年。2021—2022 年低利率与租金暴涨带来开工高峰，2024—2025 年集中交付压低租金；高利率又使新开工骤降，意味着未来可能再度供不应求，[[rent-burden|租金负担]]改善或许只是暂时。",
  },

  // —— 俄乌战争 ——
  {
    id: "total-war",
    name: "总体战",
    category: "概念",
    aliases: ["总体战"],
    summary: "动员并打击整个国家的经济、社会与人口，而非只针对军队的战争形态。",
    detail:
      "概念因一战德国将领鲁登道夫 1935 年的同名著作而流行。俄乌战争中，双方都在打击对方的能源、物流和工业设施，战争日益演变为经济消耗战；廉价的 [[shahed|Shahed 无人机]]让持续远程打击经济目标成为可能。",
  },
  {
    id: "shahed",
    name: "Shahed / 天竺葵（Geran）无人机",
    category: "技术",
    aliases: ["Shahed/Geran", "天竺葵", "Geran"],
    summary: "伊朗设计、俄罗斯仿制的单程攻击无人机（巡飞弹）。",
    detail:
      "Shahed-136 采用活塞发动机，时速约 185 公里，造价低、可成群发射，2022 年 9 月起被俄军大量使用。俄方在鞑靼斯坦阿拉布加经济特区本土化生产并改称 Geran（天竺葵）。新一代 Geran-3/4/5 改用涡喷发动机，速度翻倍并加装 AI 目标识别，使廉价的 [[fpv-interceptor|FPV 拦截]]难以奏效，迫使乌方动用 [[patriot|防空导弹]]。",
  },
  {
    id: "fpv-interceptor",
    name: "FPV 拦截无人机",
    category: "技术",
    aliases: ["FPV 拦截机", "拦截机"],
    summary: "由操作员以第一人称视角操控、撞击或引爆摧毁来袭无人机的小型无人机。",
    detail:
      "单价约数千美元，远低于防空导弹，是乌克兰对抗 [[shahed|Shahed]] 的「低成本防线」，与机枪机动组和 [[electronic-warfare|电子战]]配合使用。但面对时速 400 公里以上的喷气无人机，拦截机的速度和操控性已接近极限。",
  },
  {
    id: "electronic-warfare",
    name: "电子战",
    category: "技术",
    aliases: ["电子战"],
    summary: "利用电磁频谱干扰、欺骗或压制敌方通信、导航和雷达的作战方式。",
    detail:
      "乌克兰以卫星导航干扰让部分无人机偏航坠毁；俄方则为 [[shahed|Geran]] 加装抗干扰天线和网状电台应对，双方攻防持续迭代。",
  },

  // —— 人工智能 ——
  {
    id: "ai-agent",
    name: "AI 智能体",
    category: "技术",
    aliases: ["智能体"],
    summary: "能理解目标、规划步骤并调用工具自主完成任务的 AI 系统。",
    detail:
      "与只回答问题的聊天机器人不同，智能体可以操作软件、浏览网页、编写和运行代码。它带来效率提升，也带来新的安全问题：安全测试中已出现智能体越权访问系统、相互通信等行为。跨设备智能体需要 [[on-device-ai|端侧模型]]与云端协同。",
  },
  {
    id: "on-device-ai",
    name: "端侧 AI 与混合计算",
    category: "技术",
    aliases: ["端侧模型", "混合计算"],
    summary: "在手机、电脑、汽车等终端本地运行 AI 模型，并与边缘和云端协同的架构。",
    detail:
      "端侧运行时延低、隐私好、无需支付云端 [[token|Token]] 费用，但受芯片算力、内存和功耗限制，复杂任务仍要交给云端。先进制程（如 [[process-node|2nm]]）和专用 NPU 决定了终端能跑多大的模型。",
  },
  {
    id: "6g",
    name: "6G",
    category: "技术",
    aliases: ["6G"],
    summary: "5G 之后的下一代移动通信标准，目标约 2030 年前后商用。",
    detail:
      "国际电信联盟将其称为 IMT-2030，3GPP 预计在 2020 年代末完成首批标准。6G 设想把通信、感知与 AI 深度融合，为大量 [[ai-agent|智能体]]设备提供低时延连接。",
  },
  {
    id: "process-node",
    name: "2nm 制程",
    category: "技术",
    aliases: ["2nm"],
    summary: "半导体制造工艺节点，数字越小通常代表晶体管密度越高、能效越好。",
    detail:
      "如今「2nm」已不对应真实物理尺寸，而是工艺代际的名称。台积电 2nm 采用全环绕栅极（GAA）晶体管，2025 年底进入量产，是手机旗舰芯片提升 [[on-device-ai|端侧 AI]]能力的基础。",
  },
  {
    id: "data-retention",
    name: "数据留存与训练授权",
    category: "概念",
    aliases: ["不留存", "留存"],
    summary: "AI 服务商是否保存用户输入、保存多久、是否用于训练模型。",
    detail:
      "企业客户通常要求「零留存」条款，但服务商出于滥用监控、法律调查等原因往往会保留部分数据一段时间。编程工具需要读取整个代码库，风险更高，[[zhipu|智谱]] ZCode 争议正是这一边界的典型案例。",
  },
  {
    id: "zhipu",
    name: "智谱",
    category: "机构",
    aliases: ["智谱"],
    summary: "源自清华大学的中国大模型公司，GLM 系列模型的开发者。",
    detail:
      "智谱成立于 2019 年，被视为中国「AI 六小虎」之一，2025 年 1 月被美国列入实体清单。其 MaaS 平台面向企业和开发者提供模型 API，近年积极推动模型 [[open-weight-model|开源]]。",
  },
  {
    id: "moe",
    name: "混合专家模型（MoE）",
    category: "技术",
    aliases: ["27B 激活"],
    summary: "由多个「专家」子网络组成、每次推理只激活其中一部分参数的模型架构。",
    detail:
      "「600B 总参数、27B 激活」意味着模型总容量很大，但单次计算量接近一个 27B 的模型，从而兼顾能力与成本。DeepSeek-V3 等模型让 MoE 成为主流，也是 [[deepseek-moment|DeepSeek 冲击]]中低成本的来源之一。",
  },
  {
    id: "open-weight-model",
    name: "开源 / 开放权重模型",
    category: "技术",
    aliases: ["开源"],
    summary: "公开模型权重、允许他人下载、部署和微调的模型。",
    detail:
      "严格说来，多数「开源模型」只开放权重，训练数据和代码未必公开。中国公司普遍采用开源策略扩大生态影响力，Meta 的 Llama 系列曾是美国开源路线的代表。开源模型通常不在行业安全组织对 [[frontier-model|前沿模型]]的初期监督范围内。",
  },
  {
    id: "antitrust",
    name: "AI 反垄断",
    category: "政策",
    aliases: ["反垄断"],
    summary: "针对 AI 巨头在算力、数据、分发渠道上滥用市场地位的法律审查与诉讼。",
    detail:
      "监管者担心少数公司通过与云厂商深度绑定、独占数据和控制模型分发来垄断市场。行业自建的 [[frontier-model|前沿模型]]安全标准组织，也面临「排斥竞争者」的质疑。",
  },
  {
    id: "deepseek-moment",
    name: "DeepSeek 冲击",
    category: "事件",
    aliases: ["DeepSeek"],
    summary: "2025 年 1 月中国公司深度求索发布低成本高性能模型，引发全球科技股震荡。",
    detail:
      "DeepSeek-R1 以远低于美国对手的训练成本达到接近前沿的推理能力，1 月 27 日英伟达市值单日蒸发近 6000 亿美元。它让市场重新审视「堆算力」的必要性，[[moe|MoE]] 架构与高效训练成为焦点，也证明了「更便宜」本身就是竞争力，参见 [[narrow-model|窄任务模型]]。",
  },
  {
    id: "narrow-model",
    name: "窄任务模型",
    category: "技术",
    aliases: ["只做决策"],
    summary: "只针对特定任务、输出空间受限的 AI 模型，与「什么都能聊」的通用大模型相对。",
    detail:
      "典型任务包括分类、打分、从固定选项中选择答案。它们消耗的 [[token|Token]] 少、延迟低、结果更易评估，适合企业流程中大量重复的结构化决策。",
  },
  {
    id: "token",
    name: "Token（词元）",
    category: "技术",
    aliases: ["Token"],
    summary: "大模型处理文本的基本单位，也是 API 计费的单位。",
    detail:
      "英文里一个 Token 约为 3—4 个字母，中文里大致对应一到两个汉字，视模型的分词方式而定。模型输出越长、推理步骤越多，消耗的 Token 越多、成本越高，这是 [[narrow-model|窄任务模型]]主打低成本的原因。",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "机构",
    aliases: ["OpenAI"],
    summary: "ChatGPT 与 GPT 系列模型的开发商，生成式 AI 浪潮的引领者。",
    detail:
      "2015 年以非营利组织成立，2019 年设立「利润上限」子公司并获微软投资，2025 年完成重组、主体改为 [[pbc|公益公司]]。其庞大的算力需求催生了 [[stargate|星际之门]]计划，它也是 [[frontier-model-forum|Frontier Model Forum]] 的创始成员之一。",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "机构",
    aliases: ["Anthropic"],
    summary: "Claude 系列模型开发商，以强调 AI 安全著称的前沿实验室。",
    detail:
      "2021 年由 Dario 与 Daniela Amodei 等前 [[openai|OpenAI]] 成员创立，注册为 [[pbc|公益公司]]，并设立 [[ltbt|长期利益信托]]监督公司使命。亚马逊和谷歌是其重要投资方。",
  },
  {
    id: "deepmind",
    name: "Google DeepMind",
    category: "机构",
    aliases: ["DeepMind"],
    summary: "谷歌旗下人工智能研究机构，Gemini 系列模型的开发者。",
    detail:
      "DeepMind 2010 年在伦敦成立，2014 年被谷歌收购，以 AlphaGo、AlphaFold 闻名。2023 年 4 月与 Google Brain 合并为 Google DeepMind，统一负责 [[gemini|Gemini]] 模型研发。",
  },
  {
    id: "gemini",
    name: "Gemini 模型家族",
    category: "技术",
    aliases: ["Gemini 4", "Gemini"],
    summary: "谷歌 DeepMind 开发的多模态大模型系列。",
    detail:
      "2023 年 12 月发布 1.0，此后推出 1.5、2.0、2.5 和 2025 年 11 月的 Gemini 3，并以 Pro（旗舰）与 Flash（轻量、廉价）分层。Gemini 4 已进入 [[post-training|后训练]]阶段，由 [[deepmind|Google DeepMind]] 研发。",
  },
  {
    id: "post-training",
    name: "后训练",
    category: "技术",
    aliases: ["后训练"],
    summary: "在预训练得到基础模型后，通过指令微调、强化学习等方法调校模型行为的阶段。",
    detail:
      "预训练决定模型「知道什么」，后训练决定模型「如何回答」：是否可靠、是否遵循指令、是否安全。随着推理模型兴起，基于强化学习的后训练成为各家 [[frontier-model|前沿模型]]竞争的焦点。",
  },
  {
    id: "frontier-model",
    name: "前沿模型",
    category: "概念",
    aliases: ["前沿模型", "前沿 AI"],
    summary: "能力处于行业最前沿、可能带来新型风险的最先进 AI 模型。",
    detail:
      "监管讨论常以训练算力（例如 10^26 次浮点运算）等门槛来界定前沿模型。由少数头部公司自定标准，容易被批评为抬高门槛、排斥 [[open-weight-model|开源]]和后来者，引发 [[antitrust|反垄断]]担忧。",
  },
  {
    id: "voluntary-commitments",
    name: "白宫 AI 自愿承诺",
    category: "政策",
    aliases: ["自愿安全承诺", "自愿测试框架"],
    summary: "2023 年 7 月白宫与七家 AI 公司达成的非强制性安全承诺。",
    detail:
      "内容包括发布前进行内外部安全测试、分享风险信息、为 AI 生成内容加水印等。由于没有法律约束力，执行效果难以评估，这也是行业希望把承诺落到可执行标准和 [[third-party-audit|第三方审计]]的原因。",
  },
  {
    id: "frontier-model-forum",
    name: "Frontier Model Forum",
    category: "机构",
    aliases: ["Frontier Model Forum"],
    summary: "2023 年 7 月由 Anthropic、谷歌、微软、OpenAI 发起的前沿 AI 安全行业组织。",
    detail:
      "主要工作是分享安全研究、制定最佳实践，但不具备认证或执法职能。新筹建的 SAFA 被批评与其功能重叠，二者都聚焦 [[frontier-model|前沿模型]]。",
  },
  {
    id: "caisi",
    name: "CAISI",
    category: "机构",
    aliases: ["CAISI"],
    summary: "美国商务部下属的「AI 标准与创新中心」，负责前沿模型评测。",
    detail:
      "前身是 2023 年 11 月设立、隶属 NIST 的美国 AI 安全研究所，2025 年 6 月更名并调整定位，更强调国家安全与产业竞争力。部分业界人士认为其资源不足以承担全面的 [[third-party-audit|第三方测试]]。",
  },
  {
    id: "third-party-audit",
    name: "第三方测试与审计",
    category: "政策",
    aliases: ["第三方测试", "独立审计师"],
    summary: "由开发者以外的独立机构在模型上线前后评估其能力与风险。",
    detail:
      "类似财务审计或药品临床试验的外部把关。难点在于审计方需要模型访问权限、专业能力和独立性，以及由谁认定审计师资质——这正是 SAFA 想解决的问题，与 [[caisi|CAISI]] 的职能部分重叠。",
  },
  {
    id: "hallucination",
    name: "AI 幻觉",
    category: "概念",
    aliases: ["幻觉"],
    summary: "AI 模型生成看似合理但与事实不符内容的现象。",
    detail:
      "幻觉源于模型按统计规律生成文本，而非检索并核实事实。在军事和情报等高风险场景中，幻觉可能引发误判，这也是 [[us-china-ai-dialogue|AI 事件通报机制]]被提出的背景之一。",
  },
  {
    id: "p-doom",
    name: "p(doom) 末日概率",
    category: "概念",
    aliases: ["人类灭绝"],
    summary: "AI 圈对「AI 导致人类灭绝或永久失控」主观概率的简称。",
    detail:
      "不同研究者的估计从接近零到超过一半不等，本质是主观判断而非可检验的统计。它常被用来论证暂停或限制 [[superintelligence|超级智能]]研发，也被批评者视为夸大叙事；其结构与气候 [[tipping-point|临界点]]叙事相似。",
  },
  {
    id: "superintelligence",
    name: "超级智能",
    category: "概念",
    aliases: ["超级智能"],
    summary: "在几乎所有认知任务上都远超人类的假想 AI 系统。",
    detail:
      "牛津哲学家博斯特罗姆 2014 年在同名著作中系统讨论了其风险。2025 年 10 月，一份呼吁在取得科学共识和公众支持之前禁止研发超级智能的声明获得大量科学家与公众人物联署。",
  },
  {
    id: "tipping-point",
    name: "临界点",
    category: "概念",
    aliases: ["临界点"],
    summary: "系统越过某个阈值后发生突然、难以逆转变化的状态。",
    detail:
      "气候科学中的临界点包括格陵兰冰盖崩解、亚马孙雨林退化等。这一概念让风险叙事从「渐进恶化」变成「突然失控」，AI 末日论中的「智能爆炸」有着类似结构，参见 [[p-doom|p(doom)]]。",
  },

  // —— 生物医药 ——
  {
    id: "peptide",
    name: "肽",
    category: "概念",
    aliases: ["肽类", "肽"],
    summary: "由少量氨基酸连接而成的短链分子，比蛋白质小、比小分子药大。",
    detail:
      "人体许多信号分子是肽，例如胰岛素、GLP-1。肽类药物特异性强、副作用相对可控，但在消化道中易被降解、难以吸收，因此大多只能注射。[[oral-peptide|口服肽]]是突破这一限制的方向。",
  },
  {
    id: "oral-peptide",
    name: "口服肽药物",
    category: "技术",
    aliases: ["口服肽", "口服药"],
    summary: "能以药片形式服用、并在体内保持活性的肽类药物。",
    detail:
      "实现路径包括添加吸收促进剂（如 2019 年获批的口服司美格鲁肽 Rybelsus），以及把分子设计成更稳定的 [[cyclic-peptide|环肽]]。口服化能让原本需要注射的疗法进入更早的治疗阶段，市场潜力巨大。",
  },
  {
    id: "cyclic-peptide",
    name: "环肽",
    category: "技术",
    aliases: ["「闭环」肽"],
    summary: "首尾或侧链相连形成环状结构的肽，比线性肽更耐酶解、更稳定。",
    detail:
      "蛇、蜗牛等动物的毒液中常见高度稳定的环肽。药物化学家借鉴这些结构，去除毒性、保留稳定性，这是研发 [[oral-peptide|口服肽]]的核心技术之一。",
  },
  {
    id: "psoriasis",
    name: "银屑病",
    category: "概念",
    aliases: ["银屑病"],
    summary: "一种慢性免疫介导的炎症性皮肤病，俗称「牛皮癣」。",
    detail:
      "患者皮肤出现红斑、鳞屑，部分伴有关节炎。治疗通常从外用药、传统口服药逐步升级到注射生物制剂，其中阻断 [[il23|IL-23]] 通路的药物疗效最好。",
  },
  {
    id: "il23",
    name: "IL-23 通路与生物制剂",
    category: "概念",
    aliases: ["生物制剂", "Skyrizi"],
    summary: "白细胞介素-23 是驱动银屑病炎症的关键信号分子，阻断它可显著改善病情。",
    detail:
      "艾伯维的 Skyrizi（瑞莎珠单抗）是 IL-23 抑制剂的代表，维持期约每 12 周注射一次，2019 年获批后成为银屑病市场的主导药物之一。Icotyde 则以口服 [[peptide|肽]]阻断 IL-23 受体。",
  },
  {
    id: "polycythemia",
    name: "真性红细胞增多症",
    category: "概念",
    aliases: ["罕见血癌"],
    summary: "一种骨髓增殖性肿瘤，骨髓过度生成红细胞，属于罕见血液癌症。",
    detail:
      "患者血液黏稠、血栓风险高，传统治疗依赖定期放血。Protagonist 与武田合作的药物模拟调节铁代谢的激素铁调素，以抑制红细胞过度生成，也是一种 [[peptide|肽]]类药物。",
  },
  {
    id: "royalty",
    name: "特许权使用费（版税）",
    category: "概念",
    aliases: ["版税"],
    summary: "技术或产品授权方按销售额向被授权方收取的分成。",
    detail:
      "小型生物科技公司常把药物授权给大药企开发和销售，自己按销售额收取阶梯版税，以稳定现金流支持后续研发，而无需承担全球商业化成本。",
  },

  // —— 文化传媒 ——
  {
    id: "a24",
    name: "A24",
    category: "机构",
    aliases: ["A24"],
    summary: "美国独立电影公司，以作者电影和鲜明品牌著称。",
    detail:
      "2012 年成立，发行过奥斯卡最佳影片《月光男孩》，出品《瞬息全宇宙》。「独立」既是创作姿态，也是品牌资产，吸引了 Thrive Capital 等科技资本，以及 [[deepmind|Google DeepMind]] 的技术合作投资。",
  },
  {
    id: "backrooms",
    name: "后室（The Backrooms）",
    category: "事件",
    aliases: ["《后室》", "后室"],
    summary: "源自网络的「阈限空间」恐怖题材，讲述人误入无尽空旷黄色房间的故事。",
    detail:
      "2019 年以一张图片和一段文字出现在 4chan；2022 年青年创作者 Kane Parsons 用 3D 软件 Blender 制作伪纪录片短片，在 YouTube 走红；2023 年 [[a24|A24]] 宣布将其改编为长片。它是「低成本个人创作走进院线」的代表，与 [[generative-video|生成式视频]]的叙事形成反差。",
  },
  {
    id: "micro-drama",
    name: "微短剧",
    category: "概念",
    aliases: ["微短剧"],
    summary: "单集一两分钟、竖屏播放、节奏极快的网络短剧。",
    detail:
      "2023 年起在中国爆发式增长，凭借低成本、快速迭代和付费解锁模式跑通商业闭环，并出海欧美。由于对画质和叙事连贯性要求相对较低，成为 [[generative-video|生成式视频]]最早大规模落地的领域。",
  },
  {
    id: "generative-video",
    name: "生成式 AI 与影视工业",
    category: "技术",
    aliases: ["生成式 AI", "视频生成"],
    summary: "用 AI 生成画面、角色和镜头，辅助或替代传统影视制作。",
    detail:
      "代表工具有 OpenAI Sora、Runway、Google Veo 等。2023 年好莱坞编剧与演员工会罢工，把 AI 使用规则写入劳资协议；此后电影公司一边公开表态谨慎，一边与 AI 公司签约合作，[[micro-drama|微短剧]]则率先大规模应用。",
  },

  // —— 公司治理 ——
  {
    id: "pbc",
    name: "公益公司（PBC）",
    category: "概念",
    aliases: ["公益型公司", "公益公司"],
    summary: "美国特拉华州等地的一种公司形式，董事会在追求利润的同时须兼顾特定公共利益。",
    detail:
      "普通公司主要对股东负责，公益公司则可在章程中写明使命，并据此平衡股东回报。[[anthropic|Anthropic]] 与重组后的 [[openai|OpenAI]] 都采用这一形式。",
  },
  {
    id: "ltbt",
    name: "长期利益信托（LTBT）",
    category: "机构",
    aliases: ["Long-Term Benefit Trust"],
    summary: "Anthropic 设立的独立信托，成员不持有公司股份，逐步获得董事会多数任命权。",
    detail:
      "2023 年公开，目的是让与商业利益无关的受托人确保公司坚持安全使命。它与创始人的 [[dual-class|超级投票权]]共同构成 [[anthropic|Anthropic]] 独特的治理结构。",
  },
  {
    id: "dual-class",
    name: "双重股权结构",
    category: "概念",
    aliases: ["特殊类别股份", "特殊类别股票"],
    summary: "让部分股东（通常是创始人）持有每股投票权更高的股票，以少量股份控制公司。",
    detail:
      "谷歌 2004 年、Facebook 2012 年上市时都采用这一结构。Palantir 2020 年上市时设计了 F 类股，保证三位创始人合计约 49.999999% 的投票权。支持者认为它保护长期愿景，批评者认为削弱外部股东监督，与 [[ipo|IPO]] 后的公司治理密切相关。",
  },
  {
    id: "ipo",
    name: "IPO（首次公开募股）",
    category: "概念",
    aliases: ["IPO"],
    summary: "公司首次向公众发行股票并在交易所上市。",
    detail:
      "上市带来巨额融资和流动性，也意味着信息披露、季度业绩压力和外部股东的影响力，因此创始人常借 [[dual-class|双重股权]]保留控制权。",
  },

  {
    id: "eight-point-consensus",
    name: "中美八点成果共识",
    category: "政策",
    aliases: ["八点共识", "八点成果共识"],
    summary: "2026 年 9 月习近平访美期间，双方公布的八项可操作安排。",
    detail:
      "据财新梳理，内容包括构建建设性战略稳定关系、互相支持办好 [[apec-g20|APEC 与 G20]]、伊朗不发展核武器、国际水道不征收通行费、经贸机制与「300 亿美元」降税、禁毒执法、[[us-china-ai-dialogue|人工智能对话与事件沟通渠道]]、大熊猫抵美，以及两军危机沟通备忘录。它把国事访问的仪式落到具体接口上，但并未解决 [[rare-earths|稀土]]、[[strategic-ambiguity|台湾]]等结构性分歧。",
  },
  {
    id: "engels-pause",
    name: "恩格斯停顿",
    category: "概念",
    aliases: ["恩格斯停顿"],
    summary: "工业革命早期生产率上升、但实际工资长期停滞的历史现象。",
    detail:
      "经济史学者罗伯特·艾伦用这个词描述英国约 1800 至 1840 年：机器提高了产出，工资却没有同步上涨，收益更多归于资本。把它类比到人工智能，核心问题是 [[task-framework|任务替代]]会不会快过新任务的创造，使劳动收入份额再次停滞。",
  },
  {
    id: "task-framework",
    name: "任务框架",
    category: "概念",
    aliases: ["任务框架"],
    summary: "阿西莫格鲁与雷斯特雷波用来分析自动化的经济学框架。",
    detail:
      "技术同时产生三种效应：替代旧任务、提高剩余任务的生产率、创造新任务。若 [[ai-agent|人工智能]]主要自动化旧任务，资本积累未必增加劳动需求；若它帮助人们创造新产品和新职业，则更像互补。这是讨论 [[engels-pause|恩格斯停顿]]会不会重演的主要分析工具。",
  },
  {
    id: "yen-carry",
    name: "日元套利交易",
    category: "概念",
    aliases: ["日元套利"],
    summary: "借入低息日元、投资更高收益资产的交易策略。",
    detail:
      "日本长期超低利率使日元成为主要融资货币。一旦日本持续加息、日元快速升值，投资者会平仓偿还日元，可能同时抛售美元风险资产。2024 年 8 月的日元急升曾引发全球股市剧烈波动。它是理解本次美日欧同月加息外溢的关键。",
  },
  {
    id: "agent-misalignment",
    name: "智能体失配",
    category: "概念",
    aliases: ["失配", "misaligned", "「失控」"],
    summary: "AI 代理在没有相应指令时，做出损害用户或第三方的行为。",
    detail:
      "OpenAI 用这个词描述测试和训练中的 [[ai-agent|代理]]：绕过网站限制、在第三方站点发帖（所谓 agent spam）、使用网上找到的凭证，甚至泄露用户图片。它不同于模型「答错题」，而是代理把完成任务放在规则之前。多起事件推动了暂停部署的争论，也是 [[us-china-ai-dialogue|AI 事件沟通]]要处理的现实风险。",
  },
  {
    id: "personalized-pricing",
    name: "个性化定价",
    category: "概念",
    aliases: ["个性化定价"],
    summary: "按顾客身份、行为或支付能力对同一商品报出不同价格。",
    detail:
      "电子货架标签和购物数据让商家可以实时改价。支持者称之为动态定价，批评者担心对急于购买或支付能力更弱的人收取更高价格。美国联邦贸易委员会正在就此征求意见。沃尔玛公开承诺货架价格不因人而异，正是对这一争议的回应。",
  },
  {
    id: "navier-stokes",
    name: "纳维—斯托克斯方程",
    category: "概念",
    aliases: ["纳维—斯托克斯"],
    summary: "描述流体运动的偏微分方程，其解的存在性与光滑性是千禧年数学难题之一。",
    detail:
      "方程由克劳德-路易·纳维和乔治·斯托克斯在 19 世纪建立，是空气、水流和天气模型的基础。克雷数学研究所 2000 年把它列为七大千禧年难题，悬赏 100 万美元。争议在于：给出答案是否等于提供可被数学共同体理解和复核的证明。",
  },
  {
    id: "industrial-ai",
    name: "工业人工智能",
    category: "技术",
    aliases: ["工业 AI"],
    summary: "把 AI 和软件叠在工厂设备、电网、建筑与交通系统上的应用。",
    detail:
      "与通用聊天机器人不同，工业 AI 的价值来自设备数据和控制权：谁掌握工厂、电网和机器，谁就更可能把软件卖进产线。西门子、ABB、霍尼韦尔都在这条路上竞争，软件收购和部门重组是常见手段。",
  },
  {
    id: "weighted-blanket",
    name: "加重毯",
    category: "概念",
    aliases: ["加重毯"],
    summary: "以玻璃珠等填充、提供均匀压力的毯子，被宣传为有助睡眠和缓解焦虑。",
    detail:
      "灵感部分来自用于安抚牲畜的挤压通道。现有试验显示，它常常改善主观睡眠质量和情绪评分，但对入睡时长、夜醒次数等客观指标的效果不稳定。偏好和安慰效应因此很难与生理作用分开。",
  },
  {
    id: "grossman",
    name: "瓦西里·格罗斯曼",
    category: "人物",
    aliases: ["Grossman"],
    summary: "苏联作家兼战地记者，以斯大林格勒报道和小说《生活与命运》闻名。",
    detail:
      "格罗斯曼 1905 年生于别尔季切夫，二战中为《红星报》随军采访，并最早系统记录纳粹大屠杀。其母亲 1941 年在家乡遇害。长篇小说《生活与命运》因批评斯大林体制被禁，手稿后被偷运到西方。他常被用来讨论：在宣传体制里，战地记者还能留下多少亲眼所见。",
  },
  {
    id: "mortgage-rate",
    name: "美国房贷利率",
    category: "概念",
    aliases: ["房贷利率", "房贷"],
    summary: "美国家庭购房最常参照的 30 年期固定利率抵押贷款利率。",
    detail:
      "它紧跟长期国债收益率，而不是央行的隔夜政策利率。油价和通胀预期推高长端收益率时，即使财政部门回购旧国债，房贷也不一定下降。2026 年中期选举前，利率升过 7% 被看作选民体感经济的关键指标。",
  },
  {
    id: "cdc",
    name: "美国疾病控制与预防中心（CDC）",
    category: "机构",
    aliases: ["CDC"],
    summary: "美国联邦公共卫生机构，负责疫情监测、疫苗指导和地方卫生支持。",
    detail:
      "CDC 隶属卫生与公众服务部，向州和地方卫生部门提供技术支持和拨款。大规模裁员、旅行审批拖延和政治任命增加后，麻疹响应、国际疫情支援和项目拨款都会变慢。它的能力下降不会只体现在华盛顿，而会体现在地方拿不到及时建议。",
  },
  {
    id: "inference-market",
    name: "推理服务",
    category: "技术",
    aliases: ["推理服务商", "推理"],
    summary: "替开发者运行开源或第三方模型、按调用收费的云计算业务。",
    detail:
      "训练做出模型，推理才是每次回答问题的计算。Fal、Fireworks、Baseten、Modal 把开放模型做成 API，价格通常低于 [[openai|OpenAI]] 和 [[anthropic|Anthropic]] 的闭源模型。需求暴涨推高了估值，但毛利率约 50%，低于传统软件，且会受到闭源模型降价的挤压。",
  },
  {
    id: "muse",
    name: "Meta Muse",
    category: "技术",
    aliases: ["Muse"],
    summary: "Meta 的个人 AI 代理，运行在用户专属的云端环境里。",
    detail:
      "Muse 可以读取用户的邮件和文件来完成任务，因此一旦被恶意网页或本机恶意软件诱导，风险不是一条聊天记录，而是整个个性化账户。Meta 因安全和信任问题推迟发布数月，并在漏洞曝光后加强了授权警告。它说明 [[ai-agent|消费级智能体]]的安全问题已经先于硬件热潮出现。",
  },
  {
    id: "nightlife-commission",
    name: "夜场提成",
    category: "概念",
    aliases: ["点香槟", "订房订台"],
    summary: "夜场销售靠推销高价酒水和订台、按消费额抽成的计酬方式。",
    detail:
      "一杯成本很低的香槟可以被标出数十倍价格，销售的收入主要来自提成而不是工资。任务指标、消费排名和「不能得罪客人」的规矩，把陪酒、被触摸的风险和收入绑在一起。这是理解夜场劳动里性别、消费和自主之间张力的具体制度。",
  },
];
