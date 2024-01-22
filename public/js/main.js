
//! sounds
let click1 = document.getElementById("click1");
let click3 = document.getElementById("click3");
let click5 = document.getElementById("click5");

let display = document.querySelector("p")
let buttons = document.querySelectorAll("button")


//! variable operation, every click is going to be push in there
let operation = []

//! see explaination below
let lastElement

//! used to avoid directly entering a number after clicking equal, and force user to use symbol or ca
let noNumber = true

//! Used to avoid user to start with a symbol except "-"
let startWithWrongSymbol = true

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {

        //! gets last element of the "operation" array (used below to replace previous symbol with the new one if clicking symbols successively)
        lastElement = operation[operation.length - 1];

        //! CLICKING CA
        if (e.target.className.includes("ac")) {
            operation = []
            display.innerHTML = operation
            click3.play()
            noNumber = true
            startWithWrongSymbol = true
        
        //! CLICKING NUMBER
        } else if (e.target.className.includes("number") && noNumber == true) {
            click1.play()
            operation.push(e.target.innerHTML)
            display.innerHTML = operation.join("")
            startWithWrongSymbol = false
        
        //! CLICKING SYMBOL
        } else if (e.target.className.includes("symbol") && operation[0] != "-"){
            click1.play()
            noNumber = true

            if (lastElement == "x" || lastElement == "/" || lastElement == "+" || lastElement == "-") {
                operation.splice(-1, 1, e.target.innerHTML)
                display.innerHTML = operation.join("")
                if (operation[0] != "-") {
                    operation[0] = "-"
                }
                
            } else if (startWithWrongSymbol != true || e.target.innerHTML == "-"){
                operation.push(e.target.innerHTML)
                display.innerHTML = operation.join("")
            }

            console.log(operation);
        
        //! CLICKING EQUAL
        } else if (e.target.id == "equal") {
            click5.play()

            for (let i = 0; i < operation.length; i++) {
                if (operation[i] == "x") {
                    operation[i] = "*"
                }
            }

            let result = eval(operation.join(""))
            display.innerHTML = result
            operation = []
            operation.push(result)
            noNumber = false
        }
    })
}