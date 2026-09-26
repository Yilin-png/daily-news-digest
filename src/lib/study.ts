export interface TimelineItem {
  time: string;
  event: string;
}

export interface Study {
  /** Paragraphs support [[concept-id|显示文字]] wiki links. */
  background: string[];
  timeline: TimelineItem[];
  terms: string[];
  questions: string[];
}

export const studies: Record<string, Study> = {
  "1": {
    background: [
      "中美关系自 [[nixon-1972|1972 年尼克松访华]]与 1979 年建交以来，经历了合作、接触与竞争的多轮起伏。2018 年起 [[us-china-trade-war|贸易战]]与科技管制把两国推入「战略竞争」阶段；2025 年 10 月两国元首在韩国釜山会晤，达成为期一年的 [[us-china-trade-truce|贸易休战]]：美方下调部分芬太尼相关关税，中方暂停新一轮 [[rare-earths|稀土]]出口管制并恢复采购美国农产品。",
      "2026 年 5 月特朗普访华，双方提出构建 [[constructive-strategic-stability|中美建设性战略稳定关系]]；四个月后习近平回访华盛顿，即「不到半年实现互访」。AI 议题早有铺垫：2024 年 5 月两国在日内瓦举行首次 [[us-china-ai-dialogue|AI 政府间对话]]，同年 11 月利马会晤确认核武器使用决定应由人类掌控。台湾问题仍是美方 [[strategic-ambiguity|战略模糊]]与中方底线之间的核心分歧。",
    ],
    timeline: [
      { time: "1972-02", event: "尼克松访华，发表《上海公报》" },
      { time: "1979-01", event: "中美正式建交；同年美国国会通过《台湾关系法》" },
      { time: "2018-07", event: "美国对华加征首批 301 关税，贸易战开始" },
      { time: "2024-11", event: "两国元首利马会晤，同意核武器使用决定须由人类作出" },
      { time: "2025-10", event: "釜山会晤，达成为期一年的贸易休战" },
      { time: "2026-05", event: "特朗普访问北京，提出「建设性战略稳定关系」" },
      { time: "2026-09-24", event: "白宫会谈，当晚举行国宴" },
    ],
    terms: [
      "constructive-strategic-stability",
      "us-china-ai-dialogue",
      "us-china-trade-truce",
      "strategic-ambiguity",
      "apec-g20",
    ],
    questions: [
      "「扩大合作清单、压缩问题清单」反映了怎样的关系管理思路？它与全面协议有何不同？",
      "双方都强调 AI 须由人类掌控，却在芯片出口上相互设防，这两种态度如何并存？",
    ],
  },
  "2": {
    background: [
      "高通凭借 CDMA 专利和骁龙芯片成为移动时代的核心供应商，中国手机品牌的崛起让中国市场长期贡献其近半收入。2015 年高通曾因专利许可问题被中国发改委处以 9.75 亿美元反垄断罚款，此后通过合资与本地合作深化在华布局。",
      "生成式 AI 兴起后，芯片厂商的卖点从单纯算力转向 [[on-device-ai|端侧模型]]：在手机本地运行大模型，以降低时延和云端成本、保护隐私。[[ai-agent|智能体]]进一步要求多台设备共享上下文、代替用户执行任务，这需要跨厂商协议和新的连接标准，[[6g|6G]] 被视为下一代基础设施，[[process-node|2nm]] 等先进制程则决定终端能承载多大的模型。",
    ],
    timeline: [
      { time: "2015-02", event: "中国发改委对高通处以 9.75 亿美元反垄断罚款" },
      { time: "2019", event: "中国 5G 正式商用" },
      { time: "2023", event: "骁龙旗舰芯片开始支持在手机上运行生成式大模型" },
      { time: "2026-09", event: "骁龙峰会：约 300 亿参数端侧模型、两款 2nm 手机芯片" },
      { time: "2027—2028", event: "跨终端智能体协同产品预计逐步落地" },
      { time: "2029", event: "6G 最早商用（孟樸预计）" },
    ],
    terms: ["ai-agent", "on-device-ai", "6g", "process-node"],
    questions: [
      "为什么跨终端智能体协同比单一 AI 手机更难落地？技术和商业障碍分别是什么？",
      "端侧模型与云端模型如何分工？这种分工会如何影响芯片厂商和云厂商的利益格局？",
    ],
  },
  "3": {
    background: [
      "大模型厂商与开发者之间的数据边界一直敏感。2023 年起，OpenAI 等公司先后承诺 API 数据默认不用于训练，企业客户的「零留存」逐渐成为标准合同条款。编程类工具需要读取整个代码库，[[data-retention|数据留存]]争议因此更易发生。[[zhipu|智谱]]源自清华大学，是中国头部大模型公司之一，2025 年被美国列入实体清单。",
      "与此同时，[[ai-data-center|AI 数据中心]]的耗电耗水引发地方反弹。加州 2025 年已通过 SB 53 前沿 AI 透明度法，本次 7 项法案把监管延伸到基础设施成本分摊。模型发布节奏也愈发密集，[[open-weight-model|开源]]与闭源路线并行，[[moe|MoE]] 架构成为大参数模型的主流做法，头部公司则开始面对 [[antitrust|反垄断]]诉讼。",
    ],
    timeline: [
      { time: "2023-03", event: "OpenAI 宣布 API 数据默认不用于模型训练" },
      { time: "2025-01", event: "智谱被美国商务部列入实体清单" },
      { time: "2025-09", event: "加州签署 SB 53《前沿人工智能透明度法》" },
      { time: "2026-09", event: "智谱 ZCode 数据争议，随后致歉并开源 ZCode" },
      { time: "2026-09", event: "加州签署 7 项数据中心监管法案" },
      { time: "2026-10-15", event: "阶跃 Step 5 计划开源" },
    ],
    terms: ["data-retention", "zhipu", "ai-data-center", "moe", "open-weight-model", "antitrust"],
    questions: [
      "AI 编程工具在「需要读取代码」与「承诺不留存」之间应如何划定边界？",
      "要求数据中心自担电网与供水成本，会如何改变 AI 基础设施的选址逻辑？",
    ],
  },
  "4": {
    background: [
      "与上一轮贸易战「全面加征」不同，2025 年以来中美更多依赖机制化安排管理摩擦：日内瓦、伦敦、斯德哥尔摩、马德里等多轮经贸磋商由何立峰与 [[bessent|贝森特]]牵头，逐步形成定期沟通机制，并最终促成 [[us-china-trade-truce|贸易休战]]。",
      "「[[g2|G2]]」一词由美国经济学家伯格斯滕在 2000 年代提出，指中美共同治理世界经济；特朗普在 2025 年釜山会晤前也曾用它形容这场会面。把贸易拆分为「关键商品」与「正常贸易」的思路，与近年的 [[de-risking|去风险]]说法一脉相承：不全面脱钩，而是隔离敏感领域。美方提出的 [[us-china-ai-dialogue|AI 事件通报机制]]则把这种思路延伸到技术安全领域。",
    ],
    timeline: [
      { time: "2025-04", event: "美方宣布「对等关税」，中美关税一度升至 100% 以上" },
      { time: "2025-05", event: "日内瓦会谈，双方大幅下调关税并开启 90 天暂停期" },
      { time: "2025-10", event: "釜山会晤，休战一年，关键条款至 2026-11-10" },
      { time: "2026-09", event: "美方称中美贸易委员会已「正式运作」" },
      { time: "2026-11-10", event: "现行休战关键条款原定到期日" },
    ],
    terms: ["us-china-trade-truce", "g2", "de-risking", "us-china-ai-dialogue", "bessent"],
    questions: [
      "把「关键商品」单独处理，能否真正防止冲突外溢到正常贸易？",
      "为什么两国领导人都更倾向于「小幅收益、避免冲突」，而不是追求大交易？",
    ],
  },
  "5": {
    background: [
      "2016 年 [[brexit|脱欧]]公投后，英国于 2020 年正式离开欧盟，此后历届政府都在寻找新的国际定位。二战以来的 [[special-relationship|英美特殊关系]]始终是英国外交支柱，而与欧盟在安全与经贸上的「重置」也在推进。",
      "[[chagos|查戈斯群岛]]问题源于冷战时期英国把群岛从毛里求斯分离，建成与美国共用的迪戈加西亚基地；[[falklands|福克兰群岛]]则因 1982 年英阿战争成为英国主权立场的象征。英国 2023 年在布莱切利园主办首届 [[ai-safety-summits|AI 安全峰会]]，一直希望在 AI 治理中扮演召集者；对乌克兰的 [[patriot|爱国者]]防空支持则是其欧洲安全承诺的具体体现。",
    ],
    timeline: [
      { time: "1965", event: "英国将查戈斯群岛从毛里求斯分离" },
      { time: "1982", event: "英阿福克兰战争" },
      { time: "2016-06", event: "英国脱欧公投" },
      { time: "2020-01", event: "英国正式脱离欧盟" },
      { time: "2023-11", event: "英国在布莱切利园主办首届 AI 安全峰会" },
      { time: "2025-05", event: "英毛签署查戈斯主权移交条约，保留迪戈加西亚基地 99 年租约" },
      { time: "2026-09", event: "伯纳姆在纽约完成外交首秀" },
      { time: "2027", event: "英国担任 G20 轮值主席国" },
    ],
    terms: ["brexit", "special-relationship", "chagos", "falklands", "ai-safety-summits", "patriot"],
    questions: [
      "「连接不同力量的国家」这一定位，需要英国具备哪些真实筹码？",
      "中英两份通话纪要侧重点不同，说明双方各自希望从关系中得到什么？",
    ],
  },
  "6": {
    background: [
      "中国电动车产业在 2010 年代依靠政策支持与规模效应迅速扩张，[[catl|宁德时代]]借此成为全球最大的动力电池厂商；[[lfp|磷酸铁锂]]电池因成本低、安全性好，在 2020 年后重新成为主流。吉利则通过 2010 年收购沃尔沃等并购，从民营车企成长为跨国集团。",
      "补能速度是电动车对燃油车的最后几块短板之一。2025 年比亚迪发布兆瓦级「闪充」，宁德时代推出神行系列，[[ultra-fast-charging|超快充]]竞赛进入「5 分钟」时代。车企一方面希望摆脱对单一供应商的依赖（[[de-catl|去宁德化]]），另一方面也受到监管层 [[anti-involution|反内卷]]表态的约束；宁德时代则把增长重心部分转向 [[energy-storage|储能]]。",
    ],
    timeline: [
      { time: "2010", event: "吉利收购沃尔沃汽车" },
      { time: "2011", event: "宁德时代成立" },
      { time: "2018", event: "宁德时代在深交所上市" },
      { time: "2023-08", event: "宁德时代发布神行超充磷酸铁锂电池" },
      { time: "2025-03", event: "比亚迪发布兆瓦级闪充平台" },
      { time: "2025-05", event: "宁德时代在港股上市" },
      { time: "2026-09", event: "吉利发布 4 分 30 秒充至 70% 的超快充系统" },
    ],
    terms: ["catl", "lfp", "ultra-fast-charging", "de-catl", "anti-involution", "energy-storage"],
    questions: [
      "超快充普及除了电池技术，还依赖哪些基础设施条件？",
      "「去宁德化」对车企而言是降本手段还是供应链安全策略？两者会不会冲突？",
    ],
  },
  "7": {
    background: [
      "2025 年 1 月 OpenAI、软银、Oracle 宣布 [[stargate|星际之门]]计划，拟在美国建设大规模 AI 算力；同年 7 月 OpenAI 与 Oracle 约定新增约 4.5GW 容量，9 月又传出五年约 3000 亿美元的云合同，Oracle 股价一度暴涨。",
      "为求速度，AI 园区普遍采用「开发商建设、云厂商长期租用、银行与私募资本融资」的模式。租约中的 [[take-or-pay|照付不议]]条款保护出资方，但当供电和许可卡住时，承租人只能诉诸 [[force-majeure|不可抗力]]条款延后付款。自建 [[fuel-cell|燃料电池]]等电源是绕开电网排队的常见办法；高负债扩张则让 Oracle 的信用评级逼近 [[junk-rating|垃圾级]]。",
    ],
    timeline: [
      { time: "2025-01", event: "星际之门计划宣布" },
      { time: "2025-07", event: "OpenAI 与 Oracle 约定新增约 4.5GW 算力容量" },
      { time: "2025-09", event: "报道称 OpenAI 与 Oracle 签订五年约 3000 亿美元云合同" },
      { time: "2026-07", event: "S&P 将 Oracle 评级降至距垃圾级一档" },
      { time: "2026-09", event: "Oracle 就新墨西哥项目发出不可抗力通知" },
      { time: "2028 Q3", event: "新墨西哥园区一期原定完工时间" },
    ],
    terms: ["stargate", "ai-data-center", "take-or-pay", "force-majeure", "fuel-cell", "junk-rating"],
    questions: [
      "当电力成为 AI 扩张的瓶颈，风险在开发商、云厂商、模型公司和银行之间是如何分配的？",
      "银行折价出售贷款，释放了关于 AI 基建融资的什么信号？",
    ],
  },
  "8": {
    background: [
      "胰岛素是最早的肽类药物，1922 年首次用于患者，但 [[peptide|肽]]在胃里会被酶降解、在肠道难以吸收，因此长期只能注射。2019 年诺和诺德的口服司美格鲁肽 Rybelsus 获批，借助吸收促进剂证明了 [[oral-peptide|口服肽]]的可行性。",
      "[[psoriasis|银屑病]]治疗的主线是 [[il23|IL-23]] 等炎症通路：注射型生物制剂疗效好但价格高；老一代口服药方便但疗效较弱。Protagonist 的路线是设计更稳定的 [[cyclic-peptide|环肽]]，让药片也能阻断 IL-23 受体，从而改写「先口服、后注射」的治疗阶梯。公司自身不负责全球销售，而是靠 [[royalty|版税]]获得回报。",
    ],
    timeline: [
      { time: "1922", event: "胰岛素首次用于糖尿病患者" },
      { time: "2017", event: "Protagonist 与强生（杨森）合作开发口服 IL-23 受体拮抗肽" },
      { time: "2019-04", event: "IL-23 抑制剂 Skyrizi 在美国获批治疗银屑病" },
      { time: "2019-09", event: "口服司美格鲁肽 Rybelsus 获 FDA 批准" },
      { time: "2024-01", event: "Protagonist 与武田就真性红细胞增多症药物达成合作" },
      { time: "2026", event: "口服银屑病药 Icotyde 上市" },
    ],
    terms: ["peptide", "oral-peptide", "cyclic-peptide", "psoriasis", "il23", "royalty", "polycythemia"],
    questions: [
      "口服药未必吸引已习惯注射的患者，它真正改变的是哪一类患者的治疗路径？",
      "「授权 + 版税」模式对小型生物科技公司有哪些利弊？",
    ],
  },
  "9": {
    background: [
      "台湾问题是中美关系中最敏感的议题。1979 年建交后，美国国会通过 [[taiwan-relations-act|台湾关系法]]，承诺向台湾提供防御性武器，[[taiwan-arms-sales|对台军售]]由此反复成为双边摩擦点；美国对是否军事介入则保持 [[strategic-ambiguity|战略模糊]]。",
      "「[[thucydides-trap|修昔底德陷阱]]」是习近平多次引用的概念，用以强调崛起国与守成国并非注定冲突。农业采购是特朗普两个任期对华协议的共同主线：2020 年第一阶段协议与 2025 年釜山 [[us-china-trade-truce|休战]]都包含 [[soybeans|大豆]]等农产品承诺；赠送大熊猫则延续了 [[panda-diplomacy|熊猫外交]]的传统。",
    ],
    timeline: [
      { time: "1979", event: "《台湾关系法》生效" },
      { time: "2020-01", event: "中美签署第一阶段经贸协议，包含大规模农产品采购" },
      { time: "2025-10", event: "釜山休战：中方承诺 2026—2028 年每年采购 2500 万吨美国大豆" },
      { time: "2026-09", event: "峰会宣布贸易缓和协议延长至 2027-01-10，中方宣布赠送两只大熊猫" },
    ],
    terms: [
      "taiwan-relations-act",
      "taiwan-arms-sales",
      "strategic-ambiguity",
      "thucydides-trap",
      "soybeans",
      "panda-diplomacy",
    ],
    questions: [
      "北京希望延长两年，华盛顿只给两个月，这种期限差异反映了双方怎样的谈判策略？",
      "共和党内部的批评，会在多大程度上约束特朗普的对华政策空间？",
    ],
  },
  "10": {
    background: [
      "2022 年底 ChatGPT 发布后，行业主流是「什么都会」的通用对话模型；但在企业落地中，大量任务其实是分类、路由、打分等结构化决策，用生成式模型逐字输出答案既昂贵又难以评估。",
      "2025 年 1 月 [[deepseek-moment|DeepSeek]] 以低成本训练出高性能模型，英伟达市值一度单日蒸发近 6000 亿美元，市场意识到「更便宜」本身就是竞争力。Jev 走的是另一条降本路线：限定输出空间的 [[narrow-model|窄任务模型]]，按 [[token|Token]] 计的成本因此大幅降低，也与 [[openai|OpenAI]] 等通用模型形成差异化。",
    ],
    timeline: [
      { time: "2022-11", event: "ChatGPT 发布，通用对话模型成为主流" },
      { time: "2024", event: "TypeSafe AI 成立" },
      { time: "2025-01", event: "DeepSeek-R1 发布，引发全球科技股震荡" },
      { time: "2026-09", event: "TypeSafe 宣布 4000 万美元种子融资，Jev 发布一周走红" },
    ],
    terms: ["narrow-model", "token", "deepseek-moment", "openai"],
    questions: [
      "企业工作流中，哪些环节适合窄任务模型，哪些仍离不开通用大模型？",
      "「给答案打分并估算真实性概率」对 AI 可信度评估有什么意义？",
    ],
  },
  "11": {
    background: [
      "美国核电建设在 1979 年三里岛事故后长期停滞。佐治亚州 [[vogtle|沃格特勒核电站]] 3、4 号机组是数十年来首批新建机组，于 2023—2024 年投运，但比计划晚约 7 年、成本翻倍，成为华尔街对新核电的阴影。",
      "[[ai-data-center|AI 数据中心]]需要全天候稳定电力，科技巨头因此转向核电：2024 年微软与 Constellation 约定重启三里岛 1 号机组，谷歌与 Kairos、亚马逊与 X-energy 签署 [[smr|SMR]] 协议；2025 年 5 月特朗普签署行政令，目标 2050 年把美国核电装机增至约 400GW，约为当时的四倍。",
    ],
    timeline: [
      { time: "1979-03", event: "三里岛核事故，美国新建核电陷入长期停滞" },
      { time: "2013", event: "沃格特勒 3、4 号机组正式开工" },
      { time: "2023—2024", event: "沃格特勒 3、4 号机组相继投运" },
      { time: "2024-09", event: "微软与 Constellation 签约重启三里岛 1 号机组" },
      { time: "2024-10", event: "谷歌、亚马逊先后签署 SMR 相关协议" },
      { time: "2025-05", event: "特朗普签署核能行政令，目标 2050 年装机 400GW" },
      { time: "约 2035", event: "Bloomberg Intelligence 预计核能初创技术广泛商业化" },
    ],
    terms: ["smr", "vogtle", "ai-data-center"],
    questions: [
      "为什么「资金到得比项目成熟快」本身就是一种风险？",
      "在核电真正落地之前，数据中心的电力缺口可能由哪些方案填补？",
    ],
  },
  "12": {
    background: [
      "英格兰银行 1997 年获得货币政策独立，由九人组成的 [[boe-mpc|货币政策委员会]]每年开会八次决定利率，目标是 2% 通胀。2022 年俄乌战争引发能源危机，英国 CPI 在当年 10 月升至 11.1%，英银随后把利率加至 5.25%。",
      "此次争论的关键是 [[second-round-effects|二轮效应]]：能源涨价本身是一次性冲击，但如果企业持续转嫁成本、工人要求加薪，就会形成持续通胀。英国家庭电气费用受 Ofgem [[energy-price-cap|价格上限]]约束，按季度调整，因此 [[iran-war|中东冲突]]带来的涨价会滞后传导到 CPI。",
    ],
    timeline: [
      { time: "1997", event: "英格兰银行获得独立制定货币政策的权力" },
      { time: "2019-01", event: "Ofgem 家庭能源价格上限制度开始实施" },
      { time: "2022-10", event: "英国 CPI 升至 11.1%，为 41 年高点" },
      { time: "2023-08", event: "英银利率升至 5.25%" },
      { time: "2024-08", event: "英银开始降息" },
      { time: "2026-09", event: "英银以 6 比 3 维持利率在 3.75%" },
      { time: "2026-11", event: "下次议息会议，市场定价约 90% 加息概率" },
      { time: "2027-01", event: "家庭能源价格上限重置，账单预计上涨约四分之一" },
    ],
    terms: ["boe-mpc", "second-round-effects", "energy-price-cap", "iran-war"],
    questions: [
      "央行为什么不能等到二轮通胀的证据完全出现才行动？",
      "劳动力市场疲弱与能源冲击同时出现时，加息的代价由谁承担？",
    ],
  },
  "13": {
    background: [
      "特朗普第一任期把美国对华政策从「接触」转向「竞争」，发起关税战与科技封锁；拜登政府延续并强化了 [[chip-export-controls|芯片出口管制]]，形成两党对华强硬共识。",
      "第二任期的特朗普更强调交易：2025 年曾允许英伟达 H20 对华销售并收取收入分成，在台湾问题上也更愿意把 [[taiwan-arms-sales|军售]]视为筹码。与此同时，[[rare-earths|稀土]]成为中国最有效的反制工具，[[us-china-trade-truce|贸易休战]]的核心交换之一正是稀土供应。国内政治日程——美国中期选举与 2027 年中共 [[party-congress|党代会]]——让双方都倾向维持平静；[[iran-war|伊朗冲突]]则是悬在峰会上方的变量。",
    ],
    timeline: [
      { time: "2018", event: "特朗普第一任期发起对华贸易战" },
      { time: "2022-10", event: "拜登政府出台全面的先进芯片对华出口管制" },
      { time: "2025-04", event: "中国对 7 种中重稀土实施出口许可管理" },
      { time: "2025-08", event: "美方允许英伟达 H20 对华销售并收取收入分成" },
      { time: "2025-10", event: "釜山休战；中方暂停扩大稀土管制" },
      { time: "2026-09", event: "休战延长两个月至 2027-01-10；约 140 亿美元对台军售包推迟" },
    ],
    terms: [
      "chip-export-controls",
      "rare-earths",
      "us-china-trade-truce",
      "taiwan-arms-sales",
      "iran-war",
      "party-congress",
    ],
    questions: [
      "民调显示多数美国人偏好合作，这会如何影响两党对华政策的走向？",
      "把对台军售当作谈判筹码，可能给地区盟友传递什么信号？",
    ],
  },
  "14": {
    background: [
      "「房租不超过收入 30%」的 [[rent-burden|负担线]]源于美国公共住房政策：1969 年布鲁克修正案把公房租金上限设为收入的 25%，1981 年提高到 30%，此后成为衡量住房负担的通用标准。",
      "疫情期间远程办公和低利率推动租金暴涨，开发商在 2021—2022 年大量开工，这些项目在 2024—2025 年集中交付，形成 [[housing-cycle|住房供给周期]]的高峰；随后利率上升压制新开工，为下一轮供给短缺埋下伏笔。指数名称来自《欲望都市》主角 Carrie Bradshaw——一位独居纽约的专栏作家。",
    ],
    timeline: [
      { time: "1969", event: "布鲁克修正案把公房租金上限设为收入的 25%" },
      { time: "1981", event: "标准提高至 30%，沿用至今" },
      { time: "2021—2022", event: "疫情后租金飙升，公寓开工量达到高峰" },
      { time: "2024", event: "新增公寓 69.5 万套，创 40 年纪录" },
      { time: "2025", event: "再完工 53.1 万套" },
      { time: "2026 上半年", event: "租金仅上涨 1%，约四分之一公寓提供优惠" },
    ],
    terms: ["rent-burden", "housing-cycle"],
    questions: [
      "为什么新开工量骤降意味着当前的租金利好可能只是暂时的？",
      "用「30% 收入」衡量负担是否适用于所有收入群体？它忽略了什么？",
    ],
  },
  "15": {
    background: [
      "[[hormuz|霍尔木兹海峡]]是波斯湾唯一的出海口，全球约五分之一的石油消费量经此运输；红海与 [[suez|苏伊士运河]]是另一条关键航线。2023 年底起也门 [[houthi|胡塞武装]]袭击红海商船，大量船只改绕好望角。",
      "油轮运价由「吨海里」决定：同样的油运得越远、等得越久，就需要越多船。[[vlcc|VLCC]] 满载时吃水太深，无法通过苏伊士运河，只能借埃及 SUMED 管道转运。沙特东西管道把原油从波斯湾输送到红海延布港，本是绕开霍尔木兹的备用通道，如今也在 [[iran-war|海湾冲突]]中受袭。",
    ],
    timeline: [
      { time: "1987—1988", event: "两伊战争「油轮战」期间，美国海军为海湾油轮护航" },
      { time: "2023-11", event: "胡塞武装开始袭击红海商船，航运改绕好望角" },
      { time: "2026", event: "海湾冲突升级，美国海军护航船只穿越霍尔木兹" },
      { time: "2026-09", event: "VLCC 日租现货均价约 65 万美元，为 1 月的六倍以上" },
    ],
    terms: ["vlcc", "hormuz", "suez", "houthi", "iran-war"],
    questions: [
      "为什么原油运量下降，油轮运价反而大涨？",
      "炼油利润创纪录如何改变了以往「运价尖峰很快回落」的规律？",
    ],
  },
  "16": {
    background: [
      "关于 AI 灭绝风险的讨论可以追溯到 2000 年代的理性主义社区，以及 2014 年博斯特罗姆的《超级智能》。2023 年 ChatGPT 爆红后，数百名研究者和企业负责人联署声明，称降低 AI 灭绝风险应与大流行病、核战争并列为全球优先事项。",
      "预测失准的典型例子是放射科：2016 年辛顿曾说「现在应该停止培养放射科医生」，但十年后需求不降反升。气候领域的 [[tipping-point|临界点]]和 AI 领域的 [[p-doom|p(doom)]] 都是用概率描述小概率、高损失事件的尝试；2025 年 10 月一份呼吁暂停 [[superintelligence|超级智能]]研发的公开声明获得大量联署。现实中的风险则更多来自 [[ai-agent|智能体]]失控和 [[hallucination|AI 幻觉]]。",
    ],
    timeline: [
      { time: "2014", event: "博斯特罗姆出版《超级智能》" },
      { time: "2016", event: "辛顿称「应停止培养放射科医生」" },
      { time: "2020-12", event: "首批 mRNA 新冠疫苗获批紧急使用" },
      { time: "2023-05", event: "AI 安全中心发布「AI 灭绝风险」联署声明" },
      { time: "2025-10", event: "「超级智能声明」呼吁在安全可控前禁止研发超级智能" },
      { time: "2026", event: "美国经济增速仍低于 2%，AI 带来的生产率收益难以看见" },
    ],
    terms: ["p-doom", "tipping-point", "superintelligence", "ai-agent", "hallucination"],
    questions: [
      "为什么预测者擅长外推规则系统中的指数增长，却常低估现实世界的阻力？",
      "企业一边谈论灭绝风险、一边全速投入，这种矛盾应由谁来化解？",
    ],
  },
  "17": {
    background: [
      "2022 年 2 月俄罗斯全面入侵乌克兰后，战争很快演变为消耗战。2022—2023 年冬季俄军系统性打击乌克兰电网；此后乌克兰以远程无人机打击俄罗斯炼油厂，双方都把对方的经济基础设施纳入打击目标。",
      "「[[total-war|总体战]]」指动员并打击整个社会经济体系，而非只针对军队。廉价的 [[shahed|Shahed 无人机]]使这种打击可以持续进行，而乌克兰依靠 [[fpv-interceptor|拦截无人机]]等低成本手段防御。乌财政依赖外部援助：欧盟 2024 年设立 500 亿欧元「乌克兰基金」，G7 以冻结俄资产收益为抵押提供约 500 亿美元贷款。分布式的太阳能和风能更难被一次性摧毁，因此在战时扩张。",
    ],
    timeline: [
      { time: "2022-02-24", event: "俄罗斯全面入侵乌克兰" },
      { time: "2022-10", event: "俄军开始大规模空袭乌克兰能源设施" },
      { time: "2024-02", event: "欧盟通过 500 亿欧元「乌克兰基金」" },
      { time: "2024", event: "乌国防科技产业规模增长一倍以上；G7 同意约 500 亿美元贷款" },
      { time: "2026-08", event: "俄联邦预算赤字达 680 亿美元，超出全年计划" },
      { time: "2026-09", event: "欧洲复兴开发银行把乌今年增长预期下调至 1.5%" },
    ],
    terms: ["total-war", "shahed", "fpv-interceptor"],
    questions: [
      "为什么铁路机车和粮仓会成为新的打击重点？这对战争走向意味着什么？",
      "在外援持续流入的情况下，乌克兰经济的真正约束是什么？",
    ],
  },
  "18": {
    background: [
      "[[panda-diplomacy|熊猫外交]]始于 1972 年尼克松访华后，中国赠送美国国家动物园「玲玲」和「兴兴」。亚特兰大动物园自 1999 年起饲养大熊猫，2024 年 10 月全部归还中国，此次赠送意味着恢复。",
      "国事访问礼仪本身就是外交信号：总统亲赴机场迎接、军机飞越和国宴都属最高规格。[[nixon-1972|1972 年尼克松访华]]开启了中美关系正常化，习近平在祝酒词中引用这一节点，把当下定位为可能的「再正常化」时刻，同时以 [[thucydides-trap|修昔底德陷阱]]划出竞争的边界。白宫记者采访权的争议，则延续了特朗普政府与主流媒体的长期紧张关系。",
    ],
    timeline: [
      { time: "1972-04", event: "中国赠送美国国家动物园大熊猫玲玲、兴兴" },
      { time: "1999", event: "大熊猫伦伦、洋洋入住亚特兰大动物园" },
      { time: "2024-10", event: "亚特兰大动物园的大熊猫全部归还中国" },
      { time: "2026-09-24", event: "习近平宣布向亚特兰大动物园赠送两只大熊猫" },
    ],
    terms: ["panda-diplomacy", "nixon-1972", "thucydides-trap", "us-china-trade-truce", "iran-war"],
    questions: [
      "高规格礼仪与有限的政策成果之间，哪一个更能说明峰会的真实意义？",
      "习近平引用 1972 年而回避冷战最糟阶段，传达了怎样的历史叙事？",
    ],
  },
  "19": {
    background: [
      "伊朗设计的 [[shahed|Shahed-136]] 是一种活塞发动机巡飞弹，造价低、可大批量发射。2022 年 9 月起俄军用它袭击乌克兰，并在鞑靼斯坦阿拉布加经济特区本土化生产，改称 Geran。",
      "乌克兰以「便宜对便宜」应对：机枪机动小组、[[electronic-warfare|电子战]]干扰和 [[fpv-interceptor|FPV 拦截无人机]]。喷气式版本速度翻倍，使廉价拦截手段失效，迫使乌方重新动用昂贵的 [[patriot|防空导弹]]，形成新的成本不对称。",
    ],
    timeline: [
      { time: "2022-09", event: "俄军首次在乌克兰使用 Shahed-136" },
      { time: "2023", event: "俄罗斯在阿拉布加实现 Geran 无人机本土化生产" },
      { time: "2025", event: "乌克兰大规模部署 FPV 拦截无人机" },
      { time: "2026-06", event: "俄方发射约 450 架高速无人机" },
      { time: "2026-08", event: "增至约 2850 架；俄停产 Geran-3、转向 Geran-4/5" },
      { time: "2026-09-02", event: "当夜乌方对喷气无人机拦截率仅约 65%" },
    ],
    terms: ["shahed", "fpv-interceptor", "electronic-warfare", "patriot"],
    questions: [
      "「速度对速度」的军备竞赛中，攻防双方的成本曲线如何变化？",
      "Geran 使用中国涡轮引擎和电台，说明了军用供应链的哪些特点？",
    ],
  },
  "20": {
    background: [
      "釜山休战后，中美关系进入「以一年为周期」的管理模式。中国在全球 [[rare-earths|稀土]]开采、精炼和永磁体制造上的主导地位，与美国在先进芯片上的 [[chip-export-controls|出口管制]]形成相互制衡；双方同时尝试建立 [[us-china-ai-dialogue|AI 对话]]机制。",
      "2026 年是双方的「主场年」：中国在深圳主办 [[apec-g20|APEC]]，美国主办 G20；美国 11 月举行中期选举，中国将在 2027 年召开 [[party-congress|党代会]]。国内政治日程使双方都倾向「稳住局面」而非冒险突破；台湾问题上，美国的 [[strategic-ambiguity|战略模糊]]与待批的 [[taiwan-arms-sales|军售]]仍是最大变数。",
    ],
    timeline: [
      { time: "2025-10", event: "釜山会晤，达成一年期贸易休战" },
      { time: "2025", event: "美国批准约 111 亿美元对台军售" },
      { time: "2026-05", event: "特朗普访问北京" },
      { time: "2026-09-23", event: "习近平抵美，开始三天国事访问" },
      { time: "2026-11", event: "贸易休战关键条款到期；美国中期选举；APEC 深圳会议" },
      { time: "2027", event: "中共第二十一次全国代表大会" },
    ],
    terms: [
      "rare-earths",
      "chip-export-controls",
      "us-china-ai-dialogue",
      "taiwan-arms-sales",
      "strategic-ambiguity",
      "apec-g20",
      "party-congress",
    ],
    questions: [
      "关税、科技、伊朗、台湾这四个「T」中，哪一个最可能打破当前的稳定？",
      "无联合声明、无联合记者会，是否意味着峰会失败？应如何衡量其成败？",
    ],
  },
  "21": {
    background: [
      "[[a24|A24]] 2012 年成立，以《月光男孩》《瞬息全宇宙》等作者电影建立「独立」品牌。《[[backrooms|后室]]》源自 2019 年的网络怪谈，Kane Parsons 2022 年起在 YouTube 以伪纪录片形式走红，后被 A24 签下拍成长片。",
      "2023 年好莱坞编剧与演员工会罢工，[[generative-video|生成式 AI]]使用规则是核心议题之一；此后电影公司公开表态谨慎，私下却与 AI 公司签约。中国 [[micro-drama|微短剧]]行业则率先大规模采用 AI 生成，成为 AI 替代传统制作的试验场。谷歌 2014 年收购的 [[deepmind|DeepMind]] 如今以研究合作的方式进入电影创作现场。",
    ],
    timeline: [
      { time: "2012", event: "A24 成立" },
      { time: "2019", event: "「后室」怪谈在 4chan 出现" },
      { time: "2022", event: "Kane Parsons 在 YouTube 发布后室系列短片" },
      { time: "2023", event: "好莱坞编剧与演员工会罢工，AI 规则成焦点；A24 宣布改编《后室》" },
      { time: "2024", event: "A24 因用 AI 生成《内战》宣传图引发争议" },
      { time: "2026-06", event: "Google DeepMind 宣布向 A24 投入 7500 万美元" },
    ],
    terms: ["a24", "backrooms", "generative-video", "micro-drama", "deepmind"],
    questions: [
      "科技公司不买下片库、只进入创作现场，它真正想获得的是什么？",
      "「独立」作为品牌资产，与接受科技巨头投资之间是否存在根本矛盾？",
    ],
  },
  "22": {
    background: [
      "2023 年 7 月，白宫与七家 AI 公司达成 [[voluntary-commitments|自愿安全承诺]]；同月 Anthropic、谷歌、微软、OpenAI 成立 [[frontier-model-forum|Frontier Model Forum]]。同年 11 月美国设立 AI 安全研究所，2025 年更名为 [[caisi|CAISI]]。",
      "拜登 2023 年 10 月签署的 AI 行政令在 2025 年 1 月被特朗普撤销，联邦层面缺少统一的 [[frontier-model|前沿模型]]监管框架。于是行业尝试「自律组织」路线，类似金融业由行业出资、制定标准的自律机构，并认定 [[third-party-audit|第三方审计]]资质。[[openai|OpenAI]] 与 [[anthropic|Anthropic]] 都是发起方。",
    ],
    timeline: [
      { time: "2023-07", event: "白宫 AI 自愿承诺；Frontier Model Forum 成立" },
      { time: "2023-10", event: "拜登签署 AI 行政令" },
      { time: "2023-11", event: "美国 AI 安全研究所成立" },
      { time: "2025-01", event: "特朗普撤销拜登 AI 行政令" },
      { time: "2025-06", event: "AI 安全研究所更名为 CAISI" },
      { time: "2026 年底—2027 年初", event: "SAFA 目标启动" },
    ],
    terms: [
      "frontier-model",
      "caisi",
      "frontier-model-forum",
      "voluntary-commitments",
      "third-party-audit",
      "openai",
      "anthropic",
    ],
    questions: [
      "由被监管者自己设立的标准机构，如何证明其独立性？",
      "只覆盖三家公司、不纳入 Meta 与开源模型，会带来哪些监管空白？",
    ],
  },
  "23": {
    background: [
      "2023 年 4 月谷歌合并 Google Brain 与 DeepMind，成立 [[deepmind|Google DeepMind]]，以应对 ChatGPT 带来的竞争压力。此后 [[gemini|Gemini]] 系列快速迭代，2025 年 11 月发布 Gemini 3，并同期推出 AI 编程工具 Antigravity。",
      "大模型训练分为预训练与 [[post-training|后训练]]：前者用海量数据学习通用能力，后者通过指令微调、强化学习等方式让模型更可靠、更符合人类偏好。近年 [[anthropic|Anthropic]]、[[openai|OpenAI]] 与谷歌在 [[frontier-model|前沿模型]]上的竞争焦点，越来越多地转向后训练与推理能力。",
    ],
    timeline: [
      { time: "2023-04", event: "Google Brain 与 DeepMind 合并" },
      { time: "2023-12", event: "Gemini 1.0 发布" },
      { time: "2025-03", event: "Gemini 2.5 发布" },
      { time: "2025-11", event: "Gemini 3 发布，同期推出 Antigravity" },
      { time: "2026-02", event: "Gemini 3.1 发布" },
      { time: "2026-06", event: "原定发布的 Gemini 3.5 Pro 未出现" },
      { time: "2026 年底前", event: "Gemini 4 计划发布" },
    ],
    terms: ["gemini", "deepmind", "post-training", "frontier-model", "anthropic", "openai"],
    questions: [
      "把资源从旗舰模型转向 Flash 小模型「以最大化学习速度」，这一策略的逻辑是什么？",
      "模型竞争中「先发布早期版本、再快速迭代」有哪些利弊？",
    ],
  },
  "24": {
    background: [
      "[[anthropic|Anthropic]] 由 Dario 与 Daniela Amodei 等前 OpenAI 员工于 2021 年创立，注册为 [[pbc|公益公司]]，2023 年公布 [[ltbt|长期利益信托]]，逐步赋予其董事会多数任命权，以防商业压力压倒安全使命。",
      "[[dual-class|双重股权结构]]在科技公司中很常见：谷歌 2004 年、Facebook 2012 年上市时都保留了创始人的超级投票权；Palantir 2020 年上市时设计 F 类股，保证三位创始人合计约 49.999999% 的投票权。Anthropic 的方案与之相似，目的是在 [[ipo|IPO]] 后仍掌握重大决策。",
    ],
    timeline: [
      { time: "2004", event: "谷歌以双重股权结构上市" },
      { time: "2020-09", event: "Palantir 以 F 类股方案直接上市" },
      { time: "2021", event: "Anthropic 成立" },
      { time: "2023-09", event: "Anthropic 公布长期利益信托" },
      { time: "2026-05", event: "融资轮估值达 9650 亿美元" },
      { time: "2026-10/11", event: "预计进行 IPO" },
    ],
    terms: ["anthropic", "dual-class", "ltbt", "pbc", "ipo"],
    questions: [
      "创始人投票控制权与长期利益信托并存，重大分歧时谁说了算？",
      "对以安全为使命的 AI 公司而言，上市会带来哪些新的治理压力？",
    ],
  },
};
