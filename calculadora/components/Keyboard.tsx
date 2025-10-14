import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Row } from "./Row";
import { CalculatorBtn } from "./CalculatorBtn";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  onPress: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
  onToggleSign: () => void;
  scientific: boolean;
};

export const Keyboard: React.FC<Props> = ({ onPress, onClear, onDelete, onEquals, onToggleSign, scientific }) => {
  const scale = scientific ? 0.7 : 1;
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {scientific && (
        <Row>
          <>
            <CalculatorBtn label="lg" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("log(")} />
            <CalculatorBtn label="x^" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("^")} />
            <CalculatorBtn label="√" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("√")} />
            <CalculatorBtn label="(" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("(")} />
            <CalculatorBtn label=")" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress(")")} />
          </>
        </Row>
      )}

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="sin" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("sin(")} />
          </>
        )}
        <CalculatorBtn label="AC" backgroundColor={theme.spOperatorBtnBackground} color={theme.spOperatorBtnText} scale={scale} onPress={onClear} />
        <CalculatorBtn icon="plus-minus-variant" iconLib="material" backgroundColor={theme.spOperatorBtnBackground} color={theme.spOperatorBtnText} scale={scale - 0.2} onPress={onToggleSign} />
        <CalculatorBtn icon="percent" iconLib="material" backgroundColor={theme.spOperatorBtnBackground} color={theme.spOperatorBtnText} scale={scale - 0.2} onPress={() => onPress("%")} />
        <CalculatorBtn icon="division" iconLib="material" backgroundColor={theme.operatorBtnBackground} color={theme.operatorBtnText} scale={scale} onPress={() => onPress("÷")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="cos" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("cos(")} />
          </>
        )}
        <CalculatorBtn label="7" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("7")} />
        <CalculatorBtn label="8" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("8")} />
        <CalculatorBtn label="9" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("9")} />
        <CalculatorBtn icon="close-sharp" backgroundColor={theme.operatorBtnBackground} color={theme.operatorBtnText} scale={scale} onPress={() => onPress("×")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="tan" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("tan(")} />
          </>
        )}
        <CalculatorBtn label="4" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("4")} />
        <CalculatorBtn label="5" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("5")} />
        <CalculatorBtn label="6" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("6")} />
        <CalculatorBtn icon="minus" iconLib="material" backgroundColor={theme.operatorBtnBackground} color={theme.operatorBtnText} scale={scale} onPress={() => onPress("-")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="π" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("π")} />
          </>
        )}
        <CalculatorBtn label="1" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("1")} />
        <CalculatorBtn label="2" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("2")} />
        <CalculatorBtn label="3" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("3")} />
        <CalculatorBtn icon="plus" iconLib="material" backgroundColor={theme.operatorBtnBackground} color={theme.operatorBtnText} scale={scale} onPress={() => onPress("+")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="e" backgroundColor={theme.sciOperatorBtnBackground} color={theme.sciOperatorBtnText} scale={scale} onPress={() => onPress("e")} />
          </>
        )}
        <CalculatorBtn label="." backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress(".")} />
        <CalculatorBtn label="0" backgroundColor={theme.buttonBackground} color={theme.buttonText} scale={scale} onPress={() => onPress("0")} />
        <CalculatorBtn icon="backspace" iconLib="material" backgroundColor={theme.buttonBackground} color={theme.equalsBtnBackground} scale={scale - 0.2} onPress={onDelete} />
        <CalculatorBtn icon="equal" iconLib="material" backgroundColor={theme.equalsBtnBackground} color={theme.operatorBtnText} scale={scale} onPress={onEquals} />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    paddingBottom: 10,
    gap: 10,
  },
});