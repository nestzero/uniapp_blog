import request from '@/utils/request';

export function getDefaultText(){
  return request({
    url:'/search/default-text'
  })
}

export function getSearchList(){
  return request({
    url:'/search/hot-list'
  })
}

export function getSearchResult(data){
  return request({
    url:'/search',
    data
  })
}