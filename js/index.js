import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

const viewerApi = new VctrApi("c753addb-c451-4984-9c15-edbb711507dc");

async function run() {
  await viewerApi.init();
  console.log("Objects", await viewerApi.getObjects());
  const allSceneMaterials = await viewerApi.getMaterials();
  console.log("Materials", allSceneMaterials);

  let updatedMaterial = {
    emissiveIntensity: 2.5,
    color: '#ffffff'
  }
  viewerApi.updateMaterial("Material", updatedMaterial);
  viewerApi.updateMaterial("Material 2", updatedMaterial);

  viewerApi.setVisibility("Schirm_1_P", false, false);
  viewerApi.setVisibility("Schirm_3_P", false, false);
  viewerApi.setVisibility("Beine_1_P", false, false);

  document.getElementById("col-option-1").addEventListener("click", handleMaterialSchirmChange);
  document.getElementById("col-option-2").addEventListener("click", handleMaterialSchirmChange);
  document.getElementById("col-option-3").addEventListener("click", handleMaterialSchirmChange);
  document.getElementById("col-option-4").addEventListener("click", handleMaterialSchirmChange);
  document.getElementById("col-option-5").addEventListener("click", handleMaterialSchirmChange);

  document.getElementById("mat-option-1").addEventListener("click", handleMaterialFussChange);
  document.getElementById("mat-option-2").addEventListener("click", handleMaterialFussChange);

  document.getElementById("form-option-1").addEventListener("click", handleFormChange);
  document.getElementById("form-option-2").addEventListener("click", handleFormChange);
  document.getElementById("form-option-3").addEventListener("click", handleFormChange);

  document.getElementById("fuss-option-1").addEventListener("click", handleFussChange);
  document.getElementById("fuss-option-2").addEventListener("click", handleFussChange);

  await collectMenus()
}

run();

async function collectMenus() {
  for (let menu of document.getElementsByClassName('menu-button')) {
    menu.addEventListener('click', handleSelectedELem)
  }
}

let hals1B = []

function handleFussChange(elem) {
  console.log(elem.target.id)
  if (elem.target.id == 'fuss-option-1') {
    viewerApi.setVisibility("Beine_1_P", true, false);
    viewerApi.setVisibility("Beine_2_P", false, false);

  }
  else if (elem.target.id == 'fuss-option-2') {
    viewerApi.setVisibility("Beine_1_P", false, false);
    viewerApi.setVisibility("Beine_2_P", true, false);
  }

}

function handleFormChange(elem) {
  console.log(elem.target.id)
  if (elem.target.id == 'form-option-1') {
    viewerApi.setVisibility("Schirm_1_P", true, false);
    viewerApi.setVisibility("Schirm_2_P", false, false);
    viewerApi.setVisibility("Schirm_3_P", false, false);

  }
  else if (elem.target.id == 'form-option-2') {
    viewerApi.setVisibility("Schirm_1_P", false, false);
    viewerApi.setVisibility("Schirm_2_P", true, false);
    viewerApi.setVisibility("Schirm_3_P", false, false);
  }
  else if (elem.target.id == 'form-option-3') {
    viewerApi.setVisibility("Schirm_1_P", false, false);
    viewerApi.setVisibility("Schirm_2_P", false, false);
    viewerApi.setVisibility("Schirm_3_P", true, false);
  }

}

let woodMat = "Material 6"
let goldMat = "Material 5"
function handleMaterialFussChange(elem) {
  console.log(elem.target.id)
  if (elem.target.id == "mat-option-1") {
    viewerApi.setMaterial("base", goldMat);
    viewerApi.setMaterial("base_obj", goldMat);
    viewerApi.setMaterial("hals_obj", woodMat);
    viewerApi.setMaterial("gold_up", goldMat);
    viewerApi.setMaterial("gold_down", goldMat);
    viewerApi.setMaterial("gold_Cylinder", goldMat);
    viewerApi.setMaterial("gold_rect", goldMat);


  }

  else if (elem.target.id == 'mat-option-2') {
    viewerApi.setMaterial("base", woodMat);
    viewerApi.setMaterial("base_obj", woodMat);
    viewerApi.setMaterial("hals_obj", goldMat);
    viewerApi.setMaterial("gold_up", woodMat);
    viewerApi.setMaterial("gold_down", woodMat);
    viewerApi.setMaterial("gold_Cylinder", woodMat);
    viewerApi.setMaterial("gold_rect", woodMat);
  }

}

function handleMaterialSchirmChange(elem) {
  console.log(elem.target.id)
  let optionElem = elem.target.children[0]
  let optionColor = window.getComputedStyle(optionElem).getPropertyValue("background-color")
  console.log(optionColor)

  let updatedMaterial = {
    color: rgb2hex(optionColor)
  }
  viewerApi.updateMaterial("Material", updatedMaterial);
  viewerApi.updateMaterial("Material 2", updatedMaterial);

  //change bakground
  var newBgColor = window.getComputedStyle(optionElem).getPropertyValue("color");
  console.log(newBgColor) 
  viewerApi.setBackground(HEX2RGB(rgb2hex(newBgColor)))

}

function handleSelectedELem(elem) {
  //console.log(elem.target)
  //get number of siblings
  let siblingsCount = elem.target.parentNode.children
  for (let i = 0; i < siblingsCount.length; i++) {
    if (siblingsCount[i].id == elem.target.id) {
      siblingsCount[i].classList.add('selected')
    }
    else {
      siblingsCount[i].classList.remove('selected')
    }
  }

}
function rgb2hex(rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function LightenDarkenColor(col, amt) {

  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


function HEX2RGB (hex) {
  "use strict";
  if (hex.charAt(0) === '#') {
      hex = hex.substr(1);
  }
  if ((hex.length < 2) || (hex.length > 6)) {
      return false;
  }
  var values = hex.split(''),
      r,
      g,
      b;

  if (hex.length === 2) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = r;
      b = r;
  } else if (hex.length === 3) {
      r = parseInt(values[0].toString() + values[0].toString(), 16);
      g = parseInt(values[1].toString() + values[1].toString(), 16);
      b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = parseInt(values[2].toString() + values[3].toString(), 16);
      b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
      return false;
  }
  return [r, g, b];
}