// src/api/auth.ts
import request from './request';


export const fetchSuperHero = () => {
    return request({url: '/superHero'})
}

export const addSuperHero = (hero) =>{
    return request({url: '/superHero' , method: 'post' , data: hero})
}