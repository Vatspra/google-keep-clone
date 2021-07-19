
import { LOCAL_STORAGE_KEYS } from "./constants";
import { UserInfo } from "./interfaces";

class StorageHelperClass {
    constructor() { }

    get(key: string) {
        if (localStorage.getItem(key)) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    return JSON.parse(data);
                } else {
                    return null;
                }
            } catch (_) {
                return null;
            }
        }
    }
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get userInfo(): UserInfo| null {
        return this.get(LOCAL_STORAGE_KEYS.UserInfo);
    }
    set userInfo(userInfo: UserInfo| null) {
        this.set(LOCAL_STORAGE_KEYS.UserInfo, userInfo);
    }

    get users(): UserInfo[] {
        return this.get(LOCAL_STORAGE_KEYS.Users);
    }

    set users(users: UserInfo[]) {
        this.set(LOCAL_STORAGE_KEYS.Users, users);
    }


}
export const StorageHelper = new StorageHelperClass();