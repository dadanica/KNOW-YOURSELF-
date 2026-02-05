import type { Agent, ResultPack } from "@/lib/types";

export type InsightCardId = "type" | "radar" | "traits" | "scenes";
export type InsightSection = { title: string; bullets: string[] };
export type InsightContent = {
  title: string;
  subtitle?: string;
  lead?: string;
  sections: InsightSection[];
  cta?: string;
};

export type ComboProfile = {
  key: string;
  oneLiner: string;
  advantages: string[];
  risks: string[];
  howItShowsWhenAHigh: string[];
  howItShowsWhenBHigh: string[];
  tips: string[];
};

export type AgentProfile = {
  code: Agent;
  nameCN: string;
  essence: string;
  strengths: string[];
  blindspots: string[];
  triggers: string[];
  fixes: string[];
  scenes: {
    INT: string[];
    TEAM: string[];
    SOC: string[];
  };
  keywords: string[];
};

export const AGENT: Record<Agent, AgentProfile> = {
  CM: {
    code: "CM",
    nameCN: "策划者",
    essence: "你靠边界与规则给世界降噪：谁负责、怎么做、何时回归。",
    strengths: ["能拍板定节奏", "能把混乱变成可执行结构", "敢立边界，减少内耗"],
    blindspots: ["容易让人觉得被审计", "在情绪窗口期表达偏硬", "对拖延容忍度低导致加压"],
    triggers: ["模糊不清", "拖着不说", "承诺不兑现/反复改口"],
    fixes: ["先给回归时间点，再讨论原因", "把问题改写成动作请求", "允许暂停，但必须可回到同一议题"],
    scenes: {
      INT: ["独处会自动复盘与建模，靠计划感回血", "越不确定越想把边界写清楚"],
      TEAM: ["先定规则/节点/验收，再推进执行", "擅长控节奏与对齐口径"],
      SOC: ["更重视分寸与秩序感，讨厌尴尬与失控", "倾向用边界让关系可持续"],
    },
    keywords: ["边界", "规则", "节奏", "主权", "回归机制"],
  },
  BI: {
    code: "BI",
    nameCN: "联结者",
    essence: "你靠连接与共识让系统跑得久：把人放回同一条线上。",
    strengths: ["善于整合各方力量", "能缓冲冲突、修复关系", "擅长建立长期合作"],
    blindspots: ["容易把自己放在中间消耗", "有时为和气牺牲效率", "不愿翻脸导致问题拖久"],
    triggers: ["关系断联", "冷场/孤立", "团队站队撕裂"],
    fixes: ["先做小连接（一个确认/一个拥抱/一句肯定）", "把冲突翻译成可协商语言", "建立共识+规则的双轨"],
    scenes: {
      INT: ["会反思自己是否伤到人，倾向修复", "会靠有人同频恢复稳定"],
      TEAM: ["先拉共识再分工，减少对抗", "擅长做中间层翻译与协调"],
      SOC: ["更看重彼此舒服与尊重", "善于让别人被看见，从而建立信任"],
    },
    keywords: ["连接", "共识", "整合", "温度", "长期"],
  },
  BU: {
    code: "BU",
    nameCN: "执行者",
    essence: "你靠拆解与交付解决焦虑：先把事做出来再说。",
    strengths: ["强落地、强推进", "把复杂拆成步骤", "用结果解决争议"],
    blindspots: ["容易忽略情绪成本", "过度扛事导致耗竭", "在关系里显得不够细腻"],
    triggers: ["空谈", "无结论会议", "重复讨论不落地"],
    fixes: ["把目标写成三步最小行动", "每次只推动一个关键变量", "用小交付换大确定"],
    scenes: {
      INT: ["独处靠做事回血", "越焦虑越想清单化推进"],
      TEAM: ["主动扛难点并交付", "偏好明确标准与验收"],
      SOC: ["更愿意用帮你解决问题建立连接", "不爱无效寒暄"],
    },
    keywords: ["拆解", "交付", "标准", "推进", "迭代"],
  },
  TR: {
    code: "TR",
    nameCN: "思考者",
    essence: "你靠交换与杠杆拿结果：资源配置永远大于蛮力。",
    strengths: ["善谈条件与资源", "会找杠杆与机会窗口", "能把局面变成可交易结构"],
    blindspots: ["被误解为功利", "容易跳过情绪直奔条件", "若无回报会快速抽身"],
    triggers: ["投入产出失衡", "看不到回路", "对方不讲条件只讲情绪"],
    fixes: ["先承认感受再谈条件", "把资源换成可兑现承诺", "建立双赢的交换清单"],
    scenes: {
      INT: ["独处会算成本与路径", "习惯做备选方案与兜底"],
      TEAM: ["擅长拉资源、找合作", "用谈判让项目更快起飞"],
      SOC: ["倾向精准连接关键人", "不喜欢无价值社交"],
    },
    keywords: ["资源", "杠杆", "交换", "机会", "成本"],
  },
  BR: {
    code: "BR",
    nameCN: "开拓者",
    essence: "你靠表达与叙事制造影响：让别人愿意跟随你的视角。",
    strengths: ["能把复杂说清楚", "善于塑造标签与共识", "对外拿支持、对内定调"],
    blindspots: ["容易被认为太会说", "情绪上头会表达过满", "可能忽略执行细节"],
    triggers: ["被忽视/被误解", "口径混乱", "场面冷掉"],
    fixes: ["用一句话定调+一句话落点", "把表达绑定到可验证事实", "减少解释，增加结论"],
    scenes: {
      INT: ["独处会写观点与叙事", "靠表达整理内心"],
      TEAM: ["擅长对齐方向与口径", "能把团队愿景说成共识"],
      SOC: ["会用故事建立记忆点", "善于控场与气氛"],
    },
    keywords: ["表达", "叙事", "标签", "影响", "定调"],
  },
  SI: {
    code: "SI",
    nameCN: "守护者",
    essence: "你靠氛围与亲和化解对抗：让人愿意靠近你。",
    strengths: ["能软化冲突", "让人放松与信任", "擅长建立亲密感"],
    blindspots: ["容易回避硬问题", "过度顾及体面", "在关键节点不够果断"],
    triggers: ["场面紧张", "关系变冷", "被硬碰硬逼迫"],
    fixes: ["先降温再谈事", "把边界说软但说清", "用小互动恢复连接"],
    scenes: {
      INT: ["独处会先修复情绪", "靠舒适感恢复电量"],
      TEAM: ["擅长润滑关系、缓冲冲突", "适合做气氛与协作维护"],
      SOC: ["容易成为人群中心的黏合剂", "用亲和建立信任"],
    },
    keywords: ["氛围", "亲和", "软化", "靠近", "舒适"],
  },
  HU: {
    code: "HU",
    nameCN: "突破者",
    essence: "你靠博弈与止损守住底线：不让别人轻易越界。",
    strengths: ["关键时刻敢硬", "善于反制与止损", "能识别暗流与风险"],
    blindspots: ["容易被误读为攻击性", "不愿示弱导致沟通变硬", "过度警觉会伤关系"],
    triggers: ["被羞辱/被抢功", "被操控/被威胁", "规则被破坏却无人管"],
    fixes: ["先立底线再给选择", "把对抗变成规则与后果", "该退就退，减少消耗战"],
    scenes: {
      INT: ["独处会预演最坏情况与退出机制", "靠掌控风险恢复安全感"],
      TEAM: ["擅长把风险摁住、把不守规矩的人压住", "适合守红线与谈代价"],
      SOC: ["对场面敏感，能识别谁在演", "更看重尊重与分寸"],
    },
    keywords: ["博弈", "反制", "止损", "威慑", "红线"],
  },
};

