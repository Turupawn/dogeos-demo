import { WalletConnectProvider } from "@dogeos/dogeos-sdk";
import { sdkConfig } from "./config"; // Importamos la config del Paso 3
import { ConnectButton } from "./components/ConnectButton";
import { UserProfile } from "./components/UserProfile";
import './App.css';

function App() {
  return (
    // El Provider debe envolver a todos los componentes que usen hooks de DogeOS [11]
    <WalletConnectProvider config={sdkConfig}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h1>Bienvenido a DogeOS 🐕</h1>
        <p>Esta dApp corre sobre la Testnet Chikyū</p>

        {/* Componentes de la dApp */}
        <ConnectButton />
        <UserProfile />

      </div>
    </WalletConnectProvider>
  );
}

export default App;