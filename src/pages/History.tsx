import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Search, Filter, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Dados simulados
const transactionsData = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Salário mensal",
    category: "Salário",
    amount: 4500.00,
    type: "income" as const,
  },
  {
    id: 2,
    date: "2024-01-15",
    description: "Almoço no restaurante",
    category: "Alimentação",
    amount: -45.80,
    type: "expense" as const,
  },
  {
    id: 3,
    date: "2024-01-14",
    description: "Combustível",
    category: "Transporte",
    amount: -120.00,
    type: "expense" as const,
  },
  {
    id: 4,
    date: "2024-01-13",
    description: "Freelance projeto X",
    category: "Freelance",
    amount: 800.00,
    type: "income" as const,
  },
  {
    id: 5,
    date: "2024-01-13",
    description: "Cinema",
    category: "Lazer",
    amount: -30.00,
    type: "expense" as const,
  },
  {
    id: 6,
    date: "2024-01-12",
    description: "Supermercado",
    category: "Alimentação",
    amount: -180.50,
    type: "expense" as const,
  },
  {
    id: 7,
    date: "2024-01-11",
    description: "Conta de luz",
    category: "Moradia",
    amount: -95.00,
    type: "expense" as const,
  },
  {
    id: 8,
    date: "2024-01-10",
    description: "Uber",
    category: "Transporte",
    amount: -25.50,
    type: "expense" as const,
  },
];

const categoryColors: Record<string, string> = {
  "Alimentação": "bg-success/20 text-success border-success/30",
  "Transporte": "bg-info/20 text-info border-info/30",
  "Moradia": "bg-warning/20 text-warning border-warning/30",
  "Lazer": "bg-primary/20 text-primary border-primary/30",
  "Salário": "bg-success/20 text-success border-success/30",
  "Freelance": "bg-success/20 text-success border-success/30",
  "Investimentos": "bg-success/20 text-success border-success/30",
  "Outros": "bg-muted/20 text-muted-foreground border-muted/30",
};

export default function History() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    toast({
      title: "Transação removida",
      description: "O registro foi excluído com sucesso.",
    });
  };

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="p-0 h-auto text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Button>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Histórico de Transações
          </h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os seus registros financeiros.
          </p>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-1 xl:col-span-1">
          <Card className="p-4 bg-gradient-card border border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <Card className="p-4 bg-gradient-card border border-border">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
            <p className="text-xl font-bold text-success">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border border-border">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Gastos</p>
            <p className="text-xl font-bold text-destructive">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border border-border">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Saldo</p>
            <p className={`text-xl font-bold ${totalAmount >= 0 ? 'text-success' : 'text-destructive'}`}>
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.length} registros
            </p>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-gradient-card border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Histórico Financeiro
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/add-income")}
                className="bg-success hover:bg-success/90 text-white"
              >
                + Receita
              </Button>
              <Button
                onClick={() => navigate("/add-expense")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                + Gasto
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/5">
                <TableHead className="text-muted-foreground font-medium">Data</TableHead>
                <TableHead className="text-muted-foreground font-medium">Descrição</TableHead>
                <TableHead className="text-muted-foreground font-medium">Categoria</TableHead>
                <TableHead className="text-muted-foreground font-medium">Tipo</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">Valor</TableHead>
                <TableHead className="text-muted-foreground font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => navigate("/add-income")}
                          variant="outline"
                          className="border-border hover:bg-success/10"
                        >
                          Adicionar receita
                        </Button>
                        <Button
                          onClick={() => navigate("/add-expense")}
                          variant="outline"
                          className="border-border hover:bg-accent/50"
                        >
                          Adicionar gasto
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="border-border hover:bg-muted/5 transition-colors"
                  >
                    <TableCell className="text-foreground">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-foreground font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={categoryColors[transaction.category] || categoryColors["Outros"]}
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={transaction.type === 'income' 
                          ? 'bg-success/20 text-success border-success/30' 
                          : 'bg-destructive/20 text-destructive border-destructive/30'
                        }
                      >
                        {transaction.type === 'income' ? 'Receita' : 'Gasto'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${
                        transaction.amount >= 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length > 0 && (
          <div className="p-4 border-t border-border bg-muted/5">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredTransactions.length} de {transactions.length} registros
              </p>
              <div className="text-sm font-medium text-foreground">
                Saldo: <span className={totalAmount >= 0 ? 'text-success' : 'text-destructive'}>
                  R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}