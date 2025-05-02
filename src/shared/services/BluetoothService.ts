import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

type ListenerSubscription = { remove: () => void };

class BluetoothService {
  private device: BluetoothDevice | null = null;
  private subscription: ListenerSubscription | null = null;

  async connectToFirstDevice(): Promise<void> {
    const devices = await RNBluetoothClassic.getBondedDevices();
    if (!devices.length) throw new Error('No bonded devices found');

    const device = devices[0];
    console.log('Connecting to:', device.name ?? device.address);
    const connected = await device.connect();
    if (!connected) throw new Error('Failed to connect');

    this.device = device;
    console.log('Connected successfully');
  }

  async sendCommand(command: string) {
    if (!this.device) throw new Error('No connected device');
    await this.device.write(`${command}\n`);
  }

  listenForResponses(callback: (message: string) => void) {
    if (!this.device) throw new Error('No connected device');
    this.subscription = this.device.onDataReceived((data) => {
      const message = data.data.trim();
      console.log('Message received:', message);
      callback(message);
    });
  }

  stopListening() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  async disconnect() {
    this.stopListening();
    if (this.device) {
      await this.device.disconnect();
      this.device = null;
    }
  }
}

const bluetoothService = new BluetoothService();
export default bluetoothService;
