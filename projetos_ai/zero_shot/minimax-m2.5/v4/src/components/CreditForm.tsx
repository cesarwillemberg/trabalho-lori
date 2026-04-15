'use client';

/**
 * Componente de formulário de análise de crédito
 * Gerencia a coleta de dados do cliente e submissão para análise
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreditAnalysisInput, ValidationError, DebtHistory } from '@/lib/types';
import { validateInput, analyzeCredit } from '@/lib/creditAnalysis';
import { createLog } from '@/lib/logStorage';
import { AnalysisResult, ClientData } from '@/lib/types';

interface CreditFormProps {
  onResult: (result: AnalysisResult, clientData: ClientData) => void;
  onSubmit: () => void;
}

export function CreditForm({ onResult, onSubmit }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditAnalysisInput>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0,
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);

  const debtHistoryOptions = [
    { value: 'limpo', label: 'Limpo' },
    { value: 'negativado', label: 'Negativado' },
  ];

  const handleChange = (
    field: keyof CreditAnalysisInput,
    value: string | number
  ) => {
    const processedValue = typeof value === 'string' && field !== 'historicoDividas'
      ? parseFloat(value) || 0
      : value;

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    if (errors.some(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    // Validar dados de entrada
    const validationErrors = validateInput(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Realizar análise de crédito
    const result = analyzeCredit(formData);

    // Converter dados do formulário para formato do cliente
    const clientData: ClientData = {
      age: formData.idade,
      monthlyIncome: formData.rendaMensal,
      debtHistory: formData.historicoDividas as DebtHistory,
      loanAmount: formData.valorEmprestimo,
    };

    // Criar log da análise
    await createLog(clientData, result);

    // Notificar resultado
    onResult(result, clientData);
    onSubmit();
    setLoading(false);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(e => e.field === field)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="credit-form">
      <h2 className="form-title">Dados do Cliente</h2>
      
      <Input
        id="idade"
        label="Idade"
        type="number"
        min={18}
        max={120}
        value={formData.idade || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('idade', e.target.value)}
        placeholder="Ex: 25"
        error={getFieldError('idade')}
        required
      />

      <Input
        id="rendaMensal"
        label="Renda Mensal (R$)"
        type="number"
        min={0}
        step={0.01}
        value={formData.rendaMensal || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('rendaMensal', e.target.value)}
        placeholder="Ex: 3000.00"
        error={getFieldError('rendaMensal')}
        required
      />

      <Select
        id="historicoDividas"
        label="Histórico de Dívidas"
        value={formData.historicoDividas}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('historicoDividas', e.target.value)}
        options={debtHistoryOptions}
        error={getFieldError('historicoDividas')}
        required
      />

      <Input
        id="valorEmprestimo"
        label="Valor do Empréstimo (R$)"
        type="number"
        min={0}
        step={0.01}
        value={formData.valorEmprestimo || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('valorEmprestimo', e.target.value)}
        placeholder="Ex: 10000.00"
        error={getFieldError('valorEmprestimo')}
        required
      />

      <Button type="submit" loading={loading} variant="primary">
        Analisar Crédito
      </Button>
    </form>
  );
}