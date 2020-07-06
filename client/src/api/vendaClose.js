import request from '@/utils/request';

export function vendaClose(data) {
  return request({
    url: `/vendaClose`,
    method: 'post',
    data
  });
}
