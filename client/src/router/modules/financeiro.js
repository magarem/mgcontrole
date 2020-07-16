/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financeiroRouter = {
  path: '/financeiro',
  component: Layout,
  redirect: '/financeiro',
  name: 'Financeiro',
  meta: {
    title: 'Financeiro',
    icon: 'table'
  },
  children: [
    {
      path: 'financeiro',
      component: () => import('@/views/financeiro/livro_caixa'),
      name: 'Livro caixa',
      meta: { title: 'Livro caixa' }
    }
  ]
}
export default financeiroRouter
