export interface Mesa {
  id: number;
  numero: string;
  capacidade: number;
  status: 'ocupada' | 'disponivel' | 'reservada';
  detalhesReserva?: string;
  localizacao?: string;
}
