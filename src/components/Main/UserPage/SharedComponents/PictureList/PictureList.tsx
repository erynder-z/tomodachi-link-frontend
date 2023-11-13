import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/miscTypes';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { MdKeyboardDoubleArrowRight, MdZoomOutMap } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { backendFetch } from '../../../../../utilities/backendFetch';
import { motion } from 'framer-motion';

type PictureListProps = {
    onFetchComplete: (nameOfComponent: string) => void;
    userId: string | undefined;
};

export default function PictureList({
    onFetchComplete,
    userId,
}: PictureListProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    const MAX_NUMBER_OF_PICTURES_TO_SHOW = 9;

    const handleFetchUserPics = async () => {
        if (token && userId) {
            const skip = 0;
            const apiEndpointURLList = `/api/v1/users/${userId}/picture?skip=${skip}`;
            const apiEndpointURLNumber = `/api/v1/users/${userId}/count_pictures`;
            const METHOD = 'GET';
            const ERROR_MESSAGE_LIST = 'Unable to fetch pictures!';
            const ERROR_MESSAGE_NUMBER = 'Unable to fetch number of pictures!';
            let pictureListResponse;
            let numberOfPicsResponse;
            try {
                pictureListResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLList,
                    METHOD,
                    ERROR_MESSAGE_LIST
                );
                numberOfPicsResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLNumber,
                    METHOD,
                    ERROR_MESSAGE_NUMBER
                );
                setPictures([...pictureListResponse.images]);
                setNumberOfPictures(numberOfPicsResponse?.count);
                setLoading(false);
                onFetchComplete('pictureList');
            } catch (error) {
                setLoading(false);
                onFetchComplete('pictureList');
            }

            shouldInitialize.current = false;
        }
    };

    const handleImageClick = (image: ImageType) => setSelectedImage(image);

    useEffect(() => {
        if (shouldInitialize.current === true) handleFetchUserPics();
    }, [userId]);

    const pictureList = pictures?.map((picture) => (
        <div
            key={picture.id}
            className="relative flex rounded outline-highlight dark:outline-highlightDark hover:outline"
        >
            <img
                className="h-auto aspect-square object-cover  rounded"
                src={`data:image/png;base64,${picture?.data}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center aspect-square bg-black bg-opacity-75 opacity-0 hover:opacity-80 transition-opacity cursor-pointer rounded"
            >
                <span className="text-white text-lg font-bold">
                    <MdZoomOutMap size="1.5em" />
                </span>
            </div>
        </div>
    ));

    const LoadingContent = (
        <div className="flex justify-center items-center w-full py-4">
            <LoadingSpinner />
        </div>
    );

    const PictureListContent =
        pictureList.length > 0 ? (
            pictureList
        ) : (
            <span className="col-span-3 text-sm font-medium">
                Nothing here yet
            </span>
        );

    const SeeAllPicturesButton = (
        <motion.button whileTap={{ scale: 0.97 }}>
            <Link
                to={`/users/${userId}/gallery`}
                className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded px-2 py-1 mt-4 text-sm"
            >
                See all <MdKeyboardDoubleArrowRight size="1.25em" />
            </Link>
        </motion.button>
    );

    return (
        <div className="px-4 md:px-0">
            <h1 className="font-bold">Pictures</h1>

            {loading ? (
                LoadingContent
            ) : (
                <div className="animate-inAnimation grid grid-cols-3 gap-4">
                    {PictureListContent}
                </div>
            )}

            {numberOfPictures > MAX_NUMBER_OF_PICTURES_TO_SHOW &&
                SeeAllPicturesButton}
            <AnimatePresence>
                {selectedImage && (
                    <LightBox
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
