import styled from "styled-components";

interface ExchangeRateDisplayProps {
  baseCurrency: string;
  exchangeRate: number | undefined;
  targetCurrency: string;
  date: string | undefined;
}
export const ExchangeRateDisplay = ({
  baseCurrency,
  exchangeRate,
  targetCurrency,
  date,
}: ExchangeRateDisplayProps): JSX.Element => {
  return (
    <ExchanceRate>
      <ExchangedAmount>1 {baseCurrency} =</ExchangedAmount>
      <ResultAmount>
        {exchangeRate} {targetCurrency}
      </ResultAmount>
      <ExchangeRateInfo>Last updated {date}</ExchangeRateInfo>
    </ExchanceRate>
  );
};
const ExchanceRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
  margin-bottom: 24px;
`;
const ExchangedAmount = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
`;
const ResultAmount = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.offBlack};
`;
const ExchangeRateInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;
