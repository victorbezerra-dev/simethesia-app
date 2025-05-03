import { SimulationSample } from "@/shared/models/SimulationSample";
import Toast from "react-native-toast-message";
import RNFS from 'react-native-fs';


function pad(n: number) {
    return n.toString().padStart(2, '0');
}

function getFilename() {
    const now = new Date();
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    return `simethesia_${ts}.csv`;
}


export async function exportSimulationToDownloads(samples: SimulationSample[]) {
    if (!samples.length) {
        Toast.show({
            type: 'info',
            text1: 'Nenhum dado a exportar',
        });
        return;
    }

    const header = 'TIMESTAMP,BIS,PROPOFOL';
    const body = samples
        .map(s => `${s.timestamp.toFixed(4)},${s.BISValue.toFixed(2)},${s.infusionRate.toFixed(2)}`)
        .join('\n');

    const content = `${header}\n${body}`;
    const filename = getFilename();
    const downloadsPath = '/storage/emulated/0/Download/SimethesiaResults';

    try {
        const dirExists = await RNFS.exists(downloadsPath);
        if (!dirExists) {
            await RNFS.mkdir(downloadsPath);
        }

        const fullPath = `${downloadsPath}/${filename}`;
        await RNFS.writeFile(fullPath, content, 'utf8');

        Toast.show({
            type: 'success',
            text1: 'Exportado com sucesso',
            text2: `Arquivo salvo em Downloads/SimethesiaResults`,
            position: 'bottom',
        });
    } catch (err) {
        console.error('Erro ao salvar arquivo:', err);
        Toast.show({
            type: 'error',
            text1: 'Erro ao exportar',
            text2: String(err),
        });
    }
}