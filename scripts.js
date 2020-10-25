////////////////////////////////////////
//////// CALCULATE TAXES SCRIPT ////////
////////////////////////////////////////
function calcTaxes() {
    const ficaRates = [0.0765, 0.0145, 0.0235];
    let ficaRate;
    let ficaMarginalRate = document.getElementById('fica-marg-rate');
    let ficaEffectiveRate = document.getElementById('fica-effec-rate');
    
    
    let fedDeduc, stateDeduc, taxable, margRate, fedTax, fedEffecRate;
    let income = document.getElementById('income').value;
    console.log('Whats up player');
    const fica = income * ficaRate;

    
    console.log(income);
    let fedTotal = document.getElementById('fed-total');
    let fedMarginalRate = document.getElementById('fed-marg-rate');
    let fedEffectiveRate = document.getElementById('fed-effec-rate');

    let ficaTotal = document.getElementById('fica-total');

    let fileStatus = document.getElementsByClassName('select-selected')[0].innerHTML;
    let dependents = document.getElementsByClassName('select-selected')[1].innerHTML;

    let stateDepDeduc = (dependents - 1) * 2000;
    console.log(fileStatus);
    console.log(dependents);
    if(fileStatus === 'Single') {
        fedDeduc = income - 12200;
        stateDeduc = fedDeduc + ((dependents - 1) * 4000);
        fedTotal.innerHTML = `$${(income - 12000) * 0.1}`;

        if(fedDeduc > 518401) {
            margRate = 0.37;
            taxable = fedDeduc - 518401;
            fedTax = taxable * margRate + 156235;
            fedEffecRate = (fedTax / income * 100).toFixed(2);
            fedTotal.innerHTML = `$${fedTax}`;
            fedMarginalRate.innerHTML = `${margRate * 100}%`;
            fedEffectiveRate.innerHTML = `${fedEffecRate}%`;
        } else if(fedDeduc > 207351) {
            margRate = 0.35;
            taxable = fedDeduc - 207351;
            fedTax = taxable * margRate + 47367.50;
            fedEffecRate = (fedTax / income * 100).toFixed(2);
            fedTotal.innerHTML = `$${fedTax}`;
            fedMarginalRate.innerHTML = `${margRate * 100}%`;
            fedEffectiveRate.innerHTML = `${fedEffecRate}%`;
        }


        if(income > 200000) {
            ficaRate = 0.0235;
        } else if(income > 137701) {
            ficaRate = 0.0145;
        } else {
            ficaRate = 0.0765;
        }

        let ficaMargAndEffec = (ficaRate * 100).toFixed(2);
        ficaMarginalRate.innerHTML = `${ficaMargAndEffec}%`;
        ficaTotal.innerHTML = `$${income * ficaRate}`;
        ficaEffectiveRate.innerHTML = `${ficaMargAndEffec}%`
    }
}



////////////////////////////////////////
///////// DROPDOWN MENU SCRIPT /////////
////////////////////////////////////////
let dropdownContainer = document.getElementsByClassName("dropdown-container");

for (let i = 0; i < dropdownContainer.length; i++) {
    let selectElement = dropdownContainer[i].getElementsByTagName("select")[0];
    let selectedItemDiv = document.createElement("DIV");
    selectedItemDiv.setAttribute("class", "select-selected");
    selectedItemDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    dropdownContainer[i].appendChild(selectedItemDiv);
    
    let dropdownItemsDiv = document.createElement("DIV");
    dropdownItemsDiv.setAttribute("class", "select-items select-hide");
    
    for(let j = 1; j < selectElement.length; j++){
        let dropdownItem = document.createElement("DIV");
        dropdownItem.innerHTML = selectElement.options[j].innerHTML;
        dropdownItem.addEventListener("click", function(e) {
            let selectEl = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let selectedItemD = this.parentNode.previousSibling;
            for(let i = 0; i < selectEl.length; i++) {
                if (selectEl.options[i].innerHTML == this.innerHTML) {
                    selectEl.selectedIndex = i;
                    selectedItemD.innerHTML = this.innerHTML;
                    let sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
                    for (let k = 0; k < sameAsSelected.length; k++) {
                        sameAsSelected[k].removeAttribute("class");
                    }

                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }

            selectedItemD.click();
        });
        dropdownItemsDiv.appendChild(dropdownItem);
    }

    dropdownContainer[i].appendChild(dropdownItemsDiv);
    selectedItemDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        this.classList.toggle("hide-border-bottom");
    });
}

function closeAllSelect(elmnt) {
    let dropdownItemsDiv = document.getElementsByClassName("select-items");
    let selectedItemDiv = document.getElementsByClassName("select-selected");
    let tempArr = [];
    for (let i = 0; i < selectedItemDiv.length; i++) {
        if (elmnt == selectedItemDiv[i]) {
            tempArr.push(i)
        } else {
            selectedItemDiv[i].classList.remove("select-arrow-active");
            selectedItemDiv[i].classList.remove("hide-border-bottom");
        }
    }
    for (let i = 0; i < dropdownItemsDiv.length; i++) {
        if (tempArr.indexOf(i)) {
            dropdownItemsDiv[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);
