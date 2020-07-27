export const FIELDS = {
  "Total Cases": "positive",
  "Total Deaths": "death",
  "Total Hospitalized": "hospitalizedCumulative",
  "Daily Cases": "positiveIncrease",
  "Daily Deaths": "deathIncrease",
  // "Ventilator Cases": "onVentilatorCumulative",
  "Currently Hospitalized": "hospitalizedCurrently",
};

export const STATES = ["AZ", "CA", "FL", "TX", "NY", "NJ"];

export const RANGES = [
  { name: "Last Ten Days", value: -10, ticks: "day" },
  { name: "Last Three Months", value: -1 * 30 * 3, ticks: "month" },
  { name: "All Months", value: null, ticks: "month" },
];
