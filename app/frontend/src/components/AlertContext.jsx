import './Alert.css';
import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
	const [alertType, setAlertType] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const triggerAlert = (type, message) => {
		const cardElement = document.querySelector('dialog');
		if (cardElement && cardElement.hasAttribute('open')) {
			cardElement.close();
		}
		setAlertType(type);
		setAlertMessage(message);
		setShowAlert(true);
	};

	const dismissAlert = () => {
		setShowAlert(false);
	};

	return (
		<AlertContext.Provider
			value={{
				showAlert,
				alertType,
				alertMessage,
				triggerAlert,
				dismissAlert,
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	const alert = useContext(AlertContext);
	if (alert === undefined) {
		throw new Error('useAlert must be used within a AlertProvider');
	}
	return alert;
};
