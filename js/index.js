import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

const viewerApi = new VctrApi("c0ae3aa8-caba-4995-a9be-d632bcb31836");

async function run() {
  await viewerApi.init();
  console.log("Objects", await viewerApi.getObjects());
  viewerApi.setVisibility("Schirm_1_P", false, false);
  viewerApi.setVisibility("Schirm_3_P", false, false);
  viewerApi.setVisibility("Beine_2_P", false, false);

  document.getElementById("form-option-1").addEventListener("click", handleFormChange);
  document.getElementById("form-option-2").addEventListener("click", handleFormChange);
  document.getElementById("form-option-3").addEventListener("click", handleFormChange);

  document.getElementById("fuss-option-1").addEventListener("click", handleFussChange);
  document.getElementById("fuss-option-2").addEventListener("click", handleFussChange);
}

run();


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