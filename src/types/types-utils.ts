import { Database } from '@/types/supabase';

type CallTypeComplete = Database['public']['Tables']['calls']['Row']; //"Pegue o tipo 'Row' da tabela 'calls' que está em 'public'" (pega todos os tipos das colunas basicamente)

// Seleciono só os tipos das colunas que eu realmente vou usar, ao invés de pegar o tipo de todas as colunas
export type CallTypeUtils = Pick<
  CallTypeComplete,
  'id' | 'reason' | 'status' | 'required_department'
>;

// os tipos dos itens que estão no dashboard
export type Dashboards = { id: string; titulo: string; valor: string };
