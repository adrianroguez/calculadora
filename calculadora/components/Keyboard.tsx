import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Row } from "./Row";
import { CalculatorBtn } from "./CalculatorBtn";

type Props = {
  onPress: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
  onToggleSign: () => void;
  scientific: boolean;
};

export const Keyboard: React.FC<Props> = ({ onPress, onClear, onDelete, onEquals, onToggleSign, scientific }) => {
  const accentColor = "#ff9500";
  const secondaryBgColor = "#777";
  const scale = scientific ? 0.7 : 1;

  return (
    <View style={styles.container}>
      {scientific && (
        <Row>
          <>
            <CalculatorBtn label="lg" color={secondaryBgColor} scale={scale} onPress={() => onPress("log(")} />
            <CalculatorBtn label="x^" color={secondaryBgColor} scale={scale} onPress={() => onPress("^")} />
            <CalculatorBtn label="√" color={secondaryBgColor} scale={scale} onPress={() => onPress("√")} />
            <CalculatorBtn label="(" color={secondaryBgColor} scale={scale} onPress={() => onPress("(")} />
            <CalculatorBtn label=")" color={secondaryBgColor} scale={scale} onPress={() => onPress(")")} />
          </>
        </Row>
      )}

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="sin" color={secondaryBgColor} scale={scale} onPress={() => onPress("sin(")} />
          </>
        )}
        <CalculatorBtn label="AC" color={accentColor} scale={scale} onPress={onClear} />
        <CalculatorBtn icon="plus-minus-variant" iconLib="material" color={accentColor} scale={scale - 0.2} onPress={onToggleSign} />
        <CalculatorBtn icon="percent" iconLib="material" color={accentColor} scale={scale - 0.2} onPress={() => onPress("%")} />
        <CalculatorBtn icon="division" iconLib="material" color={accentColor} scale={scale} onPress={() => onPress("÷")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="cos" color={secondaryBgColor} scale={scale} onPress={() => onPress("cos(")} />
          </>
        )}
        <CalculatorBtn label="7" scale={scale} onPress={() => onPress("7")} />
        <CalculatorBtn label="8" scale={scale} onPress={() => onPress("8")} />
        <CalculatorBtn label="9" scale={scale} onPress={() => onPress("9")} />
        <CalculatorBtn icon="close-sharp" color={accentColor} scale={scale} onPress={() => onPress("×")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="tan" color={secondaryBgColor} scale={scale} onPress={() => onPress("tan(")} />
          </>
        )}
        <CalculatorBtn label="4" scale={scale} onPress={() => onPress("4")} />
        <CalculatorBtn label="5" scale={scale} onPress={() => onPress("5")} />
        <CalculatorBtn label="6" scale={scale} onPress={() => onPress("6")} />
        <CalculatorBtn icon="minus" iconLib="material" color={accentColor} scale={scale} onPress={() => onPress("-")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="π" color={secondaryBgColor} scale={scale} onPress={() => onPress("π")} />
          </>
        )}
        <CalculatorBtn label="1" scale={scale} onPress={() => onPress("1")} />
        <CalculatorBtn label="2" scale={scale} onPress={() => onPress("2")} />
        <CalculatorBtn label="3" scale={scale} onPress={() => onPress("3")} />
        <CalculatorBtn icon="plus" iconLib="material" color={accentColor} scale={scale} onPress={() => onPress("+")} />
      </Row>

      <Row>
        {scientific && (
          <>
            <CalculatorBtn label="e" color={secondaryBgColor} scale={scale} onPress={() => onPress("e")} />
          </>
        )}
        <CalculatorBtn label="." scale={scale} onPress={() => onPress(".")} />
        <CalculatorBtn label="0" scale={scale} onPress={() => onPress("0")} />
        <CalculatorBtn icon="backspace-outline" iconLib="material" color={accentColor} scale={scale - 0.2} onPress={onDelete} />
        <CalculatorBtn icon="equal" iconLib="material" scale={scale} onPress={onEquals} backgroundColor={accentColor} />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    gap: 10,
  },
});