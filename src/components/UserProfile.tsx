import { useAccount } from "@dogeos/dogeos-sdk";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const { address, balance, chainId, currentProvider, chainType } = useAccount();
  const [signing, setSigning] = useState(false);

  // Verificación de seguridad básica
  useEffect(() => {
    if (address && chainId !== "6281971") {
      alert("¡Estás en la red equivocada! Por favor cambia a DogeOS Testnet.");
    }
  }, [chainId, address]);

  if (!address) return null;

  // Firmar mensaje usando currentProvider (funciona con Twitter/social login)
  const handleSignMessage = async () => {
    if (!currentProvider || chainType !== "evm") {
      alert("No hay provider EVM disponible");
      return;
    }

    setSigning(true);
    try {
      const message = "Hola DogeOS - Mensaje de prueba";
      const sig = await currentProvider.request({
        method: "personal_sign",
        params: [message, address],
      });
      alert(`Mensaje firmado exitosamente:\n${sig.slice(0, 30)}...`);
    } catch (e) {
      console.error("Error al firmar:", e);
      alert(`Error al firmar: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setSigning(false);
    }
  };

  // Enviar transacción de prueba (0 DOGE a ti mismo)
  const handleSendTransaction = async () => {
    if (!currentProvider || chainType !== "evm") {
      alert("No hay provider EVM disponible");
      return;
    }

    setSigning(true);
    try {
      const txHash = await currentProvider.request({
        method: "eth_sendTransaction",
        params: [{
          from: address,
          to: address, // Enviando a ti mismo como prueba
          value: "0x0", // 0 DOGE
        }],
      });
      alert(`Transacción enviada:\n${txHash}`);
    } catch (e) {
      console.error("Error en transacción:", e);
      alert(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setSigning(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Tus Datos en Chain {chainId}</h3>
      <p>💰 Saldo: <strong>{balance ?? '0'} DOGE</strong></p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleSignMessage} disabled={signing}>
          {signing ? 'Firmando...' : 'Firmar Mensaje'}
        </button>
        <button onClick={handleSendTransaction} disabled={signing}>
          {signing ? 'Enviando...' : 'Enviar TX (0 DOGE)'}
        </button>
      </div>
    </div>
  );
};