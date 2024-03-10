import { NavLink } from 'react-router-dom';

const verDetalle = () => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/detalle/:id">Ver Detalle</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default verDetalle;
