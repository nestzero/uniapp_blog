import request  from "../utils/request";

export function getHomeTabs(){
  return request({
    url:'/hot/tabs',
    
  })
}

export function getHotListFromTabType(type){
  return request({
    url:'/hot/list',
    data:{
      type
    },
    method:'GET'
  })
}