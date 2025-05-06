const btn1 = document.querySelector('#btn-1')
const btn2 = document.querySelector('#btn-2')
const wrapper = document.querySelector('#fetch-result-wrapper')
const error = document.querySelector('#error-result-wrapper')
btn1.addEventListener('click', async () => {
  wrapper.innerHTML = ''
  error.innerHTML = ''
  console.log('click~~')
  try {
    const res = await fetch('http://localhost:3000/foo', {
      method: 'put',
      // 复杂请求，当跨域时，浏览器会自动发送一个options请求
      headers: {
        fx: 'xxxx',
      },
    })
    const text = await res.text()
    wrapper.innerHTML = text
  } catch (e) {
    error.innerHTML = e.stack
  }
})
btn2.addEventListener('click', async () => {
  wrapper.innerHTML = ''
  error.innerHTML = ''
  console.log('click~~')
  try {
    const res = await fetch('/api/foo', {
      method: 'put',
      // 复杂请求，当跨域时，浏览器会自动发送一个options请求
      headers: {
        fx: 'xxxx',
      },
    })
    const text = await res.text()
    wrapper.innerHTML = text
  } catch (e) {
    error.innerHTML = e.stack
  }
})
