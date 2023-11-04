import { useEffect, useRef, useState } from 'react';
import { ImageType } from '../../../types/miscTypes';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { useParams } from 'react-router-dom';
import { convertDatabaseImageToBase64 } from '../../../utilities/convertDatabaseImageToBase64';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../UiElements/LightBox/LightBox';
import { MdOutlineZoomIn } from 'react-icons/md';
import useDelayUnmount from '../../../hooks/useDelayUnmount';
import { backendFetch } from '../../../utilities/backendFetch';
import { motion } from 'framer-motion';
import { InfoType } from '../../../types/infoTypes';

type GalleryProps = {
    isPaginationTriggered: boolean;
};

export default function Gallery({ isPaginationTriggered }: GalleryProps) {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number | null>(null);
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isLightboxMounted = selectedImage ? true : false;
    const showLightbox = useDelayUnmount(isLightboxMounted, 150);

    const shouldInitialize = useRef(true);

    const handleFetchUserPics = async () => {
        if (token && id) {
            const apiEndpointURLList = `/api/v1/users/${id}/picture?skip=${skip}`;
            const apiEndpointURLNumber = `/api/v1/users/${id}/count_pictures`;
            const method = 'GET';
            const errorMessageList = 'Unable to fetch pictures!';
            const errorMessageNumber = 'Unable to fetch number of pictures!';

            let pictureListResponse;
            let numberOfPicsResponse;

            try {
                pictureListResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLList,
                    method,
                    errorMessageList
                );
                numberOfPicsResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLNumber,
                    method,
                    errorMessageNumber
                );
            } catch (error) {
                const errorInfo = {
                    typeOfInfo: 'bad',
                    message: 'Unable to fetch pictures!',
                    icon: '👻',
                };

                setInfo(errorInfo as InfoType);
            }

            if (pictureListResponse && numberOfPicsResponse) {
                setPictures([...pictures, ...pictureListResponse.images]);
                setNumberOfPictures(numberOfPicsResponse?.count);
                setLoading(false);
            }
        }
    };

    const handleImageClick = (image: ImageType) => setSelectedImage(image);

    useEffect(() => {
        if (pictures) setSkip(pictures.length);
    }, [isPaginationTriggered, numberOfPictures]);

    useEffect(() => {
        if (skip) handleFetchUserPics();
    }, [skip]);

    useEffect(() => {
        if (shouldInitialize.current) {
            handleFetchUserPics();
        }
        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const pictureList = pictures?.map((picture) => (
        <motion.div
            key={picture.id}
            whileTap={{ scale: 0.97 }}
            className="relative"
        >
            <img
                loading="lazy"
                className="w-full h-auto aspect-square object-cover shadow-lg cursor-pointer"
                src={`data:image/png;base64,${convertDatabaseImageToBase64(
                    picture
                )}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
                <span className="text-regularTextDark text-lg font-bold">
                    <MdOutlineZoomIn size="1.5em" />
                </span>
            </div>
        </motion.div>
    ));

    const LoadingContent = (
        <div className="flex flex-col justify-center items-center h-screen w-full py-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark ">
            <span>Getting pictures</span>
            <LoadingSpinner />
        </div>
    );

    const GalleryContent = (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark shadow-lg">
            <h1 className="font-bold">{numberOfPictures} Pictures</h1>
            <div className="flex flex-col md:grid grid-cols-3 gap-4">
                {pictureList}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {loading ? LoadingContent : GalleryContent}
            {showLightbox && (
                <LightBox
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
