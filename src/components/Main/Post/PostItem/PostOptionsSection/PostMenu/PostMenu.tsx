import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

type PostMenuProps = {
    handleEditButtonClick: () => void;
    handleDeleteButtonClick: () => void;
    shouldMenuShow: boolean;
};

export default function PostMenu({
    handleEditButtonClick,
    handleDeleteButtonClick,
    shouldMenuShow,
}: PostMenuProps) {
    const EditButton = (
        <button
            onClick={handleEditButtonClick}
            className="flex justify-around items-center w-full p-2 rounded-t text-regularText dark:text-regularTextDark bg-cardDark/20 dark:bg-card/20 hover:bg-highlight dark:hover:bg-highlightDark duration-300"
        >
            <MdEdit size="1.25em" />
        </button>
    );

    const DeleteButton = (
        <button
            onClick={handleDeleteButtonClick}
            className="flex justify-center items-center w-full p-2 rounded-b text-regularText dark:text-regularTextDark bg-cardDark/20 dark:bg-card/20 hover:bg-highlight dark:hover:bg-highlightDark duration-300"
        >
            <MdOutlineDeleteForever size="1.25em" />
        </button>
    );

    return (
        <AnimatePresence>
            {shouldMenuShow && (
                <motion.div
                    key="postMenu"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-12 right-0 z-10 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark shadow-lg rounded"
                >
                    <ul className="flex flex-col list-none">
                        <li>{EditButton}</li>
                        <li>{DeleteButton}</li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
