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

/**
 * Normaliza una expresion matematica reemplazando los simbolos especiales
 * (por ejemplo, ×, ÷, π, √) por sus equivalentes en la sintaxis que mathjs entiende.
 * Tambien convierte las raices en funciones sqrt().
 */
function normalizeExpression(expr: string) {
    let expression = expr
        .replace(/×/g, "*") // reemplaza multiplicacion
        .replace(/÷/g, "/") // reemplaza division
        .replace(/π/g, "pi"); // reemplaza pi

    // Convierte expresiones como √9 o √(4+5) a sqrt(9) o sqrt(4+5)
    expression = expression.replace(/√(\d+(\.\d+)?|\([^\)]+\))/g, "sqrt($1)");

    return expression;
}

/**
 * Controla la insercion de parentesis. Evita que se coloquen de forma incorrecta.
 * Si se abre un parentesis, puede agregar un signo de multiplicacion implicito
 * cuando es necesario. Tambien evita cerrar parentesis de mas.
 */
export const handleParenthesis = (value: string, display: string) => {
    const last = display.slice(-1);

    if (value === "(") {
        // Si el display esta vacio o es 0, comienza con "("
        if (display === "0") return value;

        // Si el ultimo caracter es un operador o una raiz, simplemente lo agrega
        if (/[+\-×÷(√]/.test(last)) return display + value;

        // Si el parentesis viene despues de un numero, agrega una multiplicacion implicita
        return display + "×" + value;
    }

    if (value === ")") {
        // Contamos parentesis abiertos y cerrados
        const openCount = (display.match(/\(/g) || []).length;
        const closeCount = (display.match(/\)/g) || []).length;

        // Solo permite cerrar si hay un parentesis abierto y no hay operador antes
        if (openCount > closeCount && !/[+\-×÷(]/.test(last)) {
            return display + value;
        }

        return display;
    }

    return display;
};

/**
 * Maneja la entrada de numeros en la calculadora.
 * Si el resultado anterior esta activo, lo reemplaza con el nuevo numero.
 * Evita concatenar numeros despues de un porcentaje.
 */
export const handleNumber = (value: string, display: string, isResult: boolean) => {
    if (isResult) return { display: value, isResult: false }; // reinicia el display
    const last = display.slice(-1);
    if (last === "%") return { display, isResult }; // no permite numero despues de %
    return { display: display === "0" ? value : display + value, isResult: false };
};

/**
 * Controla la insercion de operadores y funciones cientificas.
 * Ajusta la expresion segun el contexto para mantener una sintaxis valida.
 */
export const handleOperator = (value: string, display: string, isResult: boolean) => {
    const last = display.slice(-1);

    if (value === "(" || value === ")") {
        // Deriva a la logica de parentesis
        return handleParenthesis(value, display);
    }

    // Si la pantalla muestra 0 y el operador no es una funcion cientifica, reemplaza el 0
    if (display === "0" && !["(", ...SCI_OPERATORS].includes(value)) {
        return value === "%" ? display : value;
    }

    // Evita agregar un punto despues de un %
    if (last === "%" && value === ".") return display;

    // Si el ultimo caracter ya es un operador
    if (OPERATORS.includes(last)) {
        if (last === "%") {
            // Si el ultimo era %, permite otro % o un operador
            if (value === "%") return display + value;
            if (OPERATORS.includes(value)) return display + value;
            if (SCI_OPERATORS.includes(value)) return display + value;
            return display;
        } else {
            // Reemplaza el operador anterior por el nuevo
            if (value === "%") return display;
            if (SCI_OPERATORS.includes(value) && !value.startsWith("(")) return display + value;
            return display.slice(0, -1) + value;
        }
    }

    // Manejo de operadores cientificos
    if (SCI_OPERATORS.includes(value)) {
        // Si es un nuevo calculo, inicia con el operador
        if (isResult || display === "0") return value;
        // Si es raiz cuadrada, la agrega directamente
        if (value === "√") return display + value;
        // Si viene despues de un numero o cierre de parentesis, agrega multiplicacion implicita
        if (/\d|\)/.test(last)) return display + "×" + value;

        return display + value;
    }

    return display === "0" ? value : display + value;
};

/**
 * Controla la insercion del punto decimal.
 * Asegura que no haya multiples puntos en el mismo numero
 * y maneja correctamente el caso de inicio o despues de operadores.
 */
export const handleDot = (display: string, isResult: boolean) => {
    const lastNumber = display.split(/[\+\-\×\÷\%]/).pop() || "";
    const last = display.slice(-1);

    // Evita colocar punto despues de ciertos simbolos
    if (["%", "+", "-", "×", "÷", "π", "e"].includes(last)) return { display, isResult };

    // Si se muestra un resultado, permite agregar un punto al final
    if (isResult) return { display: display.includes(".") ? display : display + ".", isResult: false };

    // Solo permite un punto por numero
    if (!lastNumber.includes(".")) display = display === "0" ? "0." : display + ".";

    return { display, isResult };
};

/**
 * Evalua la expresion matematica escrita por el usuario.
 * Normaliza los simbolos, valida la estructura y calcula el resultado con mathjs.
 * Devuelve null si hay un error o la expresion es invalida.
 */
export const handleEqual = (display: string): string | null => {
    try {
        // Validaciones basicas: vacio, termina en operador, o simbolos mal colocados
        if (!display || display === "0") return null;
        if (/[+\-×÷\.]$/.test(display)) return null;
        if (/([πe])(\d|\w|\()/g.test(display)) return null;

        // Normaliza expresion
        let expression = normalizeExpression(display);

        // Convierte porcentajes encadenados en divisiones por 100 sucesivas
        expression = expression.replace(/(%+)/g, (match) => "/100".repeat(match.length));

        // Verifica balance de parentesis
        const open = (expression.match(/\(/g) || []).length;
        const close = (expression.match(/\)/g) || []).length;
        if (open !== close) return null;

        // Evalua con mathjs
        const result = evaluate(expression);
        if (isNaN(result) || !isFinite(result)) return null;

        return result.toString();
    } catch (err) {
        console.log("Error al evaluar:", err);
        return null;
    }
};

/**
 * Cambia el signo del ultimo numero o grupo numerico en la pantalla.
 * Si el numero ya es negativo, lo convierte en positivo y viceversa.
 * Maneja correctamente multiplicaciones, divisiones y parentesis.
 */
export const handleToggleSign = (display: string): string => {
    if (!display || display === "0") return display;

    try {
        // Busca el ultimo numero junto con su operador previo
        const match = display.match(/(.*?)([+\-×÷])?(\(?-?\d+\.?\d*\)?)$/);

        if (!match) return display;

        const before = match[1] ?? "";
        const operator = match[2] ?? "";
        let number = match[3];

        const isParenthesized = /^\(.*\)$/.test(number);
        const cleanNumber = number.replace(/[()]/g, "");

        // Si el numero esta despues de una multiplicacion o division
        if (operator === "×" || operator === "÷") {
            // Si ya es negativo, lo vuelve positivo
            if (cleanNumber.startsWith("-")) {
                return before + operator + cleanNumber.slice(1);
            } else {
                // Si es positivo, lo encapsula en parentesis con signo negativo
                return before + operator + "(-" + cleanNumber + ")";
            }
        }

        // Si esta despues de un + o -, invierte el operador
        if (operator === "+" || operator === "-") {
            const newOperator = operator === "+" ? "-" : "+";
            return before + newOperator + cleanNumber;
        }

        // Si el numero es negativo, lo vuelve positivo
        if (cleanNumber.startsWith("-")) {
            return cleanNumber.replace("-", "");
        } else {
            return "-" + cleanNumber;
        }
    } catch {
        return display;
    }
};
