////////////////////////////////////////
//////// CALCULATE TAXES SCRIPT ////////
////////////////////////////////////////
function calcTaxes() {
    let fedDeduc, stateDeduc, taxable, margRate, effecRate, fedTax, ficaRate, stateTax;
    let totalArr = [];
    
    let fedTotal = document.getElementById('fed-total');
    let fedMarginalRate = document.getElementById('fed-marg-rate');
    let fedEffectiveRate = document.getElementById('fed-effec-rate');

    let ficaMarginalRate = document.getElementById('fica-marg-rate');
    let ficaEffectiveRate = document.getElementById('fica-effec-rate');
    let ficaTotal = document.getElementById('fica-total');

    let stateMarginalRate = document.getElementById('state-marg-rate');
    let stateEffectiveRate = document.getElementById('state-effec-rate');
    let stateTotal = document.getElementById('state-total');

    let effectiveRateTotal = document.getElementById('total-effec-rate');
    let totalTax = document.getElementById('total-total');

    let incomeAfterTax = document.getElementById('income-after-tax');

    let income = document.getElementById('income').value;
    let fileStatus = document.getElementsByClassName('select-selected')[0].innerHTML;
    let dependents = (document.getElementsByClassName('select-selected')[1].innerHTML);

    let fedBracket, fedBracketBaseTax;
    let fedBracketMarg = [0.37, 0.35, 0.32, 0.24, 0.22, 0.12, 0.10];
    let stateBracketMarg = [0.049, 0.047, 0.032, 0.017];


    if (fileStatus === 'Single') {
        fedDeduc = income - 12400;
        fedBracket = [518401, 207351, 163301, 85526, 40126, 9876, 0];
        fedBracketBaseTax = [156235, 47367.50, 33271.50, 14605.50, 4617.50, 987.50, 0];

        fedTaxCalc(fedDeduc, fedBracket, fedBracketBaseTax);
    };

    if (fileStatus === 'Married File Seperate') {
        fedDeduc = income - 12400;
        fedBracket = [311026, 207351, 163301, 85526, 40126, 9876, 0];
        fedBracketBaseTax = [83653.75, 47367.50, 33271.50, 14605.50, 4617.50, 987.50, 0];

        fedTaxCalc(fedDeduc, fedBracket, fedBracketBaseTax);
    }

    if (fileStatus === 'Married File Jointly') {
        fedDeduc = income - 24800;
        fedBracket = [622051, 414701, 326601, 171050, 80251, 19751, 0];
        fedBracketBaseTax = [167307.50, 94735, 66543, 29211, 9235, 1975, 0];

        fedTaxCalc(fedDeduc, fedBracket, fedBracketBaseTax);
    }

    if (fileStatus === 'Head of Household') {
        fedDeduc = income - 18650;
        fedBracket = [518401, 207351, 163301, 85501, 53701, 14101, 0];
        fedBracketBaseTax = [154793.50, 45926, 31830, 13158, 6162, 1410, 0];

        fedTaxCalc(fedDeduc, fedBracket, fedBracketBaseTax);
    }

    totalTaxes();

    function fedTaxCalc(fedDeduc, fedBracket, fedBracketBaseTax) {
        if (fedDeduc <= 0) {
            fedDeduc = 0;
        }

        for (let i = 0; i < fedBracket.length; i++) {
            if (fedDeduc >= fedBracket[i]) {
                margRate = fedBracketMarg[i];
                taxable = fedDeduc - fedBracket[i];
                fedTax = taxable * margRate + fedBracketBaseTax[i];
                calc(fedTax, margRate);
                break;
            }

            function calc(fedTax, margRate) {
                effecRate = (fedTax / income * 100).toFixed(2);
                fedMarginalRate.innerHTML = `${margRate * 100}%`;
                fedEffectiveRate.innerHTML = `${effecRate}%`;
                fedTotal.innerHTML = `$${fedTax.toFixed(2)}`;
                totalArr.push(fedTax);
            };
        }

        if (dependents > 1) {
            stateDeduc = fedDeduc - ((dependents - 1) * 4000);
        } else {
            stateDeduc = fedDeduc;
        }

        ficaTaxCalc(fedDeduc);
        stateTaxCalc(stateDeduc);
    }
    

    function stateTaxCalc(stateDeduc) {
        if (stateDeduc <= 0) {
            stateDeduc = 0;
        }

        let stateBracket = [];
        
        let stateBracketBaseTax = [];

        if (fileStatus === 'Single') {
            stateBracket = [16001, 11001, 5501, 0];
            stateBracketBaseTax = [504.50, 269.50, 93.50, 0];
        }

        if (fileStatus === 'Married File Seperate') {
            stateBracket = [12001, 8001, 4001, 0];
            stateBracketBaseTax = [384, 196, 68, 0];
        }

        if (fileStatus === 'Married File Jointly' || 'Head of Household') {
            stateBracket = [24001, 16001, 8001, 0];
            stateBracketBaseTax = [768, 392, 136, 0];
        }

        for (let i = 0; i < stateBracket.length; i++) {
            if (stateDeduc >= stateBracket[i]) {
                margRate = stateBracketMarg[i];
                taxable = stateDeduc - stateBracket[i];
                stateTax = taxable * margRate + stateBracketBaseTax[i];
                calc(stateTax, margRate);
                break; 
            }    
        }

        function calc(stateTax, margRate) {
            effecRate = (stateTax / income * 100).toFixed(2);
            stateMarginalRate.innerHTML = `${(margRate * 100).toFixed(2)}%`;
            stateEffectiveRate.innerHTML = `${effecRate}%`;
            stateTotal.innerHTML = `$${stateTax.toFixed(2)}`;
            totalArr.push(stateTax);
        }
    };

    function ficaTaxCalc(fedDeduc) {
        let cap;

        if (fileStatus === 'Single' || 'Head of Household') {
            cap = 200000;
            calc(cap);
        }

        if (fileStatus === 'Married File Jointly') {
            cap = 250000;
            calc(cap);
        }

        if (fileStatus === 'Married File Seperate') {
            cap = 125000;
            calc(cap);
        }

        function calc(cap) {
            if (fedDeduc > cap) {
                ficaRate = 0.0235;
            } else if (fedDeduc > 137701) {
                ficaRate = 0.0145;
            } else if (fedDeduc > 0) {
                ficaRate = 0.0765;
            } else {
                ficaRate = 0;
            }
        }

        let ficaMargAndEffec = (ficaRate * 100).toFixed(2);
        let total = income * ficaRate;
        ficaMarginalRate.innerHTML = `${ficaMargAndEffec}%`;
        ficaTotal.innerHTML = `$${total}`;
        ficaEffectiveRate.innerHTML = `${ficaMargAndEffec}%`;
        totalArr.push(total);
    };

    function totalTaxes() {
        let totalTotal = totalArr.reduce((a, b) => a + b, 0);
        effectiveRateTotal.innerHTML = `${(totalTotal / income * 100).toFixed(2)}%`;
        totalTax.innerHTML = `$${totalTotal.toFixed(2)}`;

        let incomeAfterTaxTotal = (income - totalTotal).toFixed(2);
        incomeAfterTax.innerHTML = `$${incomeAfterTaxTotal}`;
    }
};



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
    
    for (let j = 1; j < selectElement.length; j++){
        let dropdownItem = document.createElement("DIV");
        dropdownItem.innerHTML = selectElement.options[j].innerHTML;
        dropdownItem.addEventListener("click", function(e) {
            let selectEl = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let selectedItemD = this.parentNode.previousSibling;
            for (let i = 0; i < selectEl.length; i++) {
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
