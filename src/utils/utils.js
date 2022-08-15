import apis from '@/api'

const routerReport = (to) => {
  let spmC = ''
  if (to.path === '/') {
    spmC = 'home'
  } else {
    const baseSpmC = to.path.split('/')
    if (baseSpmC[0] === '') {
      baseSpmC.shift()
    }
    const end = baseSpmC[baseSpmC.length - 1]
    var n = Number(end);
    if (!isNaN(n) && n !== 404) {
      baseSpmC.pop()
    }
    spmC = baseSpmC.join('-')
  }
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const params = {
    setDate: `${year}/${month}/${day}`,
    spm: `smpc.anlan-game.${spmC}`
  }
  apis.reportPV(params)
}

export const utils = {
  routerReport
}