import styled from "styled-components";

export const NavigationBar = (): JSX.Element => {
  return (
    <NavBarContainer>
      <NavBarTitle>Convert.</NavBarTitle>
      <DesktopNav>
        <NavGroup>
          <NavItem>
            <span>Features</span>
            <NavIcon src="arrow-down-s-line.svg" alt="Dropdown arrow" />
          </NavItem>
          <NavItem>Pricing</NavItem>
          <NavItem>
            <span>Use cases</span>
            <NavIcon src="arrow-down-s-line.svg" alt="Dropdown arrow" />
          </NavItem>
          <NavItem>
            <span>Ressources</span>
            <NavIcon src="arrow-down-s-line.svg" alt="Dropdown arrow" />
          </NavItem>
        </NavGroup>
        <NavGroup hasCta={true}>
          <NavItem>Login</NavItem>
          <CTA>Sign up</CTA>
        </NavGroup>
      </DesktopNav>
      <MobileNav>Menu</MobileNav>
    </NavBarContainer>
  );
};
const NavBarContainer = styled.header`
  display: flex;
  padding: 24px 40px;
  color: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
  align-items: center;
`;
const NavBarTitle = styled.div`
  font-family: Playfair Display;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.offWhite};
  font-size: 32px;
  letter-spacing: -2px;
`;
const DesktopNav = styled.nav`
  display: inline-flex;
  gap: 16px;
  @media (max-width: 800px) {
    display: none;
  }
`;
const MobileNav = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  padding: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  @media (min-width: 800px) {
    display: none;
  }
`;
const NavGroup = styled.div<{ hasCta?: boolean }>`
  display: flex;
  gap: 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  padding: ${({ hasCta }) => (hasCta ? "8px 8px 8px 24px" : "16px 24px")};
`;
const NavItem = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.offBlack};
  cursor: pointer;
  display: inline-flex;
  padding: 0;
`;
const NavIcon = styled.img`
  margin-left: 4px;
  width: 16px;
  height: 16px;
`;

const CTA = styled.a`
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;