const COMBO_OVERRIDE: Record<string, ComboProfile> = {
  "CM-BI": {
    key: "CM-BI",
    oneLiner: "你用规则稳住局面，用连接稳住人心：目标是可持续运行。",
    advantages: ["能定规则也能让人愿意遵守", "能控节奏也能做修复", "适合带队、适合经营长期合作"],
    risks: ["规则表达过硬会触发对方回避", "为维持合作可能把自己放在中间消耗"],
    howItShowsWhenAHigh: ["更像治理者：先边界后温度", "对悬空敏感，容易催回归时间点"],
    howItShowsWhenBHigh: ["更像联盟主理人：先关系后规则", "容易先修复，再推进原则"],
    tips: ["冲突先给回归机制，别追问动机", "每次只升级一个规则，别一次立完所有规矩"],
  },
  "BU-CM": {
    key: "BU-CM",
    oneLiner: "你用执行解决焦虑，用规则防止返工：目标是高效闭环。",
    advantages: ["做事快且有标准", "能把混乱变成可验收的交付", "推进力强且边界清晰"],
    risks: ["容易忽略情绪成本直奔任务", "过度控制细节会让人窒息"],
    howItShowsWhenAHigh: ["更像交付机器：先做完再说", "对空谈零容忍"],
    howItShowsWhenBHigh: ["更像项目经理：先定规则再执行", "会花时间对齐后再动手"],
    tips: ["允许别人用不同方式达到同样结果", "在情绪窗口期先暂停执行"],
  },
  "BR-SI": {
    key: "BR-SI",
    oneLiner: "你用表达点燃场面，用亲和让人愿意留下：目标是影响力与舒适并存。",
    advantages: ["能控场也能让人舒服", "善于把观点变成共识", "容易成为人群焦点"],
    risks: ["表达过满会让人疲惫", "过度亲和可能丧失锐度"],
    howItShowsWhenAHigh: ["更像主讲人：先定调后互动", "对被忽视敏感"],
    howItShowsWhenBHigh: ["更像气氛担当：先让人舒服再输出观点", "容易先暖场再推进"],
    tips: ["关键信息用结论开头", "适时收回表达让别人也被看见"],
  },
};

