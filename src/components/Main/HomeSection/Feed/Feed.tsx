import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { fetchFeed } from '../../../../utilities/fetchFeed';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../../UiElements/LightBox/LightBox';
import { ImageType } from '../../../../types/imageType';
import ShowPeopleInThisFeed from '../ShowPeopleInThisFeed/ShowPeopleInThisFeed';
import { MinimalPostType } from '../../../../types/minimalPostType';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import NewPostInput from '../../Post/NewPostInput/NewPostInput';
import FeedPostList from './FeedPostList/FeedPostList';
import { motion, AnimatePresence } from 'framer-motion';

type FreedProps = {
    friendList: string[];
    isPaginationTriggered: boolean;
};

export default function Feed({
    friendList,
    isPaginationTriggered,
}: FreedProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [minimalPosts, setMinimalPosts] = useState<MinimalPostType[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const isImageLightboxMounted = clickedImage ? true : false;
    const showImageLightbox = useDelayUnmount(isImageLightboxMounted, 150);

    const isGifLightboxMounted = clickedGif ? true : false;
    const showGifLightbox = useDelayUnmount(isGifLightboxMounted, 150);

    const handleGetFeed = async () => {
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip, friendList);
            setMinimalPosts([...minimalPosts, ...response]);
            setLoading(false);
        }
    };

    const refreshFeed = async () => {
        setLoading(true);
        setMinimalPosts([]);
        setSkip(0);
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip, friendList);
            setMinimalPosts([...response]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (minimalPosts) {
            setSkip(minimalPosts.length);
        }
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (token) {
            handleGetFeed();
        }
    }, [skip]);

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col h-1/4 md:h-auto w-full gap-8 "
        >
            <NewPostInput handleRefreshPosts={refreshFeed} />
            <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8 justify-center min-h-[calc(100vh_-_18rem)] bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark">
                {loading ? (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col md:col-span-2 justify-center items-center w-full h-full py-4 gap-4 text-regularText dark:text-regularTextDark "
                    >
                        <LoadingSpinner message="Getting feed..." />
                    </motion.div>
                ) : (
                    <>
                        <ShowPeopleInThisFeed
                            friendList={friendList}
                            minimalPosts={minimalPosts}
                        />
                        <div className="flex flex-col gap-4 pb-4">
                            <FeedPostList
                                posts={minimalPosts}
                                setClickedImage={setClickedImage}
                                setClickedGif={setClickedGif}
                            />
                            <AnimatePresence>
                                {showImageLightbox && (
                                    <LightBox
                                        image={clickedImage}
                                        onClose={() => setClickedImage(null)}
                                    />
                                )}
                                {showGifLightbox && (
                                    <LightBox
                                        image={clickedGif}
                                        onClose={() => setClickedGif(null)}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
