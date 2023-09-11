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

const deleteWorkspace = (id: number) => {
    update((workspaces: IStorageWorkSpaces) => {
        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.filter((w) => w.id !== id),
        };

        chromeStorage.set(updatedWorkspaces);

        return updatedWorkspaces;
    });
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

const addLinks = (id: number, link: ILink[]) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace = workspaces.workspaces.find((w) => w.id === id);
        if (!workspace) return workspaces;
        
        workspace.links = workspace.links.concat(link);

        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.map((w) => {
                if (w.id === id) return workspace;
                return w;
            }),
        };

        chromeStorage.set(updatedWorkspaces);
        return updatedWorkspaces;        
    });

    /**
     * Updates a link in a workspace by id
     * @param id 
     * @param link 
     * @returns 
     */
const updateLink = (id_workspace:number, id_link: number, link: ILink) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace = workspaces.workspaces.find((w) => w.id === id_workspace);
        if (!workspace) return workspaces;

        workspace.links[id_link] = link;

        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.map((w) => {
                if (w.id === id_workspace) return workspace;
                return w;
            }),
        };

        chromeStorage.set(updatedWorkspaces);
        return updatedWorkspaces;
    });

const deleteLink = (id_workspace:number, id_link: number) =>
    update((workspaces: IStorageWorkSpaces) => {
        const workspace = workspaces.workspaces.find((w) => w.id === id_workspace);
        if (!workspace) return workspaces;

        workspace.links.splice(id_link, 1);

        const updatedWorkspaces = {
            workspaces: workspaces.workspaces.map((w) => {
                if (w.id === id_workspace) return workspace;
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
    set(defaultWorkspaceStorage);
    selectedWorkspace.set(0);
    chromeStorage.clear();
};

export default {
    subscribe,
    init,
    addWorkspace,
    getWorkspace,
    deleteWorkspace,
    addLink,
    addLinks,
    updateLink,
    deleteLink,
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