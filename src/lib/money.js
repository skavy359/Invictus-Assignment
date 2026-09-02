export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const base = Math.floor(totalCents / n);
  let remainder = totalCents % n;
  const shares = {};

  for (const id of ids) {
    const cents = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    shares[id] = Number((cents / 100).toFixed(2));
  }

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  const total = values.reduce((a, b) => a + b, 0);
  return Math.abs(total - 100) < 0.000001;
}

export function splitByPercent(amount, percents) {
  const shares = {};
  const entries = Object.entries(percents);
  const totalCents = Math.round(Number(amount) * 100);
  const allocated = entries.map(([id, pct]) => ({
    id,
    cents: Math.round((totalCents * Number(pct)) / 100),
  }));

  const diff = totalCents - allocated.reduce((sum, item) => sum + item.cents, 0);
  if (allocated.length && diff !== 0) {
    allocated[allocated.length - 1].cents += diff;
  }

  for (const { id, cents } of allocated) {
    shares[id] = Number((cents / 100).toFixed(2));
  }

  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}