/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const cadastrosRouter = {
  path: '/cadastros',
  component: Layout,
  redirect: '/cadastros',
  name: 'Cadastros',
  meta: {

    title: 'Cadastros',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/cadastros/info'),
      name: 'info',
      meta: { roles: ['admin'], title: 'Info' }
    },
    {
      path: 'usuarios',
      component: () => import('@/views/cadastros/usuarios'),
      name: 'usuarios',
      meta: { roles: ['admin'], title: 'Usuários' }
    },
    {
      path: 'clientes',
      component: () => import('@/views/cadastros/clientes'),
      name: 'Clientes',
      meta: { roles: ['admin'], title: 'Clientes' }
    },
    {
      path: 'fornecedores',
      component: () => import('@/views/cadastros/fornecedores'),
      name: 'Fornecedores',
      meta: { title: 'Fornecedores' }
    },
    {
      path: 'funcionarios',
      component: () => import('@/views/cadastros/funcionarios'),
      name: 'Funcionarios',
      meta: { title: 'Funcionários' }
    },
    {
      path: 'produtos',
      component: () => import('@/views/cadastros/produtos'),
      name: 'Produtos',
      meta: { title: 'Produtos' }
    }
  ]
}
export default cadastrosRouter
