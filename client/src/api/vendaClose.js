import request from '@/utils/request';
import { server } from './generic';

export function vendaClose(data) {
  return request({
    url: `${server}/vendaClose`,
    method: 'post',
    data
  });
}
