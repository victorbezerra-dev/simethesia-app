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

### > ⚙️ Desenvolvido com:
>   - **React Native 0.76.5** com **Expo SDK 52**
>   - **Redux Toolkit** e **Zustand** para gerenciamento de estado
>   - **Bluetooth Serial** com `react-native-bluetooth-classic`
>   - **Skia** (Shopify) para gráficos de alto desempenho
>   - **Lottie** para animações responsivas
>   - **Victory Native** para visualização de dados clínicos
>   - **Tailwind CSS com NativeWind** para estilização produtiva
>   - **Rive** para UI interativa
>   - **react-native-fs** e **expo-sharing** para salvar/compartilhar simulações
>   - **Jest + Jest-Expo** para testes automatizados

> - **Redux Toolkit** é amplamente adotado quando há necessidade de:
      - Compartilhamento de estado global entre muitos módulos
      - Middleware para efeitos colaterais complexos
      - Debugging avançado com devtools
>  -❗ **No entanto**, no contexto do Simethesia, com escopo modular e estados locais bem definidos, o **Zustand seria o suficiente para toda a aplicação**. Sua simplicidade, performance e integração direta com hooks tornam o código mais limpo e eficiente.
    - A coexistência dos dois no projeto serve apenas como **exercício técnico comparativo**. Em produção, a recomendação seria focar em **Zustand** para este tipo de aplicação.
---

## 📱 Download do APK

Baixe a versão mais recente para Android:

👉 [**Download Simethesia APK**]


---

## 🎥 Vídeo Demonstrativo

Assista a uma demonstração completa do aplicativo:

[![Assista no YouTube](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

## 🚀 Como Rodar Localmente

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

## 📡 Conexão Bluetooth (Importante!)

Atualmente, o **Simethesia app conecta automaticamente ao primeiro dispositivo Bluetooth pareado** encontrado.

⚠️ **Recomendação:**  
Certifique-se de que **apenas o celular e o seu computador (desktop)** estejam pareados no momento da conexão. Isso evita que o app se conecte a dispositivos indesejados.

✅ **Melhoria futura planejada:**  
Estamos desenvolvendo uma interface para **seleção manual do dispositivo Bluetooth**, tornando o processo mais amigável, confiável e intuitivo.

## 📂 Estrutura Modular

O app segue uma estrutura modular por feature:

```
modules/
├─ splash_screen/
├─ home/
├─ simulation/
├─ results/
├─ simulation_settings/
└─ shared/
```

## 🤝 Contributions are welcome! Help us grow by:
- Sinta-se à vontade para contribuir! Abra uma issue ou envie um PR com melhorias.
- Reporting issues or suggesting new features
- Creating new patient profiles or clinical scenarios
- Improving documentation or enhancing the simulation code


## 📧 Contato
Dúvidas ou sugestões? Entre em contato com:

- João Victor Bezerra da Silva

    - [Linkedin](www.linkedin.com/in/joaovictorbezerra-dev)



