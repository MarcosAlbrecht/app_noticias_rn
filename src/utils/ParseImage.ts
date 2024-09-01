import {ImageDTO} from '../models/ImageDTO';

// Função para remover as barras invertidas e converter a string JSON para o modelo ImageDTO
export function parseImageDTO(imagensString: string): ImageDTO | null {
  try {
    const cleanedImagens = imagensString.replace(/\\/g, '');
    const parsedImagens: ImageDTO = JSON.parse(cleanedImagens);

    return parsedImagens;
  } catch (error) {
    console.error('Erro ao parsear imagens', error);
    return null;
  } finally {
  }
}
