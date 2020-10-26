////////////////////////////////////////
//////// CALCULATE TAXES SCRIPT ////////
////////////////////////////////////////
function calcTaxes() {
    let fedDeduc, stateDeduc, taxable, margRate, effecRate, fedTax, ficaRate, stateTax;
    let totalArr = [];
    let SingleFedBracket = [];

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

    if (fileStatus === 'Single') {
        fedDeduc = income - 12200;

        if (dependents > 1) {
            stateDeduc = fedDeduc - ((dependents - 1) * 4000);
        } else {
            stateDeduc = fedDeduc;
        }

        if (fedDeduc > 518401) {
            margRate = 0.37;
            taxable = fedDeduc - 518401;
            fedTax = taxable * margRate + 156235;
            fedTaxCalc(fedTax, margRate);
        } else if (fedDeduc > 207351) {
            margRate = 0.35;
            taxable = fedDeduc - 207351;
            fedTax = taxable * margRate + 47367.50;
            fedTaxCalc(fedTax, margRate);
        } else if (fedDeduc > 163301) {
            margRate = 0.32;
            taxable = fedDeduc - 163301;
            fedTax = taxable * margRate + 33271.50;
            fedTaxCalc(fedTax, margRate);
        } else if (fedDeduc > 85526) {
            margRate = 0.24;
            taxable = fedDeduc - 85526;
            fedTax = taxable * margRate + 14605.50;
            fedTaxCalc(fedTax, margRate);
        } else if (fedDeduc > 40126) {
            margRate = 0.22;
            taxable = fedDeduc - 40126;
            fedTax = taxable * margRate + 4617.50;
            fedTaxCalc(fedTax, margRate);
        } else if (fedDeduc > 9876) {
            margRate = 0.12;
            taxable = fedDeduc - 9876;
            fedTax = taxable * margRate + 987.50;
            fedTaxCalc(fedTax, margRate);
        } else {
            margRate = 0.10;
            fedTax = fedDeduc * margRate;
            fedTaxCalc(fedTax, margRate);
        };

        ficaTaxCalc();
        stateTaxCalc(stateDeduc);
        totalTaxes();
    };




    function fedTaxCalc(fedTax, margRate) {
        effecRate = (fedTax / income * 100).toFixed(2);
        fedMarginalRate.innerHTML = `${margRate * 100}%`;
        fedEffectiveRate.innerHTML = `${effecRate}%`;
        fedTotal.innerHTML = `$${fedTax.toFixed(2)}`;
        totalArr.push(fedTax);
    };

    function stateTaxCalc(stateDeduc) {
        if (stateDeduc > 16001) {
            margRate = 0.049;
            taxable = stateDeduc - 16001;
            stateTax = taxable * margRate + 504.50;
            calc(stateTax, margRate);
        } else if (stateDeduc > 11001) {
            margRate = 0.047;
            taxable = stateDeduc - 11001;
            stateTax = taxable * margRate + 269.50;
            calc(stateTax, margRate);
        } else if (stateDeduc > 5501) {
            margRate = 0.032;
            taxable = stateDeduc - 5501;
            stateTax = taxable * margRate + 93.50;
            calc(stateTax, margRate);
        } else {
            margRate = 0.017;
            taxable = stateDeduc;
            stateTax = taxable * margRate;
            calc(stateTax, margRate);
        }

        function calc(stateTax, margRate) {
            if (stateTax <= 0) {
                stateTax = 0;
            }

            effecRate = (stateTax / income * 100).toFixed(2);
            stateMarginalRate.innerHTML = `${(margRate * 100).toFixed(2)}%`;
            stateEffectiveRate.innerHTML = `${effecRate}%`;
            stateTotal.innerHTML = `$${stateTax.toFixed(2)}`;
            totalArr.push(stateTax);
        }
    };

    function ficaTaxCalc() {
        if (income > 200000) {
            ficaRate = 0.0235;
        } else if (income > 137701) {
            ficaRate = 0.0145;
        } else {
            ficaRate = 0.0765;
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
