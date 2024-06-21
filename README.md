# Celo South Africa Workshop


## Deploy your First Smart Contract


```bash
npx hardhat run scripts/deploy.js --network alfajores
```

## Verify your First Smart Contract

Add your [celo scan API](https://celoscan.io) key to the `.env` file.

```bash
npx hardhat verify --network alfajores 0x5FbDB2315678afecb367f032d93F642f64180aa3 1718954715   1
```

Or use [atlas](https://app.atlaszk.com/ide) to deploy and verify your contract. 


## Call the contract in the FE

1. Import ABI
2. get a walletClient

```typescript
 const walletClient = createWalletClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum!)
  })
```

3. get a publicClient

```typescript
  const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: http()
        })
```

4. get address

```typescript
  const [address] = await walletClient.getAddresses()
```

5. call simulate function


```typescript
  const { request } = await publicClient.simulateContract({
          account: address,
          address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          abi: lockABI.abi,
          functionName: 'withdraw',
      })
      await walletClient.writeContract(request)
```

6. Add a Button

```typescript
    <div className="w-full px-3 mt-6">
        <PrimaryButton
            onClick={withdraw}
            title="Withdraw"
            widthFull
        />
    </div>
```
