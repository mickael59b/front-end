// src/components/Message.jsx
import React, { useEffect, useState } from 'react';

const Message = ({ type, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Réinitialisation de la visibilité et du timer lorsque le message change
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 10000);

        // Nettoyage du timer lorsqu'il y a un changement dans le message
        return () => clearTimeout(timer);
    }, [message]); // Dépendance sur le message pour réinitialiser l'état à chaque changement

    if (!visible) return null; // Ne rien rendre si le message n'est plus visible

    return (
        <div className={`alert alert-${type} mt-3`} role="alert">
            {message}
        </div>
    );
};

export default Message;