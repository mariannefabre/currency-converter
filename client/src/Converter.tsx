import { useEffect, useState } from "react";
import styled from "styled-components";
import { ExchangeRateDisplay } from "./ExchangeRateDisplay";
import { CurrencyInput, CurrencyInputType } from "./CurrencyInput";

export const Converter = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(1);
  const [baseCurrency, setBaseCurrency] = useState<string>("EUR");

  const [targetCurrency, setTargetCurrency] = useState<string>("USD");
  const [targetAmount, setTargetAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number | undefined>();

  const [date, setDate] = useState<string | undefined>();
  const [currencies, setCurrencies] = useState<string[] | undefined>();

  const fetchAllCurrencies = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/currencies");
      if (!response.ok) throw new Error("Failed to fetch currencies.");
      const data = await response.json();

      setCurrencies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchConversionData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base: baseCurrency,
          target: targetCurrency,
          amount: baseAmount,
        }),
      });
      if (!response.ok) throw new Error("Conversion request failed.");
      const data = await response.json();
      const lastUpdate = new Date(data.lastUpdateUtc);

      setTargetAmount(data.conversionResult);
      setExchangeRate(data.exchangeRate);
      setDate(lastUpdate.toLocaleString());
    } catch (error) {
      console.error(error);
    }
  };

  // handles amount changes for either the base or target currency input
  const handleAmountChange = (amount: number, type: CurrencyInputType) => {
    if (type === "base") {
      setBaseAmount(amount);
      if (exchangeRate) {
        const newTargetAmount = Math.round(amount * exchangeRate * 100) / 100;
        setTargetAmount(newTargetAmount);
      }
    } else if (type === "target") {
      setTargetAmount(amount);
      if (exchangeRate) {
        const newBaseAmount = Math.round((amount / exchangeRate) * 100) / 100;
        setBaseAmount(newBaseAmount);
      }
    }
  };

  // fetch all currencies on mount
  useEffect(() => {
    fetchAllCurrencies();
  }, []);

  // fetch conversion data on baseCurrency or targetCurrency updates
  useEffect(() => {
    fetchConversionData();
  }, [baseCurrency, targetCurrency]);

  return (
    <ConverterContainer>
      <Tabs>
        <Tab onClick={() => setSelectedTab(0)} isSelected={selectedTab === 0}>
          Converter
        </Tab>
        <Tab onClick={() => setSelectedTab(1)} isSelected={selectedTab === 1}>
          Charts
        </Tab>
      </Tabs>
      <TabContent isSelected={selectedTab === 0}>
        <ExchangeRateDisplay
          baseAmount={baseAmount}
          baseCurrency={baseCurrency}
          exchangeRate={exchangeRate}
          targetCurrency={targetCurrency}
          date={date}
        />
        <UserInput>
          <CurrencyInput
            value={baseAmount}
            onAmountChange={handleAmountChange}
            selectedCurrency={baseCurrency}
            onCurrencyChange={setBaseCurrency}
            currencies={currencies}
            type="base"
          />
          <CurrencyInput
            value={targetAmount}
            onAmountChange={handleAmountChange}
            selectedCurrency={targetCurrency}
            onCurrencyChange={setTargetCurrency}
            currencies={currencies?.filter(
              (currency) => currency !== baseCurrency
            )}
            type="target"
          />
        </UserInput>
      </TabContent>
      <TabContent isSelected={selectedTab === 1}>
        <Text1>Track currencies</Text1>
        <Text2>Upgrade to premium to track currencies and even more.</Text2>
        <CTA>
          <img
            height="16"
            width="16"
            src="flashlight-fill.svg"
            alt="Flashlight icon"
          />
          <span>Upgrade to premium</span>
        </CTA>
      </TabContent>
    </ConverterContainer>
  );
};

const ConverterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 16px 0px;
  height: fit-content;
  min-width: 370px;
`;
const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.offWhite};
  padding: 0 24px;
  gap: 8px;
  cursor: pointer;
  align-items: flex-start;
  justify-content: space-around;
`;
const Tab = styled.div<{ isSelected: boolean }>`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.accent};
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "500")};
  padding: 0px 8px 8px 8px;
  border-bottom: ${({ isSelected, theme }) =>
    isSelected && `3px solid ${theme.colors.primary}`};
`;
const TabContent = styled.div<{ isSelected: boolean }>`
  display: ${({ isSelected }) => (isSelected ? "flex" : "none")};
  flex-direction: column;
  padding: 16px 24px;
`;
const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Text1 = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.offBlack};
  margin-bottom: 4px;
`;
const Text2 = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
`;
const CTA = styled.button`
  font-size: 14px;
  margin-top: 24px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.offWhite};
  border: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  gap: 8px;
`;
