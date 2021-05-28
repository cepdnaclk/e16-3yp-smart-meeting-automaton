var acState = new Map();
var proState = new Map();

function getStateAc(id) {
  // console.log(id);
  return acState[id];
}
function getStatePro(id) {
  return proState[id];
}

function acStateOperation(state, id) {
  if (state) {
    //
    // console.log(acState);
    acState[id] = true;
    // console.log(acState);
  } else {
    //
    // console.log(acState);
    acState[id] = false;
    // console.log(acState);
  }
}
function proStateOperation(state, id) {
  if (state) {
    //
    // console.log(proState);
    proState[id] = true;
    // console.log(proState);
  } else {
    //
    // console.log(proState);
    proState[id] = false;
    // console.log(proState);
  }
}

module.exports = {
  acStateOperation,
  proStateOperation,
  getStateAc,
  getStatePro,
};
