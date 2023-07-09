import { FaExclamationTriangle } from 'react-icons/fa';
import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchChatConversation = async (
    id: string | undefined,
    token: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/chat/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data.conversation;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch conversation!',
            icon: <FaExclamationTriangle />,
        });
    }
};
