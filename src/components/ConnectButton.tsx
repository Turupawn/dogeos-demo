import { useWalletConnect, useAccount } from "@dogeos/dogeos-sdk";

export const ConnectButton = () => {
  const {
    openModal,
    disconnect,
    isConnected,
    isConnecting
  } = useWalletConnect();
  const { address } = useAccount();

  if (isConnecting) {
    return <button disabled>Cargando DogeOS...</button>;
  }

  if (isConnected) {
    return (
      <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p>✅ Conectado</p>
        {/* Mostramos la dirección recortada */}
        <p style={{ fontFamily: 'monospace' }}>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <button onClick={() => disconnect()}>Desconectar</button>
      </div>
    );
  }

  // Al hacer clic, se abre el modal oficial con opción de Twitter/X [8]
  return (
    <button onClick={() => openModal()}>
      🐶 Conectar con DogeOS
    </button>
  );
};