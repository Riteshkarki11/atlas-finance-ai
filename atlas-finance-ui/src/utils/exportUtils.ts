export const exportToCSV = (tickerSymbol: string, intrinsicVal: number, wacc: number) => {
  const rows = [
    ['Atlas Finance AI - Valuation Model Export'],
    ['Ticker', tickerSymbol],
    ['Export Date', new Date().toLocaleDateString()],
    ['Calculated Intrinsic Value', `$${intrinsicVal.toFixed(2)}`],
    ['Applied WACC', `${wacc}%`],
    [],
    ['Year', 'Revenue ($M)', 'EBITDA ($M)', 'Unlevered FCF ($M)'],
    ['FY2024A', '60922', '34478', '27021'],
    ['FY2025E', '126000', '78120', '59820'],
    ['FY2026E', '152900', '96327', '75610'],
    ['FY2027E', '181200', '114156', '89200'],
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${tickerSymbol}_Valuation_Model_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};