export function buildComboProfile(a: Agent, b: Agent): ComboProfile {
  const key = `${a}-${b}`;
  if (COMBO_OVERRIDE[key]) return COMBO_OVERRIDE[key];

  const A = AGENT[a];
  const B = AGENT[b];

  return {
    key,
    oneLiner: `你以「${A.keywords[0]}」为主驱动，以「${B.keywords[0]}」为辅助策略：你解决问题的方式是先${A.keywords[1]}，再${B.keywords[1]}。`,
    advantages: [
      `${A.nameCN}的${A.keywords[2]}让你更快稳住局面`,
      `${B.nameCN}的${B.keywords[2]}让你更容易获得支持`,
    ],
    risks: [
      `当你过度依赖${A.keywords[0]}，会让人感到压力或距离`,
      `当你过度依赖${B.keywords[0]}，可能牺牲效率或原则`,
    ],
    howItShowsWhenAHigh: [
      `主核更强时：你会更${A.keywords[1]}导向，先把结构立住再谈感受`,
      `副作用：对方容易觉得你太${A.keywords[0]}`,
    ],
    howItShowsWhenBHigh: [
      `副核更强时：你会更${B.keywords[1]}导向，先把关系稳住再推进目标`,
      `副作用：容易出现先和气后拖延的感觉`,
    ],
    tips: [
      `把${A.keywords[0]}说成共同协议，而不是对你要求`,
      `用${B.keywords[0]}做润滑，但关键节点仍要落到${A.keywords[2]}`,
    ],
  };
}

function strengthTone(result: ResultPack) {
  if (result.topAll.isDominant) return "hard";
  if (result.topAll.isHybrid) return "soft";
  return "mid";
}

