import { writable } from "svelte/store";

/**
 * DEMO PLANTILLA
 */
type IStorage = {
    count: number;
};
const defaultStorage: IStorage = {
    count: 0,
};

export const storage = {
    get: (): Promise<IStorage> =>
        chrome.storage.sync.get(defaultStorage) as Promise<IStorage>,
    set: (value: IStorage): Promise<void> => chrome.storage.sync.set(value),
};

/*************************************+ */

/**
 * ? Workspace storage
 */

type ILink = {
    name: string;
    url: string;
}

type IWorkspace = {
    id: number;
    name: string;
    links: ILink[];}

type IStorageWorkSpaces = {
    workspaces: IWorkspace[];
};

const defaultWorkspaceStorage: IStorageWorkSpaces = {
    workspaces: [
        {
            id: 0,
            name: "Default",
            links: [
                {
                    name: "Google",
                    url: "https://google.com",
                },
                {
                    name: "Facebook",
                    url: "https://facebook.com",
                },
            ],
        }
    ]
};

const { subscribe, set, update } = writable(defaultWorkspaceStorage);

const addWorkspace = (workspaceName: string) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace: IWorkspace = {
            id: Math.random(),
            name: workspaceName,
            links: []
        };

        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.concat(workspace)
        };

        chromeStorage.set(updatedWorkspaces);

        return updatedWorkspaces;
    });

const reset = () => {
    chromeStorage.get().then((storage) => {
        set(storage);
    });
};

export default {
    subscribe,
    addWorkspace,
    reset,
};

export const chromeStorage = {
    get: (): Promise<IStorageWorkSpaces> =>
        chrome.storage.sync.get(defaultWorkspaceStorage) as Promise<IStorageWorkSpaces>,
    set: (value: IStorageWorkSpaces): Promise<void> => chrome.storage.sync.set(value),
};