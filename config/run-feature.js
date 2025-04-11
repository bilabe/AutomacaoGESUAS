const { exec } = require("child_process");

const featureName = process.argv[2];
if (!featureName) {
  console.error("❌ Você precisa passar o nome do arquivo da feature.");
  process.exit(1);
}

const featurePath = `src/test/features/${featureName}.feature`;
console.log(`🚀 Executando: npx cucumber-js ${featurePath}`);

exec(`npx cucumber-js ${featurePath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(stderr);
    process.exit(1);
  }
  console.log(stdout);
});