export function buildInsight(
  result: ResultPack,
  cardId: InsightCardId
): InsightContent {
  const { topAll, topINT, topTEAM, topSOC } = result;
  const a = topAll.top1;
  const b = topAll.top2;

  const A = AGENT[a],
    B = AGENT[b];
  const combo = buildComboProfile(a, b);
  const tone = strengthTone(result);

  const subtitle = `${result.typeKey}｜主核${topAll.top1Pct}% · 副核${topAll.top2Pct}% · Δ${topAll.delta}`;

  if (cardId === "type") {
    return {
      title: `类型详解：${A.nameCN}×${B.nameCN}`,
      subtitle,
      lead:
        tone === "hard"
          ? `这是"强主核"配置：你会天然以「${A.keywords[0]}」做决策底座，其他都得服务于它。`
          : tone === "soft"
            ? `这是"双核并行"配置：你会根据场景在「${A.keywords[0]}」与「${B.keywords[0]}」之间换挡。`
            : `这是"主核+副核"配置：你偏向先用「${A.keywords[0]}」，再用「${B.keywords[0]}」收束局面。`,
      sections: [
        { title: "一句话定位", bullets: [combo.oneLiner] },
        { title: "组合优势", bullets: combo.advantages },
        { title: "组合风险", bullets: combo.risks },
        { title: "当主核更强时", bullets: combo.howItShowsWhenAHigh },
        { title: "当副核更强时", bullets: combo.howItShowsWhenBHigh },
        { title: "协同建议（最可执行）", bullets: combo.tips },
      ],
      cta: "记住：你不是要赢一场，而是要让系统长期可运行。",
    };
  }

  if (cardId === "traits") {
    return {
      title: "核心特质深解",
      subtitle,
      lead: `主核决定你怎么做决策（${A.nameCN}），副核决定你怎么处理人（${B.nameCN}）。`,
      sections: [
        {
          title: `${A.nameCN}（主核）｜${A.essence}`,
          bullets: [...A.strengths, ...A.blindspots],
        },
        {
          title: `${B.nameCN}（副核）｜${B.essence}`,
          bullets: [...B.strengths, ...B.blindspots],
        },
        {
          title: "触发器（你最容易上头的点）",
          bullets: Array.from(new Set([...A.triggers, ...B.triggers])).slice(
            0,
            5
          ),
        },
        {
          title: "快速修复动作（立刻能用）",
          bullets: Array.from(new Set([...A.fixes, ...B.fixes])).slice(0, 5),
        },
      ],
      cta: "强者不是不崩，而是崩的时候仍然保有选择权。",
    };
  }

  if (cardId === "radar") {
    return {
      title: "雷达图怎么读",
      subtitle,
      lead: "雷达不是优劣，而是你更常用的路径。高分是习惯，低分是备用。",
      sections: [
        {
          title: "你的主用路径",
          bullets: [
            `你更常用「${A.keywords.join(" / ")}」解决问题。`,
            `你会用「${B.keywords.join(" / ")}」来让局面更顺。`,
          ],
        },
        {
          title: "低分维度不是缺陷",
          bullets: [
            "只是你不常用那条路。需要时可以临时上号。",
            "建议：每次补一个小动作，不用改性格。",
          ],
        },
        {
          title: "一个补分策略",
          bullets: [
            "选一个你最低的维度，给自己设一个单次挑战。例如：练一次明确拒绝/练一次公开表达/练一次资源交换。",
          ],
        },
      ],
      cta: "雷达图的价值：告诉你你在什么情境会换挡。",
    };
  }

  // scenes
  return {
    title: "场景表现详解",
    subtitle,
    lead: "你会在不同场景启动不同引擎：这不是矛盾，是换挡。",
    sections: [
      {
        title: `独处（INT）更常接管：${AGENT[topINT.top1].nameCN}×${AGENT[topINT.top2].nameCN}`,
        bullets: [
          ...AGENT[topINT.top1].scenes.INT,
          ...AGENT[topINT.top2].scenes.INT,
        ],
      },
      {
        title: `团队（TEAM）更常接管：${AGENT[topTEAM.top1].nameCN}×${AGENT[topTEAM.top2].nameCN}`,
        bullets: [
          ...AGENT[topTEAM.top1].scenes.TEAM,
          ...AGENT[topTEAM.top2].scenes.TEAM,
        ],
      },
      {
        title: `社交（SOC）更常接管：${AGENT[topSOC.top1].nameCN}×${AGENT[topSOC.top2].nameCN}`,
        bullets: [
          ...AGENT[topSOC.top1].scenes.SOC,
          ...AGENT[topSOC.top2].scenes.SOC,
        ],
      },
      {
        title: "避免翻车的一句提醒",
        bullets: [
          tone === "hard"
            ? "当你开始变硬：先说动作需求，再说规则。"
            : "当你开始乱想：先要回归时间点，再谈原因。",
        ],
      },
    ],
    cta: "场景卡最有用：它告诉你什么时候该收、什么时候该放。",
  };
}
