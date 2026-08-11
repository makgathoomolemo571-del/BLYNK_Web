const CPM = 45;
const CTR = 2.5;

export function estimateReach(budget) {

  const impressions =
    (budget / CPM) * 1000;

  const clicks =
    impressions * (CTR / 100);

  return {

    impressions: Math.round(impressions),

    clicks: Math.round(clicks),

    estimatedCTR: CTR,

    estimatedCPM: CPM

  };

}

export function estimateByCPM(
  budget,
  customCPM
) {

  const impressions =
    (budget / customCPM) * 1000;

  return Math.round(impressions);

}

export function estimateByCTR(
  impressions,
  ctr
) {

  return Math.round(
    impressions * (ctr / 100)
  );

}