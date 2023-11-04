import { useState } from 'react';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import ConfirmationOverlay from '../../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import EditPostInput from '../../EditPostInput/EditPostInput';
import { PostType } from '../../../../../types/postTypes';
import ToggleListButton from '../../../../UiElements/ToggleListButton/ToggleListButton';
import useDelayUnmount from '../../../../../hooks/useDelayUnmount';
import PostMenu from './PostMenu/PostMenu';
import { InfoType } from '../../../../../types/infoTypes';

type PostOptionsSectionProps = {
    postDetails: PostType | null;
    hasImage: boolean;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostOptionsSection({
    postDetails,
    hasImage,
    onPostChange,
    setShouldRefreshPictureList,
}: PostOptionsSectionProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [shouldMenuShow, setShouldMenuShow] = useState(false);
    const [shouldPostEditShow, setShouldPostEditShow] = useState(false);
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isMenuMounted = shouldMenuShow;
    const isPostEditMounted = shouldPostEditShow;
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showMenu = useDelayUnmount(isMenuMounted, 150);
    const showPostEdit = useDelayUnmount(isPostEditMounted, 150);
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const handleDelete = async () => {
        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const postID = postDetails?._id;

            const response = await fetch(`${serverURL}/api/v1/post/${postID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) handleFetchErrors(response, setInfo);

            const successInfo = {
                typeOfInfo: 'good',
                message: 'Post deleted!',
                icon: '🗑️',
            };

            setInfo(successInfo as InfoType);
            if (setShouldRefreshPictureList && hasImage)
                setShouldRefreshPictureList(true);
            if (onPostChange) onPostChange();
        } catch (err: unknown) {
            const errorInfo = {
                typeOfInfo: 'bad',
                message: 'Unable to delete post!',
                icon: '👻',
            };
            setInfo(errorInfo as InfoType);
        }
    };

    const handleShowPostMenu = () => setShouldMenuShow(!shouldMenuShow);

    const handleEditButtonClick = () => {
        setShouldPostEditShow(true);
        setShouldMenuShow(false);
    };

    const handleDeleteButtonClick = () => {
        setShouldConfirmDialogShow(true);
        setShouldMenuShow(false);
    };

    const ConfirmModal = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                handleDelete();
            }}
            dialogInfo={{
                message: 'Do you really want to delete this post?',
                icon: '✋',
            }}
        />
    );

    const PostOptionsContent = (
        <div className="relative inline-block cursor-pointer">
            <ToggleListButton
                onToggleListButtonClick={handleShowPostMenu}
                showMenu={showMenu}
            />

            {showMenu && (
                <PostMenu
                    handleEditButtonClick={handleEditButtonClick}
                    handleDeleteButtonClick={handleDeleteButtonClick}
                    shouldMenuShow={shouldMenuShow}
                />
            )}

            {showPostEdit && (
                <EditPostInput
                    postDetails={postDetails}
                    shouldPostEditShow={shouldPostEditShow}
                    setShouldPostEditShow={setShouldPostEditShow}
                    onPostChange={onPostChange}
                    setShouldRefreshPictureList={setShouldRefreshPictureList}
                />
            )}
        </div>
    );

    return (
        <>
            {showConfirmDialog && ConfirmModal}
            {PostOptionsContent}
        </>
    );
}
