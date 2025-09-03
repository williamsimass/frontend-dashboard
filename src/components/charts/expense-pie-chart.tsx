import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Alimentação', value: 35, amount: 1050, color: '#00FFA3' },
  { name: 'Transporte', value: 25, amount: 750, color: '#FF6B6B' },
  { name: 'Moradia', value: 20, amount: 600, color: '#4ECDC4' },
  { name: 'Lazer', value: 15, amount: 450, color: '#45B7D1' },
  { name: 'Outros', value: 5, amount: 150, color: '#96CEB4' },
];

const COLORS = data.map(item => item.color);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-card">
        <p className="text-foreground font-medium">{data.name}</p>
        <p className="text-primary font-bold">
          R$ {data.amount.toLocaleString('pt-BR')} ({data.value}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap gap-3 justify-center mt-4">
    {payload?.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-foreground">{entry.value}</span>
      </div>
    ))}
  </div>
);

export function ExpensePieChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}