# 🧠 Simethesia

Simethesia is an educational anesthesia simulator that allows users to train and visualize clinical effects in real time. Designed for academic environments, the app simulates the administration of anesthetic agents to a virtual patient, using control models based on pharmacokinetics/pharmacodynamics (PK/PD), realistic interactions, and continuous monitoring of key metrics such as BIS and drug dosage.

## 🖼️ App Images

![image](https://github.com/user-attachments/assets/afdf00ae-ea5c-4cc5-a9a5-6d260ba3519a)

## 🎯 What You Can Do with the Simethesia App

The **Simethesia App** is an interactive educational tool that allows students to experience anesthesia control in a practical and realistic way. With it, you can:

### 👩‍⚕️ Customize the Patient

- Select patient characteristics: **gender**, **age**, **weight**, and **height**
- Set the **total simulation time**, adapting it to the duration of the class or experiment

### 🧪 Set Clinical Challenges

- Activate events such as **hemorrhage**, **vasodilation**, or **vasoactive drug use**, which dynamically affect the simulation
- Each challenge alters clinical parameters in real time, requiring adaptation of the control strategy

### 🎛️ Control in Real Time with Arduino

- Start the simulation on an **Arduino**, which acts as a "virtual patient" responding to commands from the app via **Bluetooth**
- Monitor the simulation in real time as data is dynamically updated in the app

### 📊 Track Graphs and Metrics During Simulation

- View synchronized graphs such as:
  - **BIS (consciousness index) vs Time**
  - **Administered Propofol vs Time**
- See the **currently active challenge** and track other key patient behavior metrics

### ✅ Evaluate Results with Automatic Metrics

At the end of each simulation, the app automatically calculates:

- **IAE** – Integral of Absolute Error  
- **ISE** – Integral of Squared Error  
- **TCV** – Valid Control Time

These metrics help students understand the quality of the control strategy and the clinical effects based on the simulated data, in a clear and educational way.

### 📤 Export Data for Advanced Analysis

On the results screen, it is possible to:

- Export all simulation data into a **.csv (Excel)** file
- The format is structured as:

```
TIMESTAMP,BIS,PROPORFOL;
0.0110,95.90,30.00;
0.0370,95.90,30.00;
0.0620,95.90,30.00;
0.0870,95.90,30.00;
0.1120,95.88,30.00;
0.1370,95.85,30.00;
0.1610,95.77,29.98;
0.1870,95.64,29.91;
```

### ⚙️ Built With:
- **React Native 0.76.5** with **Expo SDK 52**
- **Redux Toolkit** and **Zustand** for state management
- **Bluetooth Serial** using `react-native-bluetooth-classic`
- **Skia** (Shopify) for high-performance graphics
- **Lottie** for responsive animations
- **Victory Native** for clinical data visualization
- **Tailwind CSS with NativeWind** for productive styling
- **Rive** for interactive UI animations
- **react-native-fs** and **expo-sharing** for saving and sharing simulations
- **Jest + Jest-Expo** for automated testing

#### ⚖️ Why Redux and Zustand?

- **Redux Toolkit** is widely used when you need:
  - Global state sharing across many modules
  - Middleware for handling complex side effects
  - Advanced debugging tools like Redux DevTools

❗ **However**, in the context of Simethesia, with a modular scope and well-isolated local states, **Zustand alone would be sufficient**. Its simplicity, performance, and direct hook-based integration make the code cleaner and more efficient.

The coexistence of both libraries in this project serves as a **technical case study**. In a production environment, we recommend using **Zustand only** for this type of application.

---

## 📱 Download the APK

Download the latest version for Android:

👉 [**Download Simethesia APK**]


---

## 🎥 Demo Video

Watch a full demonstration of the app:

[![Assista no YouTube](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

## 🚀 How to Run Locally
   ```bash
    1. Clone e instale as dependencias do projeto
        git clone https://github.com/seu-usuario/simethesia-app.git
        cd simethesia-app
        npm install
        npx expo start
    2. Abra no seu dispositivo:
        Via Expo Go
        Emulador Android/iOS
   ```

## 📡 Bluetooth Connection (Important!)

Currently, the **Simethesia app automatically connects to the first paired Bluetooth device** it finds.

⚠️ **Recommendation:**  
Make sure that **only your smartphone and your computer (desktop)** are paired at the time of connection. This prevents the app from connecting to unintended devices.

✅ **Planned Future Improvement:**  
We are working on a user-friendly interface that will allow **manual Bluetooth device selection**, making the process more reliable and intuitive.

## 📂 Modular Structure

The app follows a feature-based modular architecture:

```
modules/
├─ splash_screen/
├─ home/
├─ simulation/
├─ results/
├─ simulation_settings/
└─ shared/
```

## 🤝 Contributions Are Welcome!

Feel free to contribute and help us improve Simethesia:

- Open issues or submit a pull request with improvements
- Report bugs or suggest new features
- Create new patient profiles or clinical challenge scenarios
- Improve documentation or enhance the simulation code

---

## 📧 Contact

Questions or suggestions? Get in touch with:

- **João Victor Bezerra da Silva**  
  [LinkedIn](https://www.linkedin.com/in/joaovictorbezerra-dev)




