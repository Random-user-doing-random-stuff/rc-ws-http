// types.d.ts

import { ObjectId } from "mongodb";

declare global {
    namespace Models {
        interface User {
            _id?: ObjectId;
            username: string;
            email: string;
            passwordHash: string;
            createdAt: Date;
            lastActiveAt?: Date; // Optional field
        }
        interface ChatRoom {
            _id?: ObjectId;
            roomName: string;
            members: ObjectId[]; // Array of user IDs
            createdAt: Date;
        }
    }
}
