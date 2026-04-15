'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Análise de Crédito</h1>
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            Nova Análise
          </Link>
          <Link href="/history" className="nav-link">
            Histórico
          </Link>
        </nav>
      </div>
    </header>
  );
}