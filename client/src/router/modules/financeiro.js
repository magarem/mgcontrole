/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financeiroRouter = {
  path: '/financeiro',
  component: Layout,
  redirect: '/financeiro',
  name: 'Financeiro',
  meta: {
    title: 'Financeiro',
    icon: 'table',
    roles: ['admin', 'cliente']
  },
  children: [
    {
      path: 'livro_caixa',
      component: () => import('@/views/financeiro/livro_caixa'),
      name: 'Livro caixa',
      meta: { title: 'Livro caixa',
        roles: ['admin'] }
    },
    {
      path: 'clientes_contas',
      component: () => import('@/views/financeiro/clientes_contas'),
      name: 'clientes_contas',
      meta: { title: 'Clientes contas',
      roles: ['admin', 'cliente'] }
    }
  ]
}
export default financeiroRouter
