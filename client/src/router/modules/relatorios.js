/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const relatoriosRouter = {
  path: '/relatorios',
  component: Layout,
  redirect: '/relatorios',
  name: 'Relatórios',
  meta: {
    title: 'Relatórios',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: 'vendas_total',
      component: () => import('@/views/relatorios/vendas_total'),
      name: 'Clientes-',
      meta: { roles: ['admin'], title: 'Vendas' }
    },
    {
      path: 'caixa',
      component: () => import('@/views/relatorios/relatorio_caixa'),
      name: 'Clientes-',
      meta: { roles: ['admin'], title: 'Caixa' }
    }
  ]
}
export default relatoriosRouter