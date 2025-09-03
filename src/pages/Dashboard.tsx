import { ExpenseCard } from "@/components/ui/expense-card";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { ExpenseLineChart } from "@/components/charts/expense-line-chart";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  // Dados simulados
  const userData = {
    name: "João Silva",
    monthlyGoal: 2000,
    totalSpent: 1650,
    totalIncome: 4500,
    currentBalance: 2850, // totalIncome - totalSpent
    topCategory: "Alimentação"
  };

  const progressPercentage = (userData.totalSpent / userData.monthlyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Olá, {userData.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Vamos ver como estão seus gastos este mês.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExpenseCard
          title="Saldo Atual"
          value={`R$ ${userData.currentBalance.toLocaleString('pt-BR')}`}
          subtitle="Disponível na conta"
          variant="success"
        />
        
        <ExpenseCard
          title="Receitas do Mês"
          value={`R$ ${userData.totalIncome.toLocaleString('pt-BR')}`}
          subtitle="Janeiro 2024"
          variant="success"
        />
        
        <ExpenseCard
          title="Gastos do Mês"
          value={`R$ ${userData.totalSpent.toLocaleString('pt-BR')}`}
          subtitle="Janeiro 2024"
          variant="default"
        />
        
        <ExpenseCard
          title="Meta Mensal"
          value={`R$ ${userData.monthlyGoal.toLocaleString('pt-BR')}`}
          subtitle={`Restam R$ ${(userData.monthlyGoal - userData.totalSpent).toLocaleString('pt-BR')}`}
          progress={progressPercentage}
          variant={progressPercentage > 80 ? "danger" : progressPercentage > 60 ? "warning" : "success"}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <Card className="p-6 bg-gradient-card border border-border shadow-card">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                Gastos por Categoria
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribuição dos gastos do mês atual
              </p>
            </div>
            <ExpensePieChart />
          </div>
        </Card>

        {/* Gráfico de Linha */}
        <Card className="p-6 bg-gradient-card border border-border shadow-card">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                Evolução Diária
              </h3>
              <p className="text-sm text-muted-foreground">
                Gastos dos últimos 30 dias
              </p>
            </div>
            <ExpenseLineChart />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-card border border-border shadow-card">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">-</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Adicionar Gasto</p>
                <p className="text-xs text-muted-foreground">Registrar despesa</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg cursor-pointer hover:bg-success/15 transition-colors">
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">+</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Adicionar Receita</p>
                <p className="text-xs text-muted-foreground">Registrar entrada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-info/10 border border-info/20 rounded-lg">
              <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Ver Relatórios</p>
                <p className="text-xs text-muted-foreground">Análises detalhadas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚙️</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Configurações</p>
                <p className="text-xs text-muted-foreground">Ajustar preferências</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}