import React,{ createContext, useContext, useState } from "react";


type SidebarContextType = {
    isSideBarCollapsed: boolean;
    toggleSidebar: () => void;
}

const SideBarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (context === undefined) {
        throw new Error('useSideBar must be used within a SideBarProvider');
    }
    return context;
};


export const SideBarProvider = ({ children }: {children: React.ReactNode}) => {
    const [isSideBarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSideBarCollapsed);
    }

    return (
        <SideBarContext.Provider value={{ isSideBarCollapsed, toggleSidebar}}>
            {children}
        </SideBarContext.Provider>
    )
}