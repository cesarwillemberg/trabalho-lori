const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000', // URL do seu servidor SonarQube
    options: {
      'sonar.token': 'sqa_eb05419350ffcd31ff83de3a2390ade4605ea89b', // O token que você gerou no painel do SonarQube
      'sonar.projectKey': 'credit-analysis',
      'sonar.projectName': 'Credit Analysis',
      'sonar.projectVersion': '0.1.0',
      'sonar.sources': 'app,components,data,repository,service,types,utils,validation', // Pastas principais do código fonte
      'sonar.exclusions': 'node_modules/**,.next/**,public/**', // Pastas ou arquivos para o Sonar ignorar
      'sonar.sourceEncoding': 'UTF-8',
      
      // Configuração para testes unitários (Opcional)
      // 'sonar.tests': 'src',
      // 'sonar.test.inclusions': '**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx',
      // 'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', // Arquivo de Cobertura de teste (Gerado pelo Jest/Vitest)
    },
  },
  () => process.exit()
);
