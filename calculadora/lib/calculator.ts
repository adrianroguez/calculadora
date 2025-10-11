import { evaluate } from "mathjs";

const OPERATORS = ["+", "-", "×", "÷", "^", "%"];
const SCI_OPERATORS = [
    "log(",
    "sin(",
    "cos(",
    "tan(",
    "π",
    "e",
    "√",
];

function normalizeExpression(expr: string) {
    let expression = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "pi");
    
    expression = expression.replace(/√(\d+(\.\d+)?|\([^\)]+\))/g, "sqrt($1)");

    return expression;
}


export const handleParenthesis = (value: string, display: string) => {
    const last = display.slice(-1);

    if (value === "(") {
        if (display === "0") return value;
        if (/[+\-×÷(√]/.test(last)) return display + value;
        return display + "×" + value;
    }


    if (value === ")") {
        const openCount = (display.match(/\(/g) || []).length;
        const closeCount = (display.match(/\)/g) || []).length;

        if (openCount > closeCount && !/[+\-×÷(]/.test(last)) {
            return display + value;
        }

        return display;
    }

    return display;
};

export const handleNumber = (value: string, display: string, isResult: boolean) => {
    if (isResult) return { display: value, isResult: false };
    const last = display.slice(-1);
    if (last === "%") return { display, isResult };
    return { display: display === "0" ? value : display + value, isResult: false };
};

export const handleOperator = (value: string, display: string, isResult: boolean) => {
    const last = display.slice(-1);

    if (value === "(" || value === ")") {
        return handleParenthesis(value, display);
    }

    if (display === "0" && !["(", ...SCI_OPERATORS].includes(value)) {
        return value === "%" ? display : value;
    }

    if (last === "%" && value === ".") return display;

    if (OPERATORS.includes(last)) {
        if (last === "%") {
            if (value === "%") return display + value;
            if (OPERATORS.includes(value)) return display + value;
            if (SCI_OPERATORS.includes(value)) return display + value;
            return display;
        } else {
            if (value === "%") return display;
            if (SCI_OPERATORS.includes(value) && !value.startsWith("(")) return display + value;
            return display.slice(0, -1) + value;
        }
    }

    if (SCI_OPERATORS.includes(value)) {
        if (isResult || display === "0") return value;
        if (value === "√") return display + value;
        if (/\d|\)/.test(last)) return display + "×" + value;

        return display + value;
    }


    return display === "0" ? value : display + value;
};


export const handleDot = (display: string, isResult: boolean) => {
    const lastNumber = display.split(/[\+\-\×\÷\%]/).pop() || "";
    const last = display.slice(-1);

    if (["%", "+", "-", "×", "÷", "π", "e"].includes(last)) return { display, isResult };
    if (isResult) return { display: display.includes(".") ? display : display + ".", isResult: false };
    if (!lastNumber.includes(".")) display = display === "0" ? "0." : display + ".";

    return { display, isResult };
};

export const handleEqual = (display: string): string | null => {
    try {
        if (!display || display === "0") return null;
        if (/[+\-×÷\.]$/.test(display)) return null;
        if (/([πe])(\d|\w|\()/g.test(display)) return null;

        let expression = normalizeExpression(display);

        expression = expression.replace(/(%+)/g, (match) => "/100".repeat(match.length));

        const open = (expression.match(/\(/g) || []).length;
        const close = (expression.match(/\)/g) || []).length;
        if (open !== close) return null;

        const result = evaluate(expression);
        if (isNaN(result) || !isFinite(result)) return null;

        return result.toString();
    } catch (err) {
        console.log("Error al evaluar:", err);
        return null;
    }
};

export const handleToggleSign = (display: string): string => {
    if (!display || display === "0") return display;

    try {
        const match = display.match(/(.*?)([+\-×÷])?(\(?-?\d+\.?\d*\)?)$/);

        if (!match) return display;

        const before = match[1] ?? "";
        const operator = match[2] ?? "";
        let number = match[3];

        const isParenthesized = /^\(.*\)$/.test(number);
        const cleanNumber = number.replace(/[()]/g, "");

        if (operator === "×" || operator === "÷") {
            if (cleanNumber.startsWith("-")) {
                return before + operator + cleanNumber.slice(1);
            } else {
                return before + operator + "(-" + cleanNumber + ")";
            }
        }

        if (operator === "+" || operator === "-") {
            const newOperator = operator === "+" ? "-" : "+";
            return before + newOperator + cleanNumber;
        }

        if (cleanNumber.startsWith("-")) {
            return cleanNumber.replace("-", "");
        } else {
            return "-" + cleanNumber;
        }
    } catch {
        return display;
    }
};

