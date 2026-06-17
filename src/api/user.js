import client from './client'

export const availability = (data) => {
  return client({
    url: '/api/demo.php',
    method: 'post',
    data,
  })
}

export const login = (data) => {
  return client({
    url: '/api/demo.php',
    method: 'post',
    data,
  })
}
