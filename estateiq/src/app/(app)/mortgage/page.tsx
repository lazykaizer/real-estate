"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, PiggyBank, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/mock";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const COLORS = ["#1565C0", "#2E7D32", "#00695C"];

export default function MortgagePage() {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [downPayment, setDownPayment] = useState(20);

  // Affordability calculator
  const [monthlyIncome, setMonthlyIncome] = useState(200000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000);
  const [existingEmi, setExistingEmi] = useState(0);

  const mortgage = useMemo(() => {
    const principal = loanAmount * (1 - downPayment / 100);
    const r = interestRate / 100 / 12;
    const n = tenure * 12;
    const emi =
      r > 0
        ? (principal * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1)
        : principal / n;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    // Generate amortization chart data (yearly)
    const yearlyData: { year: number; principal: number; interest: number; balance: number }[] = [];
    let balance = principal;
    for (let year = 1; year <= tenure; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 0; month < 12; month++) {
        const interestPayment = balance * r;
        const principalPayment = emi - interestPayment;
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
        balance -= principalPayment;
      }
      yearlyData.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      emi: Math.round(emi),
      principal,
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      yearlyData,
    };
  }, [loanAmount, interestRate, tenure, downPayment]);

  const affordability = useMemo(() => {
    const disposableIncome = monthlyIncome - monthlyExpenses - existingEmi;
    const maxEmi = disposableIncome * 0.4; // 40% DTI ratio
    const r = 8.5 / 100 / 12;
    const n = 20 * 12;
    const maxLoan =
      r > 0
        ? (maxEmi * (Math.pow(1 + r, n) - 1)) /
        (r * Math.pow(1 + r, n))
        : maxEmi * n;
    const maxPropertyPrice = maxLoan / 0.8; // 20% down
    return {
      maxEmi: Math.round(maxEmi),
      maxLoan: Math.round(maxLoan),
      maxPropertyPrice: Math.round(maxPropertyPrice),
    };
  }, [monthlyIncome, monthlyExpenses, existingEmi]);

  const pieData = [
    { name: "Principal", value: mortgage.principal },
    { name: "Interest", value: mortgage.totalInterest },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* ── Premium Header ── */}
      <div className="relative overflow-hidden bg-navy text-white py-16 lg:py-24 border-b border-white/5">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0a192f]" />
          <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[100%] bg-blue-600/20 rounded-[100%] blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[60%] h-[90%] bg-indigo-500/20 rounded-[100%] blur-[100px]" />
        </div>

        {/* Subtle data pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border border-blue-500/20">
              <Calculator className="h-3 w-3" />
              Financial Suites
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Plan Your Future <span className="text-blue-400">Smarter.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Precision-engineered mortgage calculators and affordability tools to help you navigate your real estate journey with absolute confidence.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative -mt-8 z-20">
        <Tabs defaultValue="emi" className="space-y-10">
          <TabsList className="inline-flex h-14 items-center justify-center rounded-[1.2rem] bg-white/40 backdrop-blur-xl p-1.5 border border-white shadow-xl">
            <TabsTrigger
              value="emi"
              className="px-8 h-full rounded-[1rem] font-black text-slate-500 data-[state=active]:bg-navy data-[state=active]:text-white transition-all gap-2"
            >
              <Calculator className="h-4 w-4" /> EMI Calculator
            </TabsTrigger>
            <TabsTrigger
              value="afford"
              className="px-8 h-full rounded-[1rem] font-black text-slate-500 data-[state=active]:bg-navy data-[state=active]:text-white transition-all gap-2"
            >
              <PiggyBank className="h-4 w-4" /> Affordability
            </TabsTrigger>
          </TabsList>

          {/* EMI Calculator */}
          <TabsContent value="emi">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="rounded-[2.5rem] border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-md">
                  <CardHeader className="pt-8 px-8">
                    <CardTitle className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Calculator Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 pb-10 px-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="font-bold text-slate-700">Property Price</Label>
                        <span className="text-xl font-black text-navy">
                          {formatPrice(loanAmount)}
                        </span>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={([v]) => setLoanAmount(v)}
                        min={1000000}
                        max={100000000}
                        step={500000}
                        className="py-4"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="font-bold text-slate-700">Down Payment</Label>
                        <span className="text-xl font-black text-blue-600">
                          {downPayment}%
                        </span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={([v]) => setDownPayment(v)}
                        min={5}
                        max={80}
                        step={5}
                        className="py-4"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="font-bold text-slate-700">Interest Rate</Label>
                        <span className="text-xl font-black text-indigo-600">
                          {interestRate}%
                        </span>
                      </div>
                      <Slider
                        value={[interestRate]}
                        onValueChange={([v]) => setInterestRate(v)}
                        min={5}
                        max={15}
                        step={0.1}
                        className="py-4"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="font-bold text-slate-700">Loan Tenure</Label>
                        <span className="text-xl font-black text-slate-900">
                          {tenure} Yrs
                        </span>
                      </div>
                      <Slider
                        value={[tenure]}
                        onValueChange={([v]) => setTenure(v)}
                        min={1}
                        max={30}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-6">
                {/* EMI Result Card */}
                <Card className="rounded-[2.5rem] border-white bg-navy text-white shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <TrendingUp className="h-32 w-32" />
                  </div>
                  <CardContent className="pt-10 pb-10 px-8 relative z-10">
                    <div className="text-center md:text-left">
                      <p className="text-[11px] font-black text-blue-300 uppercase tracking-[0.3em] mb-4">
                        Estimated Monthly Investment
                      </p>
                      <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
                        {formatPrice(mortgage.emi)}
                        <span className="text-xl md:text-2xl font-normal text-white/40 ml-4">
                          / month
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Principal</p>
                        <p className="text-lg font-bold">
                          {formatPrice(mortgage.principal)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Total Interest</p>
                        <p className="text-lg font-bold">
                          {formatPrice(mortgage.totalInterest)}
                        </p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Total Payable</p>
                        <p className="text-lg font-bold text-blue-400">
                          {formatPrice(mortgage.totalPayment)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Payment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {pieData.map((_, idx) => (
                                <Cell
                                  key={idx}
                                  fill={COLORS[idx]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: string | number | undefined) => formatPrice(Number(value ?? 0))}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 text-xs">
                        <span className="flex items-center gap-1">
                          <span className="h-3 w-3 rounded-full bg-blue" />
                          Principal
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-3 w-3 rounded-full bg-green" />
                          Interest
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Area Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Balance Over Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={mortgage.yearlyData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e5e5e5"
                            />
                            <XAxis
                              dataKey="year"
                              tick={{ fontSize: 10 }}
                              tickFormatter={(v: number) => `Y${v}`}
                            />
                            <YAxis
                              tick={{ fontSize: 10 }}
                              tickFormatter={(v: number) =>
                                `${(v / 100000).toFixed(0)}L`
                              }
                            />
                            <Tooltip
                              formatter={(value: string | number | undefined) => formatPrice(Number(value ?? 0))}
                            />
                            <Area
                              type="monotone"
                              dataKey="balance"
                              stroke="#1565C0"
                              fill="#E3F0FF"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Affordability Calculator */}
          <TabsContent value="afford">
            <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Your Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Monthly Income (₹)</Label>
                    <Input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) =>
                        setMonthlyIncome(Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Monthly Expenses (₹)</Label>
                    <Input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) =>
                        setMonthlyExpenses(Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Existing EMI (₹)</Label>
                    <Input
                      type="number"
                      value={existingEmi}
                      onChange={(e) =>
                        setExistingEmi(Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="bg-green-light border-green">
                  <CardContent className="pt-6 text-center">
                    <DollarSign className="h-8 w-8 text-green mx-auto mb-2" />
                    <p className="text-sm text-gray-mid">
                      You Can Afford Up To
                    </p>
                    <p className="text-3xl font-bold text-green mt-1">
                      {formatPrice(affordability.maxPropertyPrice)}
                    </p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-mid text-xs">Max Loan</p>
                        <p className="font-semibold text-navy">
                          {formatPrice(affordability.maxLoan)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-mid text-xs">Max EMI</p>
                        <p className="font-semibold text-navy">
                          {formatPrice(affordability.maxEmi)}/mo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  asChild
                  className="w-full bg-blue hover:bg-blue/90 text-white"
                >
                  <a href="/buy">Search Homes in Your Budget</a>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Rate Tracker Removed per User Request */}
        </Tabs>
      </div>
    </div>
  );
}
