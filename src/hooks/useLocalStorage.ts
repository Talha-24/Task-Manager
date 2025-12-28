const useLocalStorage = () => {

    const getTheme = (): string | null => {

        return localStorage.getItem("theme");
    }

    const setTheme = (theme: string) => {
        localStorage.setItem("theme", theme)
    }

    const removeTheme = () => {
        localStorage.removeItem("theme");
    }

    const getValue = (key: string) => {
        return localStorage.getItem(key);
    }

    const setValue = (key: string, value: unknown) => {
        localStorage.setItem(key, value as string);
    }

    const removeValue = (key: string) => {
        localStorage.removeItem(key);
    }

    const getSideBar = () => {
        return localStorage.getItem("sidebar");
    }

    const setSideBar = (value: string) => {
        return localStorage.setItem("sidebar", value)
    }

    return {
        getTheme,
        setTheme,
        getSideBar,
        setSideBar,
        getValue,
        setValue,
        removeValue,
        removeTheme,
    }
}
export default useLocalStorage