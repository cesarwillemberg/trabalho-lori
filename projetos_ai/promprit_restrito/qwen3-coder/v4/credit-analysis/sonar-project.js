const sonarScanner = require('@sonar/scan').default;

const serverUrl = process.env.SONAR_HOST_URL || 'http://localhost:9000';
const token = process.env.SONAR_TOKEN || 'sqa_b609ee34589471001ab3a396f18a515fd1bb1467';

if (!token) {
  console.error(
    'SONAR_TOKEN nao definido. Configure a variavel de ambiente antes de executar "npm run sonar".'
  );
  process.exit(1);
}

sonarScanner(
  {
    serverUrl,
    token,
    options: {
      'sonar.projectKey': 'credit-analysis',
      'sonar.projectName': 'Credit Analysis',
      'sonar.projectVersion': '0.1.0',
      'sonar.sources': '.',
      'sonar.exclusions': 'node_modules/**,.next/**,public/**',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  }
);
