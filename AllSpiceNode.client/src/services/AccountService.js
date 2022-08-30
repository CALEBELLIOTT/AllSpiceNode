import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async setActiveAccount(id) {
    let res = await api.get('account/' + id)
    AppState.activeProfile = res.data
  }

  async getAccountRecipes(id) {
    let res = await api.get('account/' + id + '/recipes')
    AppState.activeProfileRecipes = res.data
  }

  async getAccountReviews(id) {
    let res = await api.get('account/' + id + '/reviews')
    AppState.activeProfileReviews = res.data
  }

}

export const accountService = new AccountService()
