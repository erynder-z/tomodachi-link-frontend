import React from 'react';
import { FriendDataType } from '../../../../../../types/friendDataType';
import { useNavigate } from 'react-router-dom';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import { TbUserSearch } from 'react-icons/tb';

type FriendListItemProps = {
    friendData: FriendDataType;
};

export default function FriendListItem({ friendData }: FriendListItemProps) {
    const navigate = useNavigate();
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = friendData ?? {};

    const handleUserClick = () => {
        if (!currentUserData) {
            return;
        }

        const path = currentUserData?._id === _id ? '/mypage' : `/users/${_id}`;
        navigate(path);
    };

    return (
        <div onClick={handleUserClick} className="cursor-pointer">
            <div className="relative flex rounded outline-highlight dark:outline-highlightDark hover:outline">
                <img
                    className="h-auto aspect-square object-cover rounded"
                    src={`data:image/png;base64,${userpic.data}`}
                    alt="User avatar"
                />
                <div className="absolute inset-0 flex justify-center items-center aspect-square bg-black bg-opacity-75 opacity-0 hover:opacity-75 transition-opacity cursor-pointer rounded">
                    <span className="text-white text-lg font-bold">
                        <TbUserSearch size="1.5em" />
                    </span>
                </div>
            </div>
            <div className="text-xs p-1 break-all">
                {firstName} {lastName}
            </div>
        </div>
    );
}
