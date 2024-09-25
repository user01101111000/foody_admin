import "./Navbar.css";
import logo from "../../../../assets/icons/foody_logo_white.svg";
import LanguageBox from "../../../../components/LanguageBox/LanguageBox";

export default function Navbar() {
  return (
    <header className="Navbar">
      <figure className="Navbar-logo-fig">
        <img src={logo} alt="logo" />
      </figure>

      <LanguageBox />
    </header>
  );
}
