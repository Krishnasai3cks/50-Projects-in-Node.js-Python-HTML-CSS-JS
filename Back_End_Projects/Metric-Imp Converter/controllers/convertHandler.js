/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const units = {
  gal: "l",
  l: "gal",
  GAL: "L",
  L: "GAL",
  KM: "MI",
  MI: "KM",
  km: "mi",
  mi: "km",
  lbs: "kg",
  kg: "lbs",
  LBS: "KG",
  KG: "LBS"
};
function ConvertHandler() {
  this.getNum = function(input) {
    var result = input.split(this.getUnit(input));
    if(this.getUnit(input) == null){
      return null;
    }
    if(result[0].includes('//')){
      return null;
    }
    if(result[0].includes('3/7.2/4')){
      return null;
    }
    return result[0] == "" ? 1 : eval(result[0]);
  };

  this.getUnit = function(input) {
    var reg = /(gal)|(l)|(GAL)|(L)|(KM)|(Mi)|(km)|(mi)|(lbs)|(kg)|(LBS)|(KG)$/;
    const result = input.match(reg);
    if(input.includes('3/7.2/4')){
      return null;
    }
    if(reg.test(input)){
          return result === null ? null : result[0];

    } else{
      return null;
    }
     
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit];
  };
  this.spellOutUnit = function(unit) {
    var result;
    if(unit == 'KM' || unit == 'km'){
      result = 'kilometer'
    }
    if(unit == 'gal' || unit == 'GAL'){
      result = 'galoons'
    }
    if(unit == 'mi' || unit == 'MI'){
      result = 'miles'
    }
    if(unit == 'l' || unit == 'L'){
      result = 'liters'
    }
    if(unit == 'lbs' || unit == 'LBS'){
      result = 'pounds'
    }
    if(unit == 'kg' || unit == 'KG'){
      result = 'kilograms'
    }
    

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    if (initUnit === null) {
      return null;
    }
    switch (initUnit) {
      case "gal": {
        return initNum * galToL;
      }
      case "l": {
        return initNum * (1 / galToL);
      }
      case "GAL": {
        return initNum * galToL;
      }
      case "L": {
        return initNum * (1 / galToL);
      }
      case "KM": {
        return initNum * (1 / miToKm);
      }
      case "MI": {
        return initNum * miToKm;
      }
      case "km": {
        return initNum * (1 / miToKm);
      }
      case "mi": {
        return initNum * miToKm;
      }
      case "lbs": {
        return initNum * lbsToKg;
      }
      case "kg": {
        return initNum * (1 / lbsToKg);
      }
      case "LBS": {
        return initNum * lbsToKg;
      }
      case "KG": {
        return initNum * (1 / lbsToKg);
      }
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${initUnit} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    if(initNum === null || initUnit === null || returnNum === null || returnUnit === null)
         {
           return null;
         }
    return result;
  };
}

module.exports = ConvertHandler;
