# 🧠 Simethesia

Simethesia é um simulador educacional de anestesia que permite treinar e visualizar efeitos clínicos em tempo real. Projetado para ambientes acadêmicos, o app simula a administração de agentes anestésicos em um paciente virtual, com controle baseado em modelos farmacocinéticos/dinâmicos (PK/PD), interações realistas e monitoramento contínuo de métricas como BIS e dose aplicada.
## 🎯 O que você pode fazer com o Simethesia App

O **Simethesia App** é uma ferramenta educacional interativa que permite aos alunos vivenciarem o controle anestésico de forma prática e realista. Com ele, você pode:

### 👩‍⚕️ Personalizar o Paciente

- Selecionar as características do paciente: **sexo**, **idade**, **peso** e **altura**.
- Escolher o **tempo total da simulação**, adaptando à duração da aula ou do experimento.

### 🧪 Definir Desafios Clínicos

- Ativar eventos como **hemorragia**, **vasodilatação** ou uso de drogas vasoativas, que impactam a dinâmica da simulação.
- Cada desafio afeta parâmetros clínicos em tempo real, exigindo adaptação da estratégia de controle.

### 🎛️ Controlar em Tempo Real com Arduino

- Iniciar a simulação no **Arduino**, que atua como um "paciente virtual" respondendo aos comandos do app via **Bluetooth**.
- Visualizar a simulação em tempo real enquanto os dados são atualizados dinamicamente no app.

### 📊 Acompanhar Gráficos e Métricas Durante a Simulação

- Visualizar gráficos sincronizados como:
  - **BIS (índice de consciência) x Tempo**
  - **Propofol administrado x Tempo**
- Ver o **desafio ativo no momento** e acompanhar outras métricas essenciais do comportamento do paciente.

### ✅ Avaliar Resultados com Métricas Automáticas

Ao final de cada simulação, o aplicativo calcula automaticamente:

- **IAE** – Integral do Erro Absoluto
- **ISE** – Integral do Erro ao Quadrado
- **TCV** – Tempo de Controle Válido

Essas métricas ajudam o aluno a compreender a qualidade do controle e os efeitos clínicos com base nos dados simulados, de forma didática e objetiva.

### 📤 Exportar Dados para Análise Avançada

Na tela de resultados, é possível:

- Exportar todos os dados da simulação em um arquivo **.csv (Excel)**.
- O formato é estruturado como:

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

> ❗ **No entanto**, no contexto do Simethesia, com escopo modular e estados locais bem definidos, o **Zustand seria o suficiente para toda a aplicação**. Sua simplicidade, performance e integração direta com hooks tornam o código mais limpo e eficiente.

> A coexistência dos dois no projeto serve apenas como **exercício técnico comparativo**. Em produção, a recomendação seria focar em **Zustand** para este tipo de aplicação.
---

## 📱 Download do APK

Baixe a versão mais recente para Android:

👉 [**Download Simethesia APK**]


---

## 🎥 Vídeo Demonstrativo

Assista a uma demonstração completa do aplicativo:

[![Assista no YouTube](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

## 🖼️ Imagens do App

![image](https://github.com/user-attachments/assets/afdf00ae-ea5c-4cc5-a9a5-6d260ba3519a)

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



