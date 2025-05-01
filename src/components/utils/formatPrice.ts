

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(
    value
  );
