import { useAccount } from "@dogeos/dogeos-sdk";
import { useEffect } from "react";

export const UserProfile = () => {
  const { address, balance, chainId, signMessage } = useAccount();

  // Verificación de seguridad básica
  useEffect(() => {
    if (address && chainId !== 6281971) {
      alert("¡Estás en la red equivocada! Por favor cambia a DogeOS Testnet.");
    }
  }, [chainId, address]);

  if (!address) return null;

  const handleSign = async () => {
    try {
      // Ejemplo de firma criptográfica segura (MPC) [9, 10]
      const sig = await signMessage({ message: "Hola DogeOS" });
      alert(`Mensaje firmado: ${sig.slice(0, 20)}...`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Tus Datos en Chain {chainId}</h3>
      <p>💰 Saldo: <strong>{balance?.formatted} {balance?.symbol}</strong></p>
      <button onClick={handleSign}>Firmar Mensaje de Prueba</button>
    </div>
  );
};