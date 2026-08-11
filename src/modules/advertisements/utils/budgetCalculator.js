export function calculateBudgetStats(ad) {

  const budget = Number(ad.budget || 0);

  const spent = Number(ad.spent || 0);

  const remaining = budget - spent;

  const percentage = budget === 0
    ? 0
    : Math.round((spent / budget) * 100);

  return {

    budget,

    spent,

    remaining,

    percentage

  };

}

export function dailyBudget(totalBudget, days) {

  if (!days) return 0;

  return totalBudget / days;

}

export function canSpend(ad, amount) {

  return (
    ad.spent + amount <= ad.budget
  );

}