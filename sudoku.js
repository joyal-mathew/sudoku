"use strict";

function verify(sudoku) {
    for (let r = 0; r < 81; r += 9) {
        const seen = [];
        let empty;
        for (let i = r; i < r + 9; ++i) {
            if (sudoku[i]) {
                if (seen.includes(sudoku[i]))
                    return false;
                else
                    seen.push(sudoku[i]);
            }
            else {
                empty = i;
            }
        }

        if (seen.length == 8) {
            for (let i = 1; i <= 9; ++i) {
                if (!seen.includes(i)) {
                    sudoku[empty] = i;
                    break;
                }
            }
        }
    }

    for (let c = 0; c < 9; ++c) {
        const seen = [];
        let empty;
        for (let i = c; i < 81; i += 9) {
            if (sudoku[i]) {
                if (seen.includes(sudoku[i]))
                    return false;
                else
                    seen.push(sudoku[i]);
            }
            else {
                empty = i;
            }
        }

        if (seen.length == 8) {
            for (let i = 1; i <= 9; ++i) {
                if (!seen.includes(i)) {
                    sudoku[empty] = i;
                    break;
                }
            }
        }
    }

    for (let r = 0; r < 9; r += 3) {
        for (let c = 0; c < 9; c += 3) {
            const b = r * 9 + c;
            const seen = [];
            let empty;

            for (let i = 0; i < 3; ++i) {
                for (let j = 0; j < 3; ++j) {
                    const index = b + i * 9 + j;
                    if (sudoku[index]) {
                        if (seen.includes(sudoku[index]))
                            return false;
                        else
                            seen.push(sudoku[index]);
                    }
                    else {
                        empty = index;
                    }
                }
            }

            if (seen.length == 8) {
                for (let i = 1; i <= 9; ++i) {
                    if (!seen.includes(i)) {
                        sudoku[empty] = i;
                        break;
                    }
                }
            }
        }
    }

    return true;
}

function getValid(sudoku, index) {
    let r = index / 9 | 0;
    let c = index % 9;
    let b = ((r / 3 | 0) * 3) * 9 + ((c / 3 | 0) * 3);
    r *= 9;

    const usedNums = [];
    const valid = [];

    for (let i = 0; i < 9; ++i)
        usedNums.push(sudoku[r + i]);
    for (let i = 0; i < 9; ++i)
        usedNums.push(sudoku[c + i * 9]);
    for (let i = 0; i < 3; ++i)
        for (let j = 0; j < 3; ++j)
            usedNums.push(sudoku[b + i * 9 + j]);

    for (let i = 1; i < 10; ++i) {
        if (!usedNums.includes(i))
            valid.push(i)
    }

    return valid;
}

function solve(sudoku, index) {
    if (sudoku[index] === null) {
        for (const v of getValid(sudoku, index)) {
            sudoku[index] = v;
            if (index >= 80 || solve(sudoku, index + 1))
                return true;
        }
        sudoku[index] = null;
        return false;
    }
    else if (index >= 80)
        return true;
    else
        return solve(sudoku, index + 1);
}
