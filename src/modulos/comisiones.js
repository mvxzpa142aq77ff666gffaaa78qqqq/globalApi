function Comisiones(valor, typeUser,porcentage) {
    console.log(typeUser ,porcentage,"ppppppppppppppppppppppppppppppppppppp")
    if (typeUser === "Master_GNOB") {
      try {
        if (Number(valor)) {
          let ivaP = 15
          let isPE = porcentage
          let isPR = porcentage
          let summ = isPE+isPR+ivaP
          let igP = 100 -(summ)

          if (valor <= 999) {
            return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
          }
          if (valor >= 1000 && valor <= 25000) {
            let comision = 500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100

            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 25001 && valor <= 45000) {
            let comision = 1000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 45001 && valor <= 85000) {
            let comision = 2000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 85001 && valor <= 160000) {
            let comision = 2500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 160001 && valor <= 250000) {
            let comision = 3000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 250001 && valor <= 350000) {
            let comision = 3500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 350001 && valor <= 400000) {
            let comision = 4000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 400001 && valor <= 500000) {
            let comision = 6000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 500001 && valor <= 750000) {
            let comision = 7000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 750001 && valor <= 900000) {
            let comision = 9000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 900001 && valor <= 1200000) {
            let comision = 11000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1200001 && valor <= 1500000) {
            let comision = 16000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1500001 && valor <= 2000000) {
            let comision = 18000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          
        } else {
          return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
        }
      } catch (error) {
        return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
      }
    }
  
  
    if (typeUser === "Master_FINANCIADO") {
    console.log(typeUser ,"aaaaaaaaooooooooooooooooooooooooooooooooooooo")
  
      try {
        if (Number(valor)) {
          let isPE = porcentage
          let isPR = porcentage
          let ivaP = 15
          let summ = isPE+isPR+ivaP
          let igP = 100 -(summ)
          

          if (valor <= 999) {
            return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
          }
          if (valor >= 1000 && valor <= 25000) {
            let comision = 500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100

            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 25001 && valor <= 45000) {
            let comision = 1000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 45001 && valor <= 85000) {
            let comision = 2000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 85001 && valor <= 160000) {
            let comision = 2500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 160001 && valor <= 250000) {
            let comision = 3000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 250001 && valor <= 350000) {
            let comision = 3500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 350001 && valor <= 400000) {
            let comision = 4000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 400001 && valor <= 500000) {
            let comision = 6000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 500001 && valor <= 750000) {
            let comision = 7000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 750001 && valor <= 900000) {
            let comision = 9000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 900001 && valor <= 1200000) {
            let comision = 11000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1200001 && valor <= 1500000) {
            let comision = 16000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1500001 && valor <= 2000000) {
            let comision = 18000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          
        } else {
          return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
        }
      } catch (error) {
        return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
      }
    }
  
    if (typeUser === "Master_PREFINANCIADO") {
      try {
        if (Number(valor)) {
          let isPE = porcentage
          let isPR = porcentage
          let ivaP = 15
          let summ = isPE+isPR+ivaP
          let igP = 100 -(summ)
          

          if (valor <= 999) {
            return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
          }
          if (valor >= 1000 && valor <= 25000) {
            let comision = 500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100

            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 25001 && valor <= 45000) {
            let comision = 1000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 45001 && valor <= 85000) {
            let comision = 2000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 85001 && valor <= 160000) {
            let comision = 2500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 160001 && valor <= 250000) {
            let comision = 3000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 250001 && valor <= 350000) {
            let comision = 3500
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 350001 && valor <= 400000) {
            let comision = 4000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 400001 && valor <= 500000) {
            let comision = 6000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 500001 && valor <= 750000) {
            let comision = 7000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 750001 && valor <= 900000) {
            let comision = 9000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 900001 && valor <= 1200000) {
            let comision = 11000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1200001 && valor <= 1500000) {
            let comision = 16000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          if (valor >= 1500001 && valor <= 2000000) {
            let comision = 18000
  
            let ig = (comision * igP) / 100
            let isE = (comision * isPE) / 100
            let isR = (comision * isPR) / 100
            let iva = (comision * ivaP) / 100
  
  
            return ({ "verificar": true, "ig": ig, "isE": isE, "iva": iva, "isR": isR, "total": ig + isE + isR + iva })
          }
          
        } else {
          return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
        }
      } catch (error) {
        return ({ "verificar": false, "ig": 0, "isE": 0, "iva": 0, "isR": 0, "total": 0 })
      }
    }
  }
  
  module.exports = Comisiones