//funçao para formatar a data no formato 24/03/2004 sem a hora

export const formatDateAndTime = (dateTimeString: string) => {
  // Verifica se o argumento é uma string não vazia
  if (!dateTimeString || typeof dateTimeString !== 'string') {
    return 'Data inválida';
  }

  // Extrai a parte da data da string
  const [datePart] = dateTimeString.split(' ');

  // Divide o dia, mês e ano
  const [day, month, year] = datePart.split('/').map(Number);

  // Verifica se a data é válida
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return 'Data inválida';
  }

  // Cria uma nova instância de Date com base no formato esperado
  const date = new Date(year, month - 1, day);

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  // Formata o dia, mês e ano
  const formattedDay = String(date.getDate()).padStart(2, '0');
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};
