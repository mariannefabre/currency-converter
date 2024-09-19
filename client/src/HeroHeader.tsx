import styled from "styled-components";

export const HeroHeader = (): JSX.Element => {
  return (
    <div>
      <HeroTitle>Converting has never been so easy.</HeroTitle>
      <CTA>Discover more</CTA>
    </div>
  );
};

const HeroTitle = styled.h1`
  font-family: Playfair Display;
  font-size: 100px;
  font-weight: 900;
  text-align: left;
  letter-spacing: -2px;
  line-height: 100px;
  color: ${({ theme }) => theme.colors.offWhite};
  margin-bottom: 48px;

  @media (max-width: 1060px) {
    font-size: 70px;
    line-height: 70px;
  }
`;

const CTA = styled.button`
  display: block;
  background-color: ${({ theme }) => theme.colors.offWhite};
  border-radius: 50px;
  padding: 16px 20px;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
`;
