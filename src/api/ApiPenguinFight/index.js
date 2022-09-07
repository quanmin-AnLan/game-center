import Http from '../../services/index'

const baseApi = '/PenguinFight'

const apis = {
  getUpgradeInfo: () => Http.get(`${baseApi}/getUpgradeInfo`)
}

export default apis