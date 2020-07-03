import request from '@/utils/request'

export var server = "/dev-api"

export function fetchList(table, query) {
  return request({
    url: server + '/generic?key=' + table, //+ '&q=' + JSON.stringify(query)||null,
    method: 'get',
    params: query
  })
}

export function create(table, data) {
  return request({
    url: `${server}/generic?key=${table}`,
    method: 'post',
    data
  })
}

export function update(table, data) {
  return request({
    url: `${server}/generic?key=${table}`,
    method: 'patch',
    data
  })
}

export function deleteItem(table, data) {
  return request({
    url: `${server}/generic?key=${table}`,
    method: 'delete',
    data
  })
}


