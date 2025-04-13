import type { NavigationItem } from './NavigationItem/types'

export const NAVIGATION_LIST: NavigationItem[] = [
  {
    title: 'Informações do Mercado',
    items: [
      {
        id: 'editar-informacoes',
        label: 'Editar Informações'
      },
      {
        id: 'categorias',
        label: 'Editar categorias'
      },
      {
        id: 'produtos',
        label: 'Editar Produtos'
      },
      {
        id: 'visualizar',
        label: 'Visualizar como usuário'
      }
    ]
  },
  {
    title: 'Dashboards & Analytics',
    items: [
      {
        id: 'clientes',
        label: 'Clientes'
      },
      {
        id: 'analytics',
        label: 'Analytics'
      },
      {
        id: 'geral',
        label: 'Geral'
      }
    ]
  },
  {
    title: 'Outras Informações',
    items: [
      {
        id: 'termos-de-uso',
        label: 'Termos de Uso'
      },
      {
        id: 'faq',
        label: 'Perguntas Frequentes'
      }
    ]
  }
]
