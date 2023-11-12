import './header.css';
import { Link, NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <header className="p-6 border-b-2 border-b-slate-100">
            <div className="container mx-auto px-6">
                <div className='flex items-center justify-between'>
                    <Link className='text-2xl text-lime-500 hover:opacity-80 transition' to="/">Rick & Morthy</Link>
                    <nav>
                        <ul className='list-unstyled flex items-center gap-5'>
                            <li>
                                <NavLink className={obj => `text-lg text-slate-800 hover:text-lime-500 transition underline-offset-[10px] decoration-lime-400 ${obj.isActive ? ' underline !text-lime-500' : ' no-underline'}`}
                                 to="/">Characters</NavLink> 
                            </li>
                            <li>
                                 <NavLink className={obj => `text-lg text-slate-800 hover:text-lime-500 transition underline-offset-[10px] decoration-lime-400 ${obj.isActive ? ' underline !text-lime-500' : ' no-underline'}`} to="/episodes">Episodes</NavLink> 
                            </li>
                            <li>
                                 <NavLink className={obj => `text-lg text-slate-800 hover:text-lime-500 transition underline-offset-[10px] decoration-lime-400 ${obj.isActive ? ' underline !text-lime-500' : ' no-underline'}`} to="/locations">Locations</NavLink> 
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
