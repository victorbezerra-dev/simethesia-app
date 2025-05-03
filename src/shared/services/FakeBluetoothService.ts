type ListenerSubscription = { remove: () => void };

class FakeBluetoothService {
  private deviceName: string | null = null;
  private subscription: ListenerSubscription | null = null;
  private mockTimer: NodeJS.Timeout | null = null;
  private simulationStartTime: number = 0;

  async connectToFirstDevice(): Promise<void> {
    console.log('(Mock) Simulating connection to device...');
    await this.delay(1000);
    this.deviceName = 'MockDevice';
    this.simulationStartTime = Date.now();
    console.log('(Mock) Connected to:', this.deviceName);
  }

  async sendCommand(command: string) {
    if (!this.deviceName) throw new Error('No mock device connected');
    console.log('(Mock) Sending command:', command);
  }

  listenForResponses(callback: (message: string) => void) {
    if (!this.deviceName) throw new Error('No mock device connected');

    console.log('(Mock) Starting response listener...');

    this.mockTimer = setInterval(() => {
      const elapsedMs = Date.now() - this.simulationStartTime;

      if (elapsedMs >= 3 * 60 * 1000) {
        console.log('(Mock) Simulation time limit reached. Stopping listener.');
        this.stopListening();
        return;
      }

      const fakeMessage = this.generateFakeMessage(elapsedMs);
      console.log('(Mock) Received message:', fakeMessage);
      callback(fakeMessage);
    }, 1);

    this.subscription = {
      remove: () => {
        if (this.mockTimer) clearInterval(this.mockTimer);
        this.mockTimer = null;
        console.log('(Mock) Listener stopped.');
      },
    };
  }

  stopListening() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  async disconnect() {
    console.log('🔌 (Mock) Disconnecting...');
    this.stopListening();
    await this.delay(500);
    this.deviceName = null;
    console.log('❎ (Mock) Disconnected.');
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateFakeMessage(relativeTimestamp: number): string {
    const bis = (60 + Math.random() * 40).toFixed(1);       // BIS between 60–100
    const propofol = (Math.random() * 5).toFixed(2);         // Propofol between 0–5

    return `${relativeTimestamp},${bis},${propofol}`;
  }
}

const mockBluetoothService = new FakeBluetoothService();
export default mockBluetoothService;
