import { router } from '@/router.js'
// import { sessions, accounts } from '@/common/resources.js'
import Vue from 'vue'
import { Message } from 'element-ui'

const MockUser = {
  account: {
    name: 'Demo账户',
    email: 'demo@ktjr.com',
    password: 'kaitong1'
  }
}

export default {
  updateUser: function({ commit }, user = {}) {
    window.localStorage.user = JSON.stringify(user)
    commit('updateUser', user)
  },

  updateToken({ commit }, token = '') {
    window.localStorage.token = token
    Vue.http.headers.common['Authorization'] = token
    commit('updateToken', token)
  },

  async getUser({ commit, dispatch }) {
    // const data = await accounts.get().then(res => res.json())
    const data = await Promise.resolve(MockUser)
    dispatch('updateUser', data.account)
    return data
  },

  async login({ commit, dispatch }, user) {
    // const data = await sessions.save({}, user).then(res => res.json())
    const data = await new Promise((resolve, reject) => {
      if (user.email === MockUser.account.email && user.password === MockUser.account.password) {
        setTimeout(() => {
          resolve({ token: 'demo-user-is-good' })
        }, 1000)
      } else {
        Message.error('用户名或密码错误')
        reject(null)
      }
    })
    dispatch('updateToken', data.token)
    dispatch('getUser')
    return data
  },

  logout({ commit }, silent) {
    window.localStorage.user = '{}'
    window.localStorage.token = ''
    commit('updateUser', {})
    commit('updateToken')

    if (silent) return

    router.push({
      name: 'login'
    })
  }
}
