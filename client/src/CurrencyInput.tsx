import { styled } from "styled-components";

export type CurrencyInputType = "base" | "target";

interface CurrencyInputProps {
  value: number | undefined;
  onAmountChange: (amount: number, type: CurrencyInputType) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: string[] | undefined;
  type: CurrencyInputType;
}

export const CurrencyInput = ({
  value,
  onAmountChange,
  selectedCurrency,
  onCurrencyChange,
  currencies,
  type,
}: CurrencyInputProps): JSX.Element => {
  return (
    <InputWrapper>
      <InputText
        type="number"
        value={value}
        onChange={(e) => onAmountChange(Number(e.target.value), type)}
      />
      <InputCurrency
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies?.map((currency, index) => (
          <option value={currency} key={index}>
            {currency}
          </option>
        ))}
      </InputCurrency>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const InputCurrency = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
`;
const InputText = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 8px;
`;
