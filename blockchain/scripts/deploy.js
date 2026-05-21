import { ethers } from "ethers";
import fs from "fs";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const wallet = new ethers.Wallet(privateKey, provider);

  const artifactJson = fs.readFileSync(
    "./artifacts/contracts/Election.sol/Votechain.json",
    "utf8",
  );
  const artifact = JSON.parse(artifactJson);

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet,
  );
  const votechain = await factory.deploy();

  await votechain.waitForDeployment();

  console.log(`Contract Address: ${votechain.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
