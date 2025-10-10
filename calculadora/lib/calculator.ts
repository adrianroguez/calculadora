// lib/calculator.ts
export function handleNumber(value: string, display: string, isResult: boolean) {
    if (isResult) return { display: value, isResult: false };
    if (display === "0") return { display: value, isResult: false };
    return { display: display + value, isResult: false };
}

export function handleOperator(value: string, display: string, isResult: boolean) {
    if (isResult) return display + value;
    const lastChar = display.slice(-1);
    if ("+-×÷^".includes(lastChar)) return display.slice(0, -1) + value;
    return display + value;
}

export function handleDot(display: string, isResult: boolean) {
    if (isResult) return { display: "0.", isResult: false };
    const parts = display.split(/[\+\-\×÷]/);
    const last = parts[parts.length - 1];
    if (last.includes(".")) return { display, isResult };
    return { display: display + ".", isResult };
}

export function handleToggleSign(display: string) {
    try {
        const result = parseFloat(display);
        if (isNaN(result)) return display;
        return String(-result);
    } catch {
        return display;
    }
}

export function handleEqual(display: string): string | null {
    try {
        let expression = display
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/√/g, "Math.sqrt")
            .replace(/π/g, "Math.PI")
            .replace(/\^/g, "**");

        expression = expression
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/log\(/g, "Math.log10(");

        if (/[\+\-\*\/\^\.]$/.test(expression)) return null;

        const result = eval(expression);
        if (result === undefined || isNaN(result)) return null;

        return String(result);
    } catch (error) {
        console.log("Error al evaluar:", error);
        return null;
    }
}
