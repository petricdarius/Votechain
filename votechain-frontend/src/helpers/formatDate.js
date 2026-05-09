const formatDateRange = (startStr, endStr) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const start = new Date(startStr);
  const end = new Date(endStr);

  const formatter = new Intl.DateTimeFormat("ro-RO", options);

  return `${formatter.format(start)} — ${formatter.format(end)}`;
};

export default formatDateRange;
