import React from 'react';

interface ModalProps {
    message: string;
    onClose: () => void;
}

const ModalObra: React.FC<ModalProps> = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg z-50">
            <p className="text-green-700">{message}</p>
            <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={onClose}
            >
                OK
            </button>
        </div>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
    </div>
);

export default ModalObra;ModalObra