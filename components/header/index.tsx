import Link from 'next/link';

import { TextCSS } from '../styles/Text';
import { Switch } from '../switch';
import { ContainerCSS, NavCSS, TitleCSS } from './styled';

const Header = () => {
  return (
    <ContainerCSS>
      <TitleCSS>
        <TextCSS>MyAwesome</TextCSS>
      </TitleCSS>
      <NavCSS>
        <Link href="/home">Início</Link>
        <span> • </span>
        <Link href="/create-awesome">Criar Awesome</Link>
        <span> | </span>
        <Switch />
      </NavCSS>
    </ContainerCSS>
  );
};

export default Header;
