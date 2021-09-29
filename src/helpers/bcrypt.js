const bcrypt = require('bcrypt')

const encryp = async (password) => {
    return bcrypt.hash(password, 10)
  }
  
  const compare = async function (plainPassword, password) {
    return bcrypt.compare(plainPassword, password)
  }

module.exports = {
    encryp,
    compare
}


