import type { NavigationItem } from './NavigationItem/types'

export const NAVIGATION_LIST: NavigationItem[] = [
  {
    title: 'Informações do Mercado',
    items: [
      {
        id: 'edit-info',
        label: 'Editar Informações'
      },
      {
        id: 'edit-categories',
        label: 'Editar categorias'
      },
      {
        id: 'edit-products',
        label: 'Editar Produtos'
      },
      {
        id: 'see-as-user',
        label: 'Visualizar como usuário'
      }
    ]
  },
  {
    title: 'Dashboards & Analytics',
    items: [
      {
        id: 'customers',
        label: 'Clientes'
      },
      {
        id: 'products',
        label: 'Produtos'
      },
      {
        id: 'general',
        label: 'Geral'
      }
    ]
  },
  {
    title: 'Outras Informações',
    items: [
      {
        id: 'terms-of-use',
        label: 'Termos de Uso'
      },
      {
        id: 'faq',
        label: 'Perguntas Frequentes'
      }
    ]
  }
]
