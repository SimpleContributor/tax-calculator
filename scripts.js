function calcTaxes() {
    
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
