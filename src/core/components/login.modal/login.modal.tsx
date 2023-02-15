import { useDispatch, useSelector } from 'react-redux';
import { useUserAuth } from '../../hooks/use.user.auth';
import { RootState } from '../../store/store';
import * as ac from '../../reducer/action.creator';

import './login.modal.scss';

export function LoginModal() {
    const isLoginModalOpen = useSelector(
        (state: RootState) => state.modal.loginModal
    );

    const dispatch = useDispatch();

    const { handleLoginWithGoogle } = useUserAuth();
    const handleLoginOnClick = async () => {
        await handleLoginWithGoogle();
        dispatch(ac.closeActionCreatorModal());
    };
    const handleCloseModal = () => {
        dispatch(ac.closeActionCreatorModal());
    };
    return (
        <>
            {isLoginModalOpen && (
                <div className="login-modal">
                    <div className="login-modal__content">
                        <h2 className="login-modal__title">Bienvenido</h2>
                        <p className="login-modal__info">
                            Para poder publicar tus artículos o añadirlos
                            favoritos necesitas estar registrado
                        </p>
                        <button
                            onClick={handleCloseModal}
                            className="login-modal__close-button"
                        >
                            x
                        </button>
                        <button
                            onClick={handleLoginOnClick}
                            className="login-modal__google-button"
                        >
                            <span>Login con Google</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
