import { useState } from 'react';
import { useUserAuth } from '../../hooks/use.user.auth';
import './login.modal.scss';

export function LoginModal() {
    const [showModal, setShowModal] = useState(true);

    const { handleLoginWithGoogle } = useUserAuth();
    const handleLoginOnClick = async () => {
        await handleLoginWithGoogle();
        setShowModal(false);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
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
