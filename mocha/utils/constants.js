const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxld2lzaGFtaWx0b25AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.A5O55FigiHApipLgVnVwQg9sg9dNa-740TIjA0uD10E';

const ADD_USER_BODY = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const ADD_USER_BODY_WITHOUT_PASSWORD = {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

module.exports = {
  TOKEN,
  ADD_USER_BODY,
  ADD_USER_BODY_WITHOUT_PASSWORD
}