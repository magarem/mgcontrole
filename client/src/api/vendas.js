import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vendas',
    method: 'get',
    params: query
  })
}

export function fetchList_vendaItens(query) {
  return request({
    url: '/vendaItens',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: '/produto',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/produto',
    method: 'patch',
    data
  })
}
