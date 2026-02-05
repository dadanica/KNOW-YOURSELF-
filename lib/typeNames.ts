export const typeNameMap: Record<string, string> = {
  "BU-CM": "秩序铸造者",
  "CM-BU": "主权架构师",
  "BR-SI": "聚光引潮者",
  "SI-BR": "魅声放大器",
  "TR-CM": "资源操盘手",
  "HU-CM": "裁断执掌者",
  "BI-CM": "同盟执旗者",
};

export function getTypeName(typeKey: string, fallback: string) {
  return typeNameMap[typeKey] ?? fallback;
}
