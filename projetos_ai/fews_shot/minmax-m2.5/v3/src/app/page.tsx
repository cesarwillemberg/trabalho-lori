// src/app/page.tsx
// Página principal da aplicação de análise de crédito

import CreditForm from '../components/CreditForm';

export default function Home() {
  return (
    <main style={styles.main}>
      <CreditForm />
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    paddingTop: '40px',
    paddingBottom: '40px'
  }
};