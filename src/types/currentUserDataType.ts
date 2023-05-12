import { CoverType } from './coverType';

export type CurrentUserDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    friends: string[];
    posts: string[];
    bookmarks: string[];
    pendingFriendRequests: string[];
    joined: Date;
    lastSeen: Date;
    userpic: {
        data: { data: Buffer };
        contentType: string;
    };
    cover: CoverType;
};
