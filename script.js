"use strict";

const error = document.getElementById("error");

const cells = [];
let node = document.getElementById("sudokuBoard").firstElementChild.firstElementChild.firstElementChild;
for (;;) {
    cells.push(node);

    if (node.nextElementSibling)
        node = node.nextElementSibling;
    else if (node.parentElement.nextElementSibling)
        node = node.parentElement.nextElementSibling.firstElementChild;
    else
        break;
}

let selected = document.getElementById("");
for (const element of document.querySelectorAll("#sudokuBoard td")) {
    element.onclick = () => {
        error.style.color = "#FFFFFF";
        cells.map(e => e.classList.remove("solved"));
        if (selected === element)
            select(null)
        else
            select(element);
    };
}

addEventListener("keydown", e => {
    if (selected) {
        let dir = "right";

        switch (e.key) {
            case "1":
                selected.innerText = "1";
                break;
            case "2":
                selected.innerText = "2";
                break;
            case "3":
                selected.innerText = "3";
                break;
            case "4":
                selected.innerText = "4";
                break;
            case "5":
                selected.innerText = "5";
                break;
            case "6":
                selected.innerText = "6";
                break;
            case "7":
                selected.innerText = "7";
                break;
            case "8":
                selected.innerText = "8";
                break;
            case "9":
                selected.innerText = "9";
                break;
            case " ":
                selected.innerText = "";
                break;
            case "Backspace":
                selected.innerText = "";
                dir = "left";
                break;
            case "Delete":
                selected.innerText = "";
                dir = "none";
                break;
            case "ArrowUp":
                dir = "up";
                break;
            case "ArrowDown":
                dir = "down";
                break;
            case "ArrowLeft":
                dir = "left";
                break;
            case "ArrowRight":
                dir = "right";
                break;
            default:
                return;
        }

        const i = Array.prototype.indexOf.call(selected.parentElement.children, selected);

        switch (dir) {
            case "right":
                if (selected.nextElementSibling) {
                    select(selected.nextSibling);
                }
                else if (selected.parentElement.nextElementSibling) {
                    select(selected.parentElement.nextElementSibling.firstElementChild);
                }
                break;
            case "left":
                if (selected.previousElementSibling) {
                    select(selected.previousElementSibling);
                }
                else if (selected.parentElement.previousElementSibling) {
                    select(selected.parentElement.previousElementSibling.lastElementChild);
                }
                break;
            case "up":
                if (selected.parentElement.previousSibling)
                    select(selected.parentElement.previousElementSibling.children.item(i));
                break;
            case "down":
                if (selected.parentElement.nextElementSibling)
                    select(selected.parentElement.nextElementSibling.children.item(i));
                break;
        }
    }
});

function select(element) {
    if (selected)
        selected.classList.remove("selected");
    selected = element;
    if (element)
        selected.classList.add("selected");
}

document.getElementById("solve").onclick = () => {
    select(null);
    const board = cells.map(e => +e.innerText || null);
    if (verify(board) && solve(board, 0)) {
        cells.map(e => {
            if (!e.innerText) {
                e.classList.add("solved");
                e.innerText = board.shift();
            }
            else
                board.shift();
        });
    }
    else {
        error.style.color = "#C70505"
    }
};

document.getElementById("clear").onclick = () => {
    select(null);
    error.style.color = "#FFFFFF"
    cells.map(e => { e.classList.remove("solved"); e.innerText = ""; });
};
