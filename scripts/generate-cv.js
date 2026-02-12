
import fs from 'node:fs';

const cvData = process.env.CV_DATA;

if (cvData) {
    try {
        const json = JSON.parse(cvData);
        fs.writeFileSync('cv.json', JSON.stringify(json, null, 2));
        console.log('✅ cv.json generado exitosamente desde la variable de entorno CV_DATA.');
    } catch (error) {
        console.error('❌ Error al parsear CV_DATA. Asegúrate de que sea un JSON válido.', error);
        process.exit(1);
    }
} else {
    console.log('ℹ️ No se encontró la variable de entorno CV_DATA. Se usará el cv.json local si existe, o fallará si no.');

    if (!fs.existsSync('cv.json')) {
        console.warn('⚠️ ADVERTENCIA: No existe cv.json local ni variable CV_DATA. El build podría fallar.');
        // Opcional: copiar el template por defecto si no hay nada más
        if (fs.existsSync('cv.template.json')) {
            console.log('ℹ️ Usando cv.template.json como fallback.');
            fs.copyFileSync('cv.template.json', 'cv.json');
        }
    }
}
