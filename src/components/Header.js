import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header(props) {
    function handleSignOut(e) {
        e.preventDefault();
        props.handleSignOut();
    }
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место Россия" />
            <div className='header__options'>
                {props.loggedIn
                    ? <>
                        <p className='header__email'>{props.email}</p>
                        <Link onClick={handleSignOut} className='header__link' to="/" replace>Выйти</Link>
                    </>

                    : <Routes>
                        <Route path='/sign-in' element={<Link className='header__link' to="/sign-up" replace>Регистрация</Link>} />
                        <Route path='/sign-up' element={<Link className='header__link' to="/sign-in" replace>Войти</Link>} />
                    </Routes>
                }

            </div>
        </header>
    )
}