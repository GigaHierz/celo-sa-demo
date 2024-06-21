import { useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { useAccount } from "wagmi";
import lockABI from '../../hardhat/artifacts/contracts/Lock.sol/Lock.json'
import PrimaryButton from "@/components/Button";

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    if (!isMounted) {
        return null;
    }

    const withdraw = async () => {
        const walletClient = createWalletClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum!)
        })
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: http()
        })

        const [address] = await walletClient.getAddresses()

        const { request } = await publicClient.simulateContract({
            account: address,
            address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            abi: lockABI.abi,
            functionName: 'withdraw',
        })
        await walletClient.writeContract(request)

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h1">
                There you go... a canvas for your next Celo project!
            </div>
            {isConnected ? (
                <div className="h2 text-center">
                    Your address: {userAddress}

                    <div className="w-full px-3 mt-6">
                        <PrimaryButton
                            onClick={withdraw}
                            title="Withdraw"
                            widthFull
                        />
                    </div>
                </div>
            ) : (
                <div>No Wallet Connected</div>
            )}
        </div>
    );
}
