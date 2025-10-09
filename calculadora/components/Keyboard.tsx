import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Row } from "./Row";
import { CalculatorBtn } from "./CalculatorBtn";

type Props = {
  onPress: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
};

export const Keyboard: React.FC<Props> = ({ onPress, onClear, onDelete, onEquals }) => {
  const accentColor = "#ff9500";
  const secondaryBgColor = "#777";
  const [scientific, setScientific] = useState(false);

  return (
    <View style={styles.container}>
      {scientific && (
        <Row>
          <>
            <CalculatorBtn label="lg" color={secondaryBgColor} onPress={() => onPress("log(")} />
            <CalculatorBtn label="x^" color={secondaryBgColor} onPress={() => onPress("^")} />
            <CalculatorBtn label="√" color={secondaryBgColor} onPress={() => onPress("sqrt(")} />
            <CalculatorBtn label="(" color={secondaryBgColor} onPress={() => onPress("(")} />
            <CalculatorBtn label=")" color={secondaryBgColor} onPress={() => onPress(")")} />
          </>
        </Row>
      )}

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="sin" color={secondaryBgColor} onPress={() => onPress("sin(")} />
          </>
        )}
        <CalculatorBtn label="AC" color={accentColor} onPress={onClear} />
        <CalculatorBtn icon="backspace-sharp" color={accentColor} onPress={onDelete} />
        <CalculatorBtn label="%" color={accentColor} onPress={() => onPress("%")} />
        <CalculatorBtn label="÷" color={accentColor} onPress={() => onPress("÷")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="cos" color={secondaryBgColor} onPress={() => onPress("cos(")} />
          </>
        )}
        <CalculatorBtn label="7" onPress={() => onPress("7")} />
        <CalculatorBtn label="8" onPress={() => onPress("8")} />
        <CalculatorBtn label="9" onPress={() => onPress("9")} />
        <CalculatorBtn icon="close-sharp" color={accentColor} onPress={() => onPress("×")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="tan" color={secondaryBgColor} onPress={() => onPress("tan(")} />
          </>
        )}
        <CalculatorBtn label="4" onPress={() => onPress("4")} />
        <CalculatorBtn label="5" onPress={() => onPress("5")} />
        <CalculatorBtn label="6" onPress={() => onPress("6")} />
        <CalculatorBtn icon="remove-sharp" color={accentColor} onPress={() => onPress("-")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="π" color={secondaryBgColor} onPress={() => onPress("pi")} />
          </>
        )}
        <CalculatorBtn label="1" onPress={() => onPress("1")} />
        <CalculatorBtn label="2" onPress={() => onPress("2")} />
        <CalculatorBtn label="3" onPress={() => onPress("3")} />
        <CalculatorBtn icon="add-sharp" color={accentColor} onPress={() => onPress("+")} />
      </Row>

      <Row>
        <CalculatorBtn icon="calculator-sharp" color={accentColor} onPress={() => setScientific(!scientific)} />
        {scientific && (
          <>
            <CalculatorBtn label="e" color={secondaryBgColor} onPress={() => onPress("e")} />
          </>
        )}
        <CalculatorBtn label="0" onPress={() => onPress("0")} />
        <CalculatorBtn label="." onPress={() => onPress(".")} />
        <CalculatorBtn icon="reorder-two" onPress={onEquals} backgroundColor={accentColor} />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    paddingBottom: 20,
  },
});
