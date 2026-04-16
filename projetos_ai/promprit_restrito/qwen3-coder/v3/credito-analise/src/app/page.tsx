import CreditoForm from '@/components/CreditoForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Aplicação para análise de crédito de clientes',
};

export default function Home() {
  return <CreditoForm />;
}