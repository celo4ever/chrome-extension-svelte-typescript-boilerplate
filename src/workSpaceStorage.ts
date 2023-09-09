import { writable } from "svelte/store";

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

let defaultWorkspaceStorage: IStorageWorkSpaces = {
    workspaces: [
        {
            id: 0,
            name: "Default",
            links: [],
        },
    ],
};

export const selectedWorkspace = writable(0);

const { subscribe, set, update} = writable(defaultWorkspaceStorage);

const init = () => {
    return chromeStorage.get().then((storage) => {
        set(storage);
    });
};

const getWorkspace = (id: number) => {
    console.log("getWorkspace", defaultWorkspaceStorage.workspaces);
    return defaultWorkspaceStorage.workspaces[id];
};

const addWorkspace = (workspaceName: string) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace: IWorkspace = {
            id: workspaces.workspaces.length,
            name: workspaceName,
            links: []
        };
        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.concat(workspace),
        };

        chromeStorage.set(updatedWorkspaces);
        selectedWorkspace.set(workspace.id);
        return updatedWorkspaces;
});
    
const addLink = (id: number, link: ILink) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace = workspaces.workspaces.find((w) => w.id === id);
        if (!workspace) return workspaces;
        workspace.links.push(link);
        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.map((w) => {
                if (w.id === id) return workspace;
                return w;
            }),
        };

        chromeStorage.set(updatedWorkspaces);
        return updatedWorkspaces;        
});

const importWorkspace = (workspace: IWorkspace) =>
    update((workspaces: IStorageWorkSpaces) => {
        workspace.id = workspaces.workspaces.length;
        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.concat(workspace),
        };

        chromeStorage.set(updatedWorkspaces);
        selectedWorkspace.set(workspace.id);
        return updatedWorkspaces;
    });

const reset = () => {
    chromeStorage.get().then((storage) => {
        set(storage);
    });
};

export default {
    subscribe,
    init,
    addWorkspace,
    getWorkspace,
    addLink,
    importWorkspace,
    reset,
};

export const chromeStorage = {
    
    get: (): Promise<IStorageWorkSpaces> =>
        chrome.storage.sync.get(defaultWorkspaceStorage) as Promise<IStorageWorkSpaces>,
    set: (value: IStorageWorkSpaces): Promise<void> => chrome.storage.sync.set(value),
    clear: () => chrome.storage.local.clear(() => {
        console.log('Todos los datos de chrome.storage.local se han borrado.');
    }),
    setCurrentWorkspace: (workspaceId: number): Promise<void> => chrome.storage.sync.set({currentWorkspace: workspaceId}),
    getCurrentWorkspace: () => chrome.storage.sync.get().then(({ currentWorkspace }) => selectedWorkspace.set(currentWorkspace)),
};