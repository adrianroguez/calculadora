import React from "react";
import { View, StyleSheet } from "react-native";
import { Row } from "./Row";
import { CalculatorBtn } from "./CalculatorBtn";

type Props = {
  onPress: (value: string) => void;
  onClear: () => void;
};

export const Keyboard: React.FC<Props> = ({ onPress, onClear }) => {
  const accentColor = "#ff9500";
  return (
    <View style={styles.container}>
      <Row>
        <CalculatorBtn label="AC" color={accentColor} onPress={onClear} />
        <CalculatorBtn icon="backspace-sharp" color={accentColor} onPress={() => console.log("Borrar")} />
        <CalculatorBtn label="%" color={accentColor} onPress={() => onPress("%")} />
        <CalculatorBtn label="/" color={accentColor} onPress={() => onPress("/")} />
      </Row>

      <Row>
        <CalculatorBtn label="7" onPress={() => onPress("7")} />
        <CalculatorBtn label="8" onPress={() => onPress("8")} />
        <CalculatorBtn label="9" onPress={() => onPress("9")} />
        <CalculatorBtn icon="close-sharp" color={accentColor} onPress={() => onPress("×")} />
      </Row>

      <Row>
        <CalculatorBtn label="4" onPress={() => onPress("4")} />
        <CalculatorBtn label="5" onPress={() => onPress("5")} />
        <CalculatorBtn label="6" onPress={() => onPress("6")} />
        <CalculatorBtn icon="remove-sharp" color={accentColor} onPress={() => onPress("-")} />
      </Row>

      <Row>
        <CalculatorBtn label="1" onPress={() => onPress("1")} />
        <CalculatorBtn label="2" onPress={() => onPress("2")} />
        <CalculatorBtn label="3" onPress={() => onPress("3")} />
        <CalculatorBtn icon="add-sharp" color={accentColor} onPress={() => onPress("+")} />
      </Row>

      <Row>
        <CalculatorBtn icon="calculator-sharp" color={accentColor} onPress={() => console.log("Modo científico")} />
        <CalculatorBtn label="0" onPress={() => onPress("0")} />
        <CalculatorBtn label="." onPress={() => onPress(".")} />
        <CalculatorBtn icon="reorder-two" onPress={() => onPress("=")} backgroundColor={accentColor} />
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
