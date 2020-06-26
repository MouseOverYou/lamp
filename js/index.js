import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

const viewerApi = new VctrApi("c753addb-c451-4984-9c15-edbb711507dc");

async function run() {
  await viewerApi.init();
  console.log("Objects", await viewerApi.getObjects());
  const allSceneMaterials = await viewerApi.getMaterials();
  console.log("Materials", allSceneMaterials);

  viewerApi.setPositionAbsolute("Schirm_1_P", [0.0, 0, 0.0]);
  viewerApi.setPositionAbsolute("Schirm_3_P", [0.0, 0, 0.0]);
  viewerApi.setPositionAbsolute("Beine_1_P", [0.0, 0, 0.0]);

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

async function collectMenus(){
  for(let menu of document.getElementsByClassName('menu-button')){
    menu.addEventListener('click', handleSelectedELem)
  }
}
function handleFussChange(elem){
  console.log(elem.target.id)
  if(elem.target.id == 'fuss-option-1'){
    viewerApi.setVisibility("Beine_1_P", true, false);
    viewerApi.setVisibility("Beine_2_P", false, false);

  }
  else if(elem.target.id == 'fuss-option-2'){
    viewerApi.setVisibility("Beine_1_P", false, false);
    viewerApi.setVisibility("Beine_2_P", true, false);
  }

}

function handleFormChange(elem){
  console.log(elem.target.id)
  if(elem.target.id == 'form-option-1'){
    viewerApi.setVisibility("Schirm_1_P", true, false);
    viewerApi.setVisibility("Schirm_2_P", false, false);
    viewerApi.setVisibility("Schirm_3_P", false, false);

  }
  else if(elem.target.id == 'form-option-2'){
    viewerApi.setVisibility("Schirm_1_P", false, false);
    viewerApi.setVisibility("Schirm_2_P", true, false);
    viewerApi.setVisibility("Schirm_3_P", false, false);
  }
  else if(elem.target.id == 'form-option-3'){
    viewerApi.setVisibility("Schirm_1_P", false, false);
    viewerApi.setVisibility("Schirm_2_P", false, false);
    viewerApi.setVisibility("Schirm_3_P", true, false);
  }

}


function handleMaterialFussChange(elem){
  console.log(elem.target.id)
  if(elem.target.id == "mat-option-1"){
    viewerApi.setMaterial("gold_Rectangle002", "Material 6");
    viewerApi.setMaterial("Holz_Capsule_0", "Material 3");
    viewerApi.setMaterial("Holz_Capsule_1", "Material 3");
    viewerApi.setMaterial("Holz_Capsule_2", "Material 3");

  }

  else if (elem.target.id == 'mat-option-2'){
    viewerApi.setMaterial("gold_Rectangle002", "Material 7");
    viewerApi.setMaterial("Holz_Capsule_0", "Material 7");
    viewerApi.setMaterial("Holz_Capsule_1", "Material 7");
    viewerApi.setMaterial("Holz_Capsule_2", "Material 7");
  }

}

function handleMaterialSchirmChange(elem){
  console.log(elem.target.id)
  let optionElem = elem.target.children[0]
  let optionColor = window.getComputedStyle(optionElem).getPropertyValue("background-color")
  console.log(optionColor)
  
  let updatedMaterial = {
    emissive: rgb2hex(optionColor)
  }
  viewerApi.updateMaterial("Material", updatedMaterial);
  viewerApi.updateMaterial("Material 2", updatedMaterial);

}

function handleSelectedELem(elem){
  console.log(elem.target)
  //get number of siblings
  let siblingsCount = elem.target.parentNode.children
  for(let i = 0; i<siblingsCount.length; i++){
    if(siblingsCount[i].id == elem.target.id){
      siblingsCount[i].classList.add('selected')
    }
    else{
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
