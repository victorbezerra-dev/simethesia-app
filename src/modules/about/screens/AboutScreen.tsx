import { ScrollView, Text, Image, useWindowDimensions, TouchableOpacity, Linking, View } from 'react-native';

export default function AboutScreen() {
    const { width } = useWindowDimensions();

    const openGitHub = () => {
        Linking.openURL('https://github.com/victorbezerra-dev/simethesia-lab');
    };

    return (
        <ScrollView className="flex-1 bg-[#02101F] px-5 py-6">
            <Text className="text-white text-2xl font-bold mb-2 text-center">Sobre o Simethesia</Text>
            <Text className="text-white/60 text-[14px] text-center mb-4">Versão 1.0.0</Text>

            <Text className="text-white/90 text-base text-justify mb-4">
                O <Text className="text-white font-semibold">Simethesia</Text> é um simulador educacional de anestesia desenvolvido com base em modelos farmacocinéticos e farmacodinâmicos (PK/PD). A proposta do app é criar um ambiente interativo e realista para o estudo de leis de controle utilizando hardware-in-the-loop (HIL), com foco na resposta do paciente a eventos como hemorragia, vasodilatação e uso de drogas vasoativas.
                {'\n\n'}
                Além de simular os efeitos anestésicos em tempo real, o aplicativo permite configurar perfis personalizados de pacientes e aplicar desafios clínicos que alteram dinamicamente o comportamento do sistema — tudo isso de forma intuitiva e acessível, mesmo fora de um centro de simulação tradicional.
            </Text>

            <Text className="text-white text-lg font-semibold mb-2">Autores</Text>
            {[
                {
                    name: 'João Victor Bezerra da Silva',
                    email: 'joaovictorbezerra.dev@gmail.com',
                    isDeveloper: true,
                    linkedin: 'www.linkedin.com/in/joaovictorbezerra-dev',
                },
                {
                    name: 'Daniele da Silva Santos',
                    email: 'danieleesantos0908@gmail.com',
                },
                {
                    name: 'Jonathan Silva Nascimento',
                    email: 'jonathansanches359@gmail.com',
                },
                {
                    name: 'Rafael Pissinati de Souza',
                    email: 'rafael.pissinati@ifro.edu.br',
                },
                {
                    name: 'José Diogo Forte de Oliveira Luna (Orientador de Pesquisa)',
                    email: 'jose.luna@ifro.edu.br',
                },
            ].map((author, index) => (
                <View key={index} className="mb-4">
                    <Text className="text-white font-medium">
                        {author.name}
                        {author.isDeveloper && ' (Desenvolvedor)'}
                    </Text>
                    <Text className="text-white/70 text-sm">{author.email}</Text>
                    <Text className="text-white/50 text-sm mb-1">Instituto Federal de Rondônia, RO</Text>

                    {author.isDeveloper && author.linkedin && (
                        <TouchableOpacity onPress={() => Linking.openURL(author.linkedin)}>
                            <View className='flex-row'>
                                <Text className="text-white/80 text-sm">LinkedIn:{' '}</Text>
                                <Text className="text-white/80 text-sm underline">{author.linkedin}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <Text className="text-white text-lg font-semibold mb-2">Repositório no GitHub</Text>
            <TouchableOpacity onPress={openGitHub} className="items-center mb-6">
                <Image
                    source={require('@/assets/images/github-plataform-hil.png')} // troque pela imagem real
                    style={{ width: width * 0.5, height: width * 0.5, resizeMode: 'contain' }}
                />
                <Text className="text-white/80 text-sm mt-2 underline">Abrir repositório</Text>
            </TouchableOpacity>

            <Text className="text-white text-lg font-semibold mb-2">Tecnologias Utilizadas</Text>
            {[
                'React Native - Interface moderna e responsiva',
                'Arduino + Bluetooth Serial - Integração com hardware real',
                'Modelos PK/PD - Simulação farmacológica realista',
                'Simulação em tempo real - Resposta contínua do paciente virtual',
                'Redux & Zustand - Gerenciamento de estado modular e eficiente',
                'Reanimated + Skia - Gráficos fluidos e precisos para visualização dos sinais vitais',
            ].map((item, index) => (
                <Text key={index} className="text-white/80 text-sm mb-1">• {item}</Text>
            ))}

            <View className="mb-10" />
        </ScrollView>
    );
}
