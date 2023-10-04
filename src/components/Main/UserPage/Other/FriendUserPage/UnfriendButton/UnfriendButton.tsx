import { useState } from 'react';
import { TbUserMinus } from 'react-icons/tb';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import useFriendData from '../../../../../../hooks/useFriendData';
import ConfirmationOverlay from '../../../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import useDelayUnmount from '../../../../../../hooks/useDelayUnmount';
import { handleFriendRequest } from '../../../../../../utilities/handleFriendRequests';

type UnfriendButtonProps = {
    unfriendUserId: string;
};

export default function UnfriendButton({
    unfriendUserId,
}: UnfriendButtonProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const handleUnfriendButtonClick = () => {
        setShouldConfirmDialogShow(true);
    };

    const ConfirmationModal = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                if (token && currentUserData) {
                    const requestType = 'unfriend';
                    handleFriendRequest(
                        token,
                        currentUserData?._id,
                        unfriendUserId,
                        setInfo,
                        requestType,
                        handleFetchUserData,
                        handleFetchFriendData
                    );
                }
            }}
            dialogInfo={{
                message: 'Do you really want to stop being friends?',
                icon: '✋',
            }}
        />
    );

    const Button = (
        <button
            className="flex justify-center items-center gap-2 bg-red-500 text-regularTextDark px-2 py-1 w-fit m-auto md:ml-auto hover:bg-red-600 rounded"
            onClick={handleUnfriendButtonClick}
        >
            Unfriend <TbUserMinus size="1.25em" />
        </button>
    );

    return (
        <>
            {showConfirmDialog && ConfirmationModal}
            {Button}
        </>
    );
}
