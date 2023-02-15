import './login.modal.scss';

export function LoginModal() {
    return (
        <div className="login-modal">
            <div className="login-modal__content">
                <h2 className="login-modal__title">Bienvenido</h2>
                <p className="login-modal__info">
                    Para poder publicar tus artículos o añadirlos favoritos
                    necesitas estar registrado
                </p>
                <button className="login-modal__close-button">x</button>
                <button className="login-modal__google-button">
                    <span>Login con Google</span>
                </button>
            </div>
        </div>
    );
}
