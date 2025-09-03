import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, ArrowLeft, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const incomeCategories = [
  "Salário",
  "Freelance", 
  "Investimentos",
  "Venda",
  "Outros"
];

export default function AddIncome() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      // Remove caracteres não numéricos e aplica formatação de moeda
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/(\d)(\d{2})$/, "$1,$2");
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula salvamento
    setTimeout(() => {
      toast({
        title: "Receita adicionada!",
        description: `R$ ${formData.amount} em ${formData.category} foi registrado.`,
      });
      navigate("/");
      setLoading(false);
    }, 1000);
  };

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
            Adicionar Receita
          </h1>
          <p className="text-muted-foreground">
            Registre uma nova entrada em sua conta.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-2xl">
        <Card className="p-8 bg-gradient-card border border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Descrição */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-foreground font-medium">
                  Descrição *
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Ex: Salário mensal, Freelance projeto X"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Valor */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground font-medium">
                  Valor *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-success">R$</span>
                  <Input
                    id="amount"
                    name="amount"
                    type="text"
                    placeholder="0,00"
                    value={formData.amount}
                    onChange={handleChange}
                    className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground border-success/50 focus:border-success"
                    required
                  />
                </div>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Data *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-input border-border",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Categoria */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-foreground font-medium">Categoria *</Label>
                <Select onValueChange={handleCategoryChange} required>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botão de Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-success hover:bg-success/90 text-white font-semibold py-3 transition-all duration-200"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {loading ? "Salvando..." : "Salvar Receita"}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Dica */}
      <Card className="p-6 bg-success/5 border border-success/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-sm">💰</span>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Dica</h3>
            <p className="text-sm text-muted-foreground">
              Registre todas as suas entradas de dinheiro para ter um controle completo do seu orçamento. 
              Isso inclui salário, freelances, rendimentos de investimentos, vendas, etc.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